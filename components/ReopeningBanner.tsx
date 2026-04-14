"use client";

import { useState } from "react";

export default function ReopeningBanner() {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Connect to actual email service
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <div className="border border-reba-pink/30 rounded-2xl p-6 text-center" style={{ backgroundColor: "#fff5f5" }}>
          <p className="text-reba-pink font-semibold text-sm sm:text-base">
            You&apos;re on the list! We&apos;ll let you know as soon as Carmel reopens.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
      <div className="border border-reba-pink/30 rounded-2xl p-6 text-center" style={{ backgroundColor: "#fff5f5" }}>
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="w-full text-center cursor-pointer"
          >
            <p className="text-reba-cream text-base sm:text-lg leading-relaxed mb-1">
              <span className="text-reba-pink font-semibold">Exciting news!</span>{" "}
              Our Salinas location is open!
            </p>
            <p className="text-reba-cream text-base sm:text-lg leading-relaxed">
              Our Carmel location is reopening at the end of May.{" "}
              <span className="text-reba-pink font-semibold underline underline-offset-2">
                Click here to be the first to know.
              </span>
            </p>
          </button>
        ) : (
          <div>
            <p className="text-reba-cream text-base sm:text-lg leading-relaxed mb-1">
              <span className="text-reba-pink font-semibold">Exciting news!</span>{" "}
              Our Salinas location is open!
            </p>
            <p className="text-reba-cream text-base sm:text-lg leading-relaxed mb-4">
              Our Carmel location is reopening at the end of May. Enter your email to be notified.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
              />
              <button
                type="submit"
                className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Notify Me
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
