"use client";

import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "Wedding cake for 120 guests, elegant white and gold",
  "My son turns 5, he loves dinosaurs and chocolate",
  "Anniversary cake, red velvet, romantic and classic",
  "Graduation celebration, school colors blue and gold",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_INTRO = `Hi! I'm Reba's cake concierge. Tell me about your dream cake — the occasion, who it's for, flavors you love, colors, themes... anything! I'll help design something extraordinary.

For example: "My daughter turns 7 next Saturday. She loves mermaids and purple. Chocolate cake with strawberry filling."`;

export default function DreamCakePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/dream-cake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "I'm having trouble right now — but I'd love to help with your dream cake! Please call us at (831) 601-4818 or (831) 676-0628 and we'll design something amazing together.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <section className="bg-reba-card border-b border-reba-border">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="text-5xl mb-4">{"\u{1F382}"}</div>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-4">
            Dream Cake
          </h1>
          <p className="text-reba-muted max-w-lg mx-auto">
            Describe your dream cake and our AI concierge &mdash; trained on Reba&apos;s
            Food Network artistry &mdash; will design a concept just for you.
          </p>
        </div>
      </section>

      {/* Chat Area */}
      <section className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        <div
          ref={scrollRef}
          className="bg-white border border-reba-border rounded-2xl overflow-hidden flex flex-col"
          style={{ minHeight: "500px" }}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {/* Intro message */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-reba-card rounded-2xl rounded-bl-md px-4 py-3 text-sm text-reba-cream leading-relaxed whitespace-pre-line">
                {SYSTEM_INTRO}
              </div>
            </div>

            {messages.length === 0 && !loading && (
              <div className="mt-4">
                <p className="text-xs text-reba-muted uppercase tracking-wider mb-3">
                  Or try one of these:
                </p>
                <div className="space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="w-full text-left border border-reba-border rounded-xl px-4 py-3 text-sm text-reba-cream hover:border-reba-pink/30 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-reba-pink text-white rounded-br-md"
                      : "bg-reba-card text-reba-cream rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-reba-card px-4 py-3 rounded-bl-md">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-reba-pink [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-reba-pink [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-reba-pink [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-reba-border px-4 py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your dream cake..."
                disabled={loading}
                className="flex-1 bg-reba-card border border-reba-border rounded-full px-5 py-3 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-reba-pink text-white transition hover:bg-reba-pink-hover disabled:opacity-40"
                aria-label="Send"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
