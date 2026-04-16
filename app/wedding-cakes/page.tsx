"use client";

import { useState } from "react";
import { CakeCarousel } from "@/components/CakeGallery";

const whiteWeddingImages = [
  { src: "/cake-dreamy-3.jpg", alt: "White two-tier cake with ranunculus and eucalyptus" },
  { src: "/cake-dreamy-1.jpg", alt: "Rustic white tiered cake with anemones" },
  { src: "/cake-dreamy-4.jpg", alt: "White four-tier wedding cake with red roses" },
  { src: "/cake-special-3.jpg", alt: "Semi-naked white cake with pink peonies" },
];

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
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-8">
        <img src="/cake-dreamy-3.jpg" alt="Beautiful wedding cake with white ranunculus" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.95)] via-[rgba(255,248,240,0.6)_45%] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Wedding Cakes
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Your love story, beautifully told in cake
          </p>
        </div>
      </section>

      {/* Reba's Attention to Detail — Single Hero Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
          Reba&apos;s Attention to Detail
        </h2>
        <p className="text-reba-muted text-center text-xl mb-10">A few of our favorite creations</p>
        <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
          <img src="/cake-detail-1.png" alt="White wedding cake with ranunculus and eucalyptus — close-up detail" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* White Wedding Cakes Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            White Wedding Cakes
          </h2>
          <p className="text-reba-muted text-center text-xl mb-10">Timeless elegance in every tier</p>
          <CakeCarousel images={whiteWeddingImages} />
        </div>
      </section>

      {/* Intro + Email Capture */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <p className="text-reba-soft leading-relaxed text-lg sm:text-xl mb-3">
            Your wedding cake should be as extraordinary as your love story.
          </p>
          <p className="text-reba-muted leading-relaxed text-base sm:text-lg mb-10">
            Reba works personally with every couple to design a centerpiece that&apos;s as beautiful as it is delicious. Multi-tier designs, custom flavors, tasting sessions &mdash; every detail is crafted just for you.
          </p>

          {submitted ? (
            <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
              <div className="text-5xl mb-4">{"\u2728"}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-3">
                We&apos;ll be in touch!
              </h3>
              <p className="text-reba-muted text-base">
                Reba will reach out to schedule your wedding cake consultation. We can&apos;t wait to create something beautiful for your big day!
              </p>
            </div>
          ) : (
            <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
              <div className="text-5xl mb-4">{"\u{1F382}"}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-3">
                Schedule Your Consultation with Reba
              </h3>
              <p className="text-reba-muted text-base mb-6">
                Leave your email and Reba will personally reach out to schedule a tasting and design consultation.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white border border-reba-pink/20 rounded-lg px-5 py-3.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                />
                <button
                  type="submit"
                  className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3.5 rounded-full text-base font-semibold transition-colors"
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
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-8">
            Wedding Cake Pricing
          </h2>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed mb-4">
            Custom consultation required for all wedding cakes. Multi-tier designs start at <span className="text-reba-pink font-semibold">$150</span>. Tasting sessions available.
          </p>
          <p className="text-reba-muted text-base sm:text-lg">
            Call <a href="tel:8316014818" className="text-reba-pink font-semibold hover:text-reba-pink-hover">(831) 601-4818</a> or <a href="tel:8316760628" className="text-reba-pink font-semibold hover:text-reba-pink-hover">(831) 676-0628</a> to get started.
          </p>
        </div>
      </section>
    </div>
  );
}
