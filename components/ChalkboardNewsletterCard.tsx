"use client";

import Link from "next/link";
import { useState } from "react";
import { submitWaitlist } from "@/lib/waitlist";

export default function ChalkboardNewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus("loading");
    setErrorMsg("");
    const result = await submitWaitlist({
      email: trimmed,
      source_context: "newsletter-chalkboard",
    });
    if (result.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <div className="mt-12 bg-white border-2 border-reba-pink/30 rounded-3xl p-8 sm:p-10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm uppercase tracking-wider text-reba-pink font-bold mb-3">
          ✉️ Weekly Newsletter
        </p>
        <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-3">
          Love what you&apos;re seeing?
        </h3>
        <p className="text-reba-muted text-base sm:text-lg mb-6">
          Get the week&apos;s fresh picks, specials, and Sweet Reba&apos;s news in
          your inbox every Thursday.
        </p>

        {status === "success" ? (
          <p className="text-reba-pink font-semibold text-lg">
            You&apos;re on the list! First issue lands this Thursday.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 bg-white border border-reba-border rounded-full px-5 py-3 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full text-base font-semibold transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {status === "loading" ? "Adding you..." : "Sign me up"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-reba-pink text-sm mt-3">{errorMsg}</p>
        )}

        <p className="text-reba-muted text-sm mt-5">
          <Link
            href="/whats-baking"
            className="underline underline-offset-2 hover:text-reba-pink transition-colors"
          >
            See a sample issue →
          </Link>
        </p>
      </div>
    </div>
  );
}
