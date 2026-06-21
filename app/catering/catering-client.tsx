"use client";

import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { submitWaitlist } from "@/lib/waitlist";
import { CONTACT_FALLBACK, type ContactInfo } from "@/lib/contact-info";
import OwnerGallery from "@/components/OwnerGallery";
import type { GalleryImage } from "@/lib/galleries";

export type CateringCopy = {
  heading: string;
  callHeading: string;
  callBody: string;
  formPrompt: string;
};

const CATERING_COPY_FALLBACK: CateringCopy = {
  heading: "Feeding a Crowd?",
  callHeading: "Call Us",
  callBody:
    "Interested in catering for your next event? Give us a call and we'll put something special together for you.",
  formPrompt: "Or tell us about your event and we'll reach out",
};

export default function CateringPageClient({
  copy = CATERING_COPY_FALLBACK,
  contact = CONTACT_FALLBACK,
  gallery = [],
}: {
  copy?: CateringCopy;
  contact?: ContactInfo;
  gallery?: GalleryImage[];
}) {
  const [cateringName, setCateringName] = useState("");
  const [cateringPhone, setCateringPhone] = useState("");
  const [cateringEmail, setCateringEmail] = useState("");
  const [cateringNotes, setCateringNotes] = useState("");
  const [cateringSubmitted, setCateringSubmitted] = useState(false);
  const [cateringLoading, setCateringLoading] = useState(false);
  const [cateringError, setCateringError] = useState("");
  // Synchronous in-flight guard. setCateringLoading is async (the disabled
  // button only updates on the next render), so two submits firing in the
  // same tick could both pass the checks and double-POST — which sent Reba
  // duplicate inquiries + alerts. A ref flips immediately, so the second
  // call returns before it can submit.
  const submittingRef = useRef(false);

  async function handleCateringSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    const name = cateringName.trim();
    const phone = cateringPhone.trim();
    const email = cateringEmail.trim();
    const notes = cateringNotes.trim();
    if (!name || !phone) return;
    // Phone is required as the primary callback channel; email is optional
    // (also used to add them to Reba's Notebook). Guard against junk:
    // require at least 10 digits before it can reach Reba.
    if (phone.replace(/\D/g, "").length < 10) {
      setCateringError("Please enter a valid phone number so Reba can reach you.");
      return;
    }
    submittingRef.current = true;
    setCateringLoading(true);
    setCateringError("");
    const result = await submitWaitlist({
      name,
      phone,
      email: email || undefined,
      notes,
      source_context: "catering-inquiry",
    });
    setCateringLoading(false);
    submittingRef.current = false;
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
      <OwnerGallery photos={gallery} heading="Catering Gallery" />

      {/* Coming Soon + Call Us */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl text-reba-pink mb-10">
            {copy.heading}
          </h2>

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F4DE}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-ink mb-3">
              {copy.callHeading}
            </h3>
            <p className="text-reba-muted text-base sm:text-lg mb-8">
              {copy.callBody}
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-reba-muted text-sm mb-1">Old Town Salinas</p>
                <a href="tel:8316760628" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  {contact.salinasPhone}
                </a>
              </div>
              <div>
                <p className="text-reba-muted text-sm mb-1">Carmel Crossroads</p>
                <a href="tel:8316014818" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  {contact.carmelPhone}
                </a>
              </div>
              <div className="pt-4 border-t border-reba-border mt-4">
                {cateringSubmitted ? (
                  <p className="text-reba-pink font-semibold text-base">We&apos;ll be in touch! Reba will reach out soon — we reply during business hours (Tue–Fri 8–5, Sat 9–5).</p>
                ) : (
                  <>
                    <p className="text-reba-muted text-sm mb-4">{copy.formPrompt}</p>
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
                      <input
                        type="email"
                        value={cateringEmail}
                        onChange={(e) => setCateringEmail(e.target.value)}
                        placeholder="Email (optional)"
                        autoComplete="email"
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
