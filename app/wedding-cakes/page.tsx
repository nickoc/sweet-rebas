"use client";

import { useState } from "react";

export default function WeddingCakesPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Connect to email service
    setSubmitted(true);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="/cake-dreamy-3.jpg" alt="Beautiful wedding cake with white ranunculus" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.6)] via-[rgba(255,248,240,0.15)_30%] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl lg:text-8xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Wedding Cakes
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-2 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Your love story, beautifully told in cake
          </p>
        </div>
      </section>

      {/* Intro + Email Capture */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-reba-soft leading-relaxed text-lg mb-2">
            Your wedding cake should be as extraordinary as your love story.
          </p>
          <p className="text-reba-muted leading-relaxed mb-8">
            Reba works personally with every couple to design a centerpiece that&apos;s as beautiful as it is delicious. Multi-tier designs, custom flavors, tasting sessions &mdash; every detail is crafted just for you.
          </p>

          {submitted ? (
            <div className="bg-white border border-reba-pink/30 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-3">{"\u2728"}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-2">
                We&apos;ll be in touch!
              </h3>
              <p className="text-reba-muted text-sm">
                Reba will reach out to schedule your wedding cake consultation. We can&apos;t wait to create something beautiful for your big day!
              </p>
            </div>
          ) : (
            <div className="bg-white border border-reba-pink/30 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-3">{"\u{1F492}"}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-2">
                Schedule Your Consultation with Reba
              </h3>
              <p className="text-reba-muted text-sm mb-6">
                Leave your email and Reba will personally reach out to schedule a tasting and design consultation.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-reba-card border border-reba-border rounded-lg px-4 py-3 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                />
                <button
                  type="submit"
                  className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full font-medium transition-colors"
                >
                  Request Consultation
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Info */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-6">
            Wedding Cake Pricing
          </h2>
          <p className="text-reba-soft text-sm leading-relaxed mb-4">
            Custom consultation required for all wedding cakes. Multi-tier designs start at <span className="text-reba-pink font-semibold">$150</span>. Tasting sessions available.
          </p>
          <p className="text-reba-muted text-sm">
            Call <a href="tel:8316014818" className="text-reba-pink font-semibold hover:text-reba-pink-hover">(831) 601-4818</a> or <a href="tel:8316760628" className="text-reba-pink font-semibold hover:text-reba-pink-hover">(831) 676-0628</a> to get started.
          </p>
        </div>
      </section>
    </div>
  );
}
