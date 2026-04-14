"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What's on the menu?",
  "Are you open today?",
  "Do you do custom cakes?",
  "Where are you located?",
];

// Sweet Reba's concierge is served by Bearing Intelligence's centralized
// bearing-chat API, called with { prospect_slug: "sweet-rebas" }. The system
// prompt (voice, profile, positioning, faq) lives in the bearing repo at
// src/lib/prospects-context/sweet-rebas/ and is loaded at build time.
//
// Source of truth: ~/Development/bearing-data/prospects/sweet-rebas/*.md
// Re-sync: cp ~/Development/bearing-data/prospects/sweet-rebas/{voice,profile,positioning,faq}.md ~/Development/bearing/src/lib/prospects-context/sweet-rebas/
//
// TODO(post-launch): promote BEARING_API_URL to NEXT_PUBLIC env var instead
// of hardcoding. Left as a constant today so preview deploys work without
// touching Vercel env vars.
const BEARING_API_URL = "https://getbearing.co/api/bearing-chat";
const PROSPECT_SLUG = "sweet-rebas";

const FALLBACK_PHONE = "(831) 676-0628";
const FALLBACK_MESSAGE = `I'm sorry, I'm having trouble right now. Please call us at ${FALLBACK_PHONE}!`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(false);

    // Add an empty assistant message we'll stream into.
    setMessages([...nextMessages, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(BEARING_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          prospect_slug: PROSPECT_SLUG,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`bearing-chat ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages([
          ...nextMessages,
          { role: "assistant", content: assistant },
        ]);
      }

      // Final decode flush (handles any trailing bytes).
      assistant += decoder.decode();
      setMessages([
        ...nextMessages,
        { role: "assistant", content: assistant },
      ]);
    } catch (err) {
      console.error("chat widget error:", err);
      setError(true);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: FALLBACK_MESSAGE,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-reba-pink text-white shadow-lg transition hover:bg-reba-pink-hover"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border border-reba-border bg-reba-dark shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-reba-card px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-reba-pink text-white font-heading text-lg font-bold">
              SR
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-reba-cream font-body">Sweet Reba&apos;s</p>
              <p className="text-xs text-reba-muted">AI Concierge</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-reba-muted transition hover:text-reba-cream"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && !loading && (
              <div className="space-y-2">
                <p className="text-sm text-reba-muted text-center mb-3">
                  Hi there! How can we help you today?
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-reba-border bg-reba-card px-3 py-1.5 text-xs text-reba-cream transition hover:border-reba-pink hover:text-reba-pink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-reba-pink text-white rounded-br-md"
                      : "bg-reba-card text-reba-cream rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-reba-card px-4 py-3 rounded-bl-md">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-reba-pink [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-reba-pink [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-reba-pink [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Error banner */}
          {error && (
            <div className="mx-4 mb-2 rounded-lg bg-red-900/30 border border-red-800/50 px-3 py-2 text-xs text-red-300">
              Having trouble connecting. Please call us at {FALLBACK_PHONE}!
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-reba-border px-4 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask us anything..."
              className="flex-1 rounded-full bg-reba-card border border-reba-border px-4 py-2 text-sm text-reba-cream placeholder:text-reba-muted outline-none focus:border-reba-pink transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-reba-pink text-white transition hover:bg-reba-pink-hover disabled:opacity-40"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
