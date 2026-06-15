import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "@/lib/rag-retriever";

// Force edge runtime for efficient server-sent streaming
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages, language = "en" } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty messages array" },
        { status: 400 }
      );
    }

    // 1. Retrieve the last user question
    const userMessages = messages.filter(m => m.role === "user");
    const lastUserMessage = userMessages[userMessages.length - 1]?.content || "";

    // 2. Fetch relevant context from Knowledge Base
    const matchedChunks = retrieveContext(lastUserMessage, 3);
    const contextText = matchedChunks
      .map(chunk => `[Context: ${chunk.title}]\n${chunk.content}`)
      .join("\n\n");

    // 3. Build System Prompt with retrieved context
    const systemPrompt = `You are the AI Intelligence Concierge of Whitespace Solutions, a Jakarta-based management consulting & strategic advisory firm that builds proprietary AI software products.
You are professional, sharp, BCG-caliber strategic, and direct. Use "we" to represent Whitespace Solutions.

Context retrieved from Whitespace Solutions company profile:
---------------------------------------------
${contextText}
---------------------------------------------

INSTRUCTIONS:
- Answer the user's question accurately using ONLY the facts provided in the Context above.
- If the answer cannot be found in the context, do NOT make up information. Instead, politely state that you don't have that detail and suggest contacting us at contact@whitespace.id or phone 021-39731400.
- Keep your answers concise, clear, and action-oriented (maximum 3-4 sentences/paragraphs).
- Adjust your response language to match the user's language: if they ask in Indonesian, reply in Indonesian; if they ask in English, reply in English. Current language setting: ${language}.
- Maintain a modern corporate, strategical consulting voice. Do not talk about general topics. If asked out-of-scope questions, guide them back to Whitespace Solutions' services, team, or workflow.`;

    // 4. Construct request payload for Gemini API (OpenAI chat completions spec)
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return NextResponse.json(
        { error: "Server API Key configuration error" },
        { status: 500 }
      );
    }

    // Prepend the system prompt and format conversation history
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages
        .filter(m => m.role === "user" || m.role === "assistant")
        .map(m => ({
          role: m.role,
          content: m.content
        }))
    ];

    const geminiPayload = {
      model: model,
      messages: formattedMessages,
      stream: true
    };

    // 5. Query Gemini OpenAI-compatible Endpoint
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

    // 6. Set up SSE parsing stream to transform OpenAI stream to clean plain text stream for the client
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
            
            // Keep the last partial line in buffer
            buffer = lines.pop() || "";

            for (const line of lines) {
              const cleanedLine = line.trim();
              if (!cleanedLine) continue;

              // Parse SSE data blocks
              if (cleanedLine.startsWith("data:")) {
                const rawJson = cleanedLine.substring(5).trim();
                if (rawJson === "[DONE]") continue;

                try {
                  const data = JSON.parse(rawJson);
                  // Look for text delta updates from OpenAI format
                  if (
                    data.choices &&
                    data.choices[0] &&
                    data.choices[0].delta &&
                    typeof data.choices[0].delta.content === "string"
                  ) {
                    controller.enqueue(new TextEncoder().encode(data.choices[0].delta.content));
                  }
                } catch (err) {
                  // Ignore JSON parse errors on ping/metadata events
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
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
