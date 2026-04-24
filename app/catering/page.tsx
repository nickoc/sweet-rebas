"use client";

import { useState } from "react";
import { submitWaitlist } from "@/lib/waitlist";

export default function CateringPage() {
  const [cateringEmail, setCateringEmail] = useState("");
  const [cateringSubmitted, setCateringSubmitted] = useState(false);
  const [cateringLoading, setCateringLoading] = useState(false);
  const [cateringError, setCateringError] = useState("");

  async function handleCateringSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = cateringEmail.trim();
    if (!trimmed) return;
    setCateringLoading(true);
    setCateringError("");
    const result = await submitWaitlist({
      email: trimmed,
      source_context: "catering-inquiry",
    });
    setCateringLoading(false);
    if (result.ok) {
      setCateringSubmitted(true);
    } else {
      setCateringError(result.error);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-6">
        <img src="/slideshow-snickerdoodles.jpg" alt="Fresh-baked snickerdoodle cookies" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.95)] via-[rgba(255,248,240,0.6)_45%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        </div>
      </section>

      {/* Coming Soon + Call Us */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl text-reba-pink mb-10">
            Feeding a Crowd?
          </h2>

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F4DE}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-3">
              Call Us
            </h3>
            <p className="text-reba-muted text-base sm:text-lg mb-8">
              Interested in catering for your next event? Give us a call and we&apos;ll put something special together for you.
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
              <div className="pt-4 border-t border-reba-border mt-4">
                {cateringSubmitted ? (
                  <p className="text-reba-pink font-semibold text-base">We&apos;ll be in touch! Reba will reach out soon.</p>
                ) : (
                  <>
                    <p className="text-reba-muted text-sm mb-3">Or leave your email and we&apos;ll reach out</p>
                    <form onSubmit={handleCateringSubmit} className="flex gap-3 max-w-sm mx-auto">
                      <input
                        type="email"
                        value={cateringEmail}
                        onChange={(e) => setCateringEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        className="flex-1 bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <button
                        type="submit"
                        disabled={cateringLoading}
                        className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-60"
                      >
                        {cateringLoading ? "..." : "Request Consultation"}
                      </button>
                    </form>
                    {cateringError && (
                      <p className="text-reba-pink text-xs mt-2">{cateringError}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
