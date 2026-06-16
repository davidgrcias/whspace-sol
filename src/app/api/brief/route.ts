import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { company, industry, challenge, language = "en" } = await req.json();

    if (!company || !industry || !challenge) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = (process.env.GEMINI_API_KEY || "").trim();
    const model = (process.env.GEMINI_MODEL || "gemini-3.1-pro").trim();

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return NextResponse.json(
        { error: "Server API Key configuration error" },
        { status: 500 }
      );
    }

    const systemPrompt = `You are a top-tier management consultant at Whitespace Solutions (think BCG/McKinsey caliber).
You are tasked with generating an Executive Strategic Brief for a prospective client.
The client has provided the following details:
- Company Name: ${company}
- Industry: ${industry}
- Primary Challenge: ${challenge}

INSTRUCTIONS:
1. Provide a sharp, insightful, and highly professional strategic brief.
2. Structure the brief with the following exact headers (translated appropriately if the user language is Indonesian):
   - Executive Summary
   - Problem Framing
   - Whitespace Opportunity (Identify a unique angle or overlooked area for growth/efficiency)
   - Recommended Strategic Priorities (3 bullet points)
3. Do NOT include any intro/outro conversational fluff. Just deliver the structured brief directly.
4. Output language must match the user's selected language (${language}). If 'id', use professional Bahasa Indonesia. If 'en', use professional English.
5. Keep it concise (around 300-400 words total).`;

    const geminiPayload = {
      model: model,
      messages: [{ role: "system", content: systemPrompt }],
      stream: true
    };

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      return NextResponse.json(
        { error: `Gemini API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const geminiStream = response.body;
    if (!geminiStream) {
      throw new Error("No response body stream received from Gemini");
    }

    const customStream = new ReadableStream({
      async start(controller) {
        const reader = geminiStream.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            
            buffer = lines.pop() || "";

            for (const line of lines) {
              const cleanedLine = line.trim();
              if (!cleanedLine) continue;

              if (cleanedLine.startsWith("data:")) {
                const rawJson = cleanedLine.substring(5).trim();
                if (rawJson === "[DONE]") continue;

                try {
                  const data = JSON.parse(rawJson);
                  if (
                    data.choices &&
                    data.choices[0] &&
                    data.choices[0].delta &&
                    typeof data.choices[0].delta.content === "string"
                  ) {
                    controller.enqueue(new TextEncoder().encode(data.choices[0].delta.content));
                  }
                } catch (err) {
                  // Ignore JSON parse errors
                }
              }
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });

  } catch (error: any) {
    console.error("Brief API route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
