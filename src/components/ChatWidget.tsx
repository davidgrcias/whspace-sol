"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import styles from "@/styles/ChatWidget.module.css";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const ChatWidget: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Suggested preset questions in both languages
  const suggestedQuestions = {
    en: [
      "What does Whitespace Solutions do?",
      "Who leads the company?",
      "What services do you offer?",
      "How does your process work?",
      "Are you currently hiring?"
    ],
    id: [
      "Apa yang dilakukan Whitespace Solutions?",
      "Siapa saja pemimpin perusahaan?",
      "Layanan apa saja yang ditawarkan?",
      "Bagaimana proses kerja Anda?",
      "Apakah ada lowongan kerja?"
    ]
  };

  // Initial welcome message
  const welcomeText = {
    en: "Hello! I am Whitespace's AI concierge. How can I help you explore our services, team, or operational process today?",
    id: "Halo! Saya adalah asisten AI Whitespace. Ada yang bisa saya bantu terkait layanan, tim, atau proses operasional kami hari ini?"
  };

  // Initialize welcome message when component mounts or language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeText[language]
      }
    ]);
  }, [language]);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isGenerating) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsGenerating(true);

    const assistantMsgId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: ""
    };

    setMessages((prev) => [...prev, assistantMsg]);

    try {
      // Build session conversation history
      const history = [...messages, userMsg].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: history,
          language: language
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message to AI server");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Unable to read text stream");
      }

      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: accumulatedResponse }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  language === "en"
                    ? "Sorry, I encountered an issue connecting to my intelligence base. Please try again later or email us directly at contact@whitespace.id."
                    : "Maaf, saya mengalami kendala menghubungkan ke basis kecerdasan saya. Silakan coba sesaat lagi atau email kami di contact@whitespace.id."
              }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleChipClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className={styles.widgetContainer}>
      {/* Floating Trigger Button */}
      <button
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI assistant"
      >
        {isOpen ? (
          // Close Icon
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Terminal/Bot Icon
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 21L14.907 18M12 3v13.5M3 12h18M6.5 6.5h11m-11 5.5h11m-11 5.5h11"
            />
          </svg>
        )}
      </button>

      {/* Floating Panel Panel */}
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        {/* Panel Header */}
        <div className={styles.header}>
          <div className={styles.logoArea}>
            <span className={styles.logoTitle}>
              WHITESPACE<span>.AI</span>
            </span>
            <span className={styles.logoSubtitle}>
              {language === "en" ? "INTELLIGENCE CONCIERGE" : "KONSULTAN INTELEKTUAL"}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close panel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message area */}
        <div ref={messagesContainerRef} className={styles.messagesWindow}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageRow} ${
                msg.role === "user" ? styles.userRow : styles.assistantRow
              }`}
            >
              <div
                className={`${styles.messageBubble} ${
                  msg.role === "user" ? styles.userBubble : styles.assistantBubble
                }`}
              >
                <div style={{ whiteSpace: "pre-line" }}>{msg.content}</div>
              </div>
            </div>
          ))}

          {isGenerating &&
            messages[messages.length - 1]?.content === "" && (
              <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                <div className={`${styles.messageBubble} ${styles.assistantBubble}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions chips */}
        <div className={styles.chipsContainer}>
          <span className={styles.chipsLabel}>
            {language === "en" ? "Suggested Queries" : "Saran Pertanyaan"}
          </span>
          <div className={styles.chipsList}>
            {suggestedQuestions[language].map((q, i) => (
              <button
                key={i}
                className={styles.chip}
                onClick={() => handleChipClick(q)}
                disabled={isGenerating}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input form */}
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <input
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              language === "en"
                ? "Ask about our services, team, or model..."
                : "Tanyakan layanan, tim, atau model kerja kami..."
            }
            disabled={isGenerating}
          />
          <button type="submit" className={styles.sendBtn} disabled={!inputValue.trim() || isGenerating}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              width="18"
              height="18"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
