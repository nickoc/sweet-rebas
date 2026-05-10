"use client";

import { useState, useRef, useEffect } from "react";

interface Attachment {
  url: string;
  media_type: string;
  filename?: string;
  size_bytes?: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  attachments?: Attachment[];
}

const SUGGESTIONS = [
  "Can I get a cake today?",
  "I need a cake for a birthday next Saturday",
  "Do you do wedding cakes?",
  "What's Sweet Reba's known for?",
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
const BEARING_API_URL =
  process.env.NEXT_PUBLIC_BEARING_API_URL ||
  "https://getbearing.co/api/bearing-chat";
const PROSPECT_SLUG = "sweet-rebas";
const UPLOADS_URL = BEARING_API_URL.replace(
  /\/api\/bearing-chat\/?$/,
  `/api/uploads/${PROSPECT_SLUG}`,
);
const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp,image/heic,image/heif,image/gif";
const MAX_PENDING_ATTACHMENTS = 4;

const FALLBACK_PHONE = "(831) 676-0628";
const FALLBACK_MESSAGE = `I'm sorry, I'm having trouble right now. Please call us at ${FALLBACK_PHONE}!`;

export default function ChatWidget({ initialOpen = false }: { initialOpen?: boolean } = {}) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Persist session_id across messages so every turn lands in the
  // same prospect_conversations row group — one inbox thread per
  // conversation, not one per turn. Captured from the X-Session-Id
  // response header on the first reply.
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function uploadFile(file: File) {
    if (pendingAttachments.length >= MAX_PENDING_ATTACHMENTS) {
      setUploadError(`Up to ${MAX_PENDING_ATTACHMENTS} images per message`);
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (sessionIdRef.current) fd.append("session_id", sessionIdRef.current);
      const res = await fetch(UPLOADS_URL, { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `upload ${res.status}`);
      }
      const j = (await res.json()) as Attachment;
      setPendingAttachments((prev) => [...prev, j]);
    } catch (e) {
      setUploadError(String(e instanceof Error ? e.message : e));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removePendingAttachment(idx: number) {
    setPendingAttachments((prev) => prev.filter((_, i) => i !== idx));
  }

  async function send(text: string, attachmentsOverride?: Attachment[]) {
    const attachments = attachmentsOverride ?? pendingAttachments;
    if (!text.trim() && attachments.length === 0) return;
    const userMsg: Message = {
      role: "user",
      content: text.trim(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setPendingAttachments([]);
    setUploadError(null);
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
          session_id: sessionIdRef.current ?? undefined,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`bearing-chat ${res.status}`);
      }

      // Capture the server-assigned session_id once so subsequent
      // turns reuse it and group as one inbox thread.
      const returnedSessionId = res.headers.get("X-Session-Id");
      if (returnedSessionId && !sessionIdRef.current) {
        sessionIdRef.current = returnedSessionId;
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
        <div className="fixed inset-x-2 bottom-2 z-50 flex h-[min(500px,calc(100dvh-1rem))] flex-col rounded-2xl border border-reba-border bg-reba-bg shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[500px] sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-reba-card px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-reba-pink text-white font-heading text-lg font-bold">
              SR
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-reba-ink font-body">Sweet Reba&apos;s</p>
              <p className="text-xs text-reba-muted">AI Concierge</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-reba-muted transition hover:text-reba-ink"
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
                      className="rounded-full border border-reba-border bg-reba-card px-3 py-1.5 text-xs text-reba-ink transition hover:border-reba-pink hover:text-reba-pink"
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
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    m.role === "user"
                      ? "bg-reba-pink text-white rounded-br-md"
                      : "bg-reba-card text-reba-ink rounded-bl-md"
                  }`}
                >
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {m.attachments.map((a, ai) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={ai}
                          src={a.url}
                          alt={a.filename ?? "attachment"}
                          className="h-24 w-24 object-cover rounded-md border border-white/30"
                        />
                      ))}
                    </div>
                  )}
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

          {/* Pending attachments preview */}
          {(pendingAttachments.length > 0 || uploading || uploadError) && (
            <div className="border-t border-reba-border px-4 py-2 space-y-1.5">
              {pendingAttachments.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {pendingAttachments.map((a, i) => (
                    <div key={i} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.url}
                        alt={a.filename ?? "attachment"}
                        className="h-14 w-14 object-cover rounded-md border border-reba-border"
                      />
                      <button
                        type="button"
                        onClick={() => removePendingAttachment(i)}
                        className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-reba-ink text-white text-[11px]"
                        aria-label="Remove attachment"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {uploading && (
                <p className="text-[11px] text-reba-muted">Uploading…</p>
              )}
              {uploadError && (
                <p className="text-[11px] text-red-500">{uploadError}</p>
              )}
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
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadFile(f);
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading || uploading || pendingAttachments.length >= MAX_PENDING_ATTACHMENTS}
              className="flex h-9 w-9 items-center justify-center rounded-full text-reba-muted transition hover:bg-reba-card hover:text-reba-pink disabled:opacity-40"
              aria-label="Attach image"
              title="Attach an image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={pendingAttachments.length > 0 ? "Add a message (optional)…" : "Ask us anything..."}
              className="flex-1 rounded-full bg-reba-card border border-reba-border px-4 py-2 text-sm text-reba-ink placeholder:text-reba-muted outline-none focus:border-reba-pink transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || uploading || (!input.trim() && pendingAttachments.length === 0)}
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
