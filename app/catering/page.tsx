"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { submitWaitlist } from "@/lib/waitlist";

export default function CateringPage() {
  const [cateringName, setCateringName] = useState("");
  const [cateringPhone, setCateringPhone] = useState("");
  const [cateringNotes, setCateringNotes] = useState("");
  const [cateringSubmitted, setCateringSubmitted] = useState(false);
  const [cateringLoading, setCateringLoading] = useState(false);
  const [cateringError, setCateringError] = useState("");

  async function handleCateringSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = cateringName.trim();
    const phone = cateringPhone.trim();
    const notes = cateringNotes.trim();
    if (!name || !phone) return;
    // Phone is the only callback channel now (no email field), so guard
    // against junk: require at least 10 digits before it can reach Reba.
    if (phone.replace(/\D/g, "").length < 10) {
      setCateringError("Please enter a valid phone number so Reba can reach you.");
      return;
    }
    setCateringLoading(true);
    setCateringError("");
    const result = await submitWaitlist({
      name,
      phone,
      notes,
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
      <Hero src="/slideshow-snickerdoodles.jpg" alt="Fresh-baked snickerdoodle cookies" height="md" />

      {/* Coming Soon + Call Us */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl text-reba-pink mb-10">
            Feeding a Crowd?
          </h2>

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F4DE}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-ink mb-3">
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
                    <p className="text-reba-muted text-sm mb-4">Or tell us about your event and we&apos;ll reach out</p>
                    <form onSubmit={handleCateringSubmit} className="space-y-3 max-w-sm mx-auto text-left">
                      <input
                        type="text"
                        value={cateringName}
                        onChange={(e) => setCateringName(e.target.value)}
                        placeholder="Your name"
                        required
                        autoComplete="name"
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-3 text-base text-reba-ink placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <input
                        type="tel"
                        value={cateringPhone}
                        onChange={(e) => setCateringPhone(e.target.value)}
                        placeholder="Phone number"
                        required
                        autoComplete="tel"
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-3 text-base text-reba-ink placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <textarea
                        value={cateringNotes}
                        onChange={(e) => setCateringNotes(e.target.value)}
                        placeholder="What are you looking for? (event, date, how many people, what you'd love)"
                        rows={4}
                        className="w-full bg-white border border-reba-border rounded-2xl px-5 py-3 text-base text-reba-ink placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition resize-y"
                      />
                      <button
                        type="submit"
                        disabled={cateringLoading}
                        className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full text-sm font-medium transition-colors disabled:opacity-60"
                      >
                        {cateringLoading ? "Sending..." : "Request Consultation"}
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
