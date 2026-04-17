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
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <img src="/cake-dreamy-3.jpg" alt="Beautiful wedding cake with white ranunculus" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.3)] to-transparent" />
        <div className="relative min-h-[60vh]" />
      </section>
      <section style={{ backgroundColor: "#fff5f5" }} className="py-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4">
          Wedding Cakes
        </h1>
        <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide">
          Your love story, beautifully told in cake
        </p>
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
            Wedding Cakes
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

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F382}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-3">
              Schedule Your Consultation with Reba
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-reba-muted text-sm mb-1">Old Town Salinas</p>
                <a href="tel:8316760628" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  (831) 676-0628
                </a>
              </div>
              <div>
                <p className="text-reba-muted text-sm mb-1">Carmel Crossroads</p>
                <a href="tel:8316014818" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  (831) 601-4818
                </a>
              </div>
              <div className="pt-4 border-t border-reba-border mt-4">
                {submitted ? (
                  <p className="text-reba-pink font-semibold text-base">We&apos;ll be in touch! Reba will call you soon.</p>
                ) : !callbackOpen ? (
                  <button
                    onClick={() => setCallbackOpen(true)}
                    className="bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-3 rounded-full text-base font-semibold transition-colors"
                  >
                    Request a Consultation
                  </button>
                ) : (
                  <div className="bg-reba-card border border-reba-border rounded-xl p-5 relative">
                    <button
                      onClick={() => setCallbackOpen(false)}
                      className="absolute top-2 right-2 text-reba-muted hover:text-reba-pink transition-colors text-xl leading-none"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <p className="text-reba-cream font-semibold text-sm mb-4">Leave your details and we&apos;ll call you back</p>
                    <form onSubmit={(e) => { e.preventDefault(); if (email.trim() && phone.trim()) setSubmitted(true); }} className="space-y-3 max-w-sm mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address *"
                        required
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number *"
                        required
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <button type="submit" className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full text-sm font-semibold transition-colors">
                        Request a Consultation
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info + Call Us */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-8">
            Wedding Cake Pricing
          </h2>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed mb-1">
            Custom consultation required for all wedding cakes.
          </p>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed mb-1">
            Multi-tier designs start at <span className="text-reba-pink font-semibold">$150</span>.
          </p>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed mb-10">
            Tasting sessions available.
          </p>

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F4DE}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-3">
              Call Us
            </h3>
            <p className="text-reba-muted text-base sm:text-lg mb-8">
              Ready to start planning your wedding cake? Give us a call.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-reba-muted text-sm mb-1">Old Town Salinas</p>
                <a href="tel:8316760628" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  (831) 676-0628
                </a>
              </div>
              <div>
                <p className="text-reba-muted text-sm mb-1">Carmel Crossroads</p>
                <a href="tel:8316014818" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  (831) 601-4818
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
