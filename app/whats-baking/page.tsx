"use client";

import { useState } from "react";

export default function WhatsBakingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Connect to email service
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff5f5" }}>
      {/* Newsletter Preview */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-t-4 border-reba-pink">
          {/* Header */}
          <div className="bg-reba-pink px-8 py-10 text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-white mb-3">
              What&apos;s Baking This Week?
            </h1>
            <p className="text-white/80 text-lg sm:text-xl">
              Sweet Reba&apos;s Weekly Newsletter
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            <p className="text-base text-reba-muted uppercase tracking-wider mb-8">
              This Week at Sweet Reba&apos;s &middot; April 9, 2026
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-reba-pink font-semibold text-xl mb-3">
                  {"\u{1F36A}"} Cookie of the Week: Lemon Sugar
                </h3>
                <p className="text-reba-soft text-base sm:text-lg leading-relaxed">
                  Spring is here and so is our Lemon Sugar cookie! Buttery, bright, and dusted with just the right amount of sweetness. Available while they last &mdash; and they go fast.
                </p>
              </div>

              <div>
                <h3 className="text-reba-pink font-semibold text-xl mb-3">
                  {"\u{1F382}"} Custom Cake Spotlight
                </h3>
                <p className="text-reba-soft text-base sm:text-lg leading-relaxed">
                  Check out this gorgeous three-tier floral cake we made for the Martinez wedding last weekend. Want something custom? We still have slots open for May!
                </p>
              </div>

              <div>
                <h3 className="text-reba-pink font-semibold text-xl mb-3">
                  {"\u{1F389}"} Carmel Reopening Update
                </h3>
                <p className="text-reba-soft text-base sm:text-lg leading-relaxed">
                  End of May is getting closer! The ovens are installed, the display cases are in, and we&apos;re doing test bakes. Follow us on Instagram for sneak peeks of the new space.
                </p>
              </div>
            </div>

            {/* Signup */}
            <div className="border-t border-reba-border mt-10 pt-10 text-center">
              {submitted ? (
                <div>
                  <div className="text-5xl mb-4">{"\u2728"}</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-3">
                    You&apos;re on the list!
                  </h3>
                  <p className="text-reba-muted text-base">
                    We&apos;ll send you the sweet stuff every week. No spam, ever.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-reba-cream mb-3">
                    Sign up to always know what we&apos;re up to!
                  </h3>
                  <p className="text-reba-muted text-base sm:text-lg mb-8">
                    Get our weekly newsletter with new flavors, specials, and Sweet Reba&apos;s news delivered to your inbox.
                  </p>
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First name"
                      className="w-full bg-white border border-reba-pink/20 rounded-lg px-5 py-3.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white border border-reba-pink/20 rounded-lg px-5 py-3.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                    />
                    <button
                      type="submit"
                      className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3.5 rounded-full text-base font-semibold transition-colors"
                    >
                      Count Me In!
                    </button>
                  </form>
                  <p className="text-reba-muted text-sm mt-5">No spam, ever. Just the sweet stuff.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
