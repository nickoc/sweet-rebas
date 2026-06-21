"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CakeCarousel } from "@/components/CakeGallery";
import { Hero } from "@/components/Hero";
import { submitWaitlist } from "@/lib/waitlist";
import { CONTACT_FALLBACK, type ContactInfo } from "@/lib/contact-info";
import type { GalleryImage } from "@/lib/galleries";

const whiteWeddingImages = [
  { src: "/cake-dreamy-3.jpg", alt: "White two-tier cake with ranunculus and eucalyptus" },
  { src: "/cake-dreamy-1.jpg", alt: "Rustic white tiered cake with anemones" },
  { src: "/cake-dreamy-4.jpg", alt: "White four-tier wedding cake with red roses" },
  { src: "/cake-special-3.jpg", alt: "Semi-naked white cake with pink peonies" },
];

export type WeddingCopy = {
  heroHeading: string;
  heroSub: string;
  detailHeading: string;
  detailSub: string;
  galleryHeading: string;
  gallerySub: string;
  introLine1: string;
  introLine2: string;
  consultHeading: string;
  pricingHeading: string;
  pricingLine1: string;
  pricingLine3: string;
};

const WEDDING_COPY_FALLBACK: WeddingCopy = {
  heroHeading: "Wedding Cakes",
  heroSub: "Your love story, beautifully told in cake",
  detailHeading: "Reba's Attention to Detail",
  detailSub: "A few of our favorite creations",
  galleryHeading: "Wedding Cakes",
  gallerySub: "Timeless elegance in every tier",
  introLine1: "Your wedding cake should be as extraordinary as your love story.",
  introLine2:
    "Reba works personally with every couple to design a centerpiece that's as beautiful as it is delicious. Multi-tier designs, custom flavors, tasting sessions — every detail is crafted just for you.",
  consultHeading: "Schedule Your Consultation with Reba",
  pricingHeading: "Wedding Cake Pricing",
  pricingLine1: "Custom consultation required for all wedding cakes.",
  pricingLine3: "Tasting sessions available.",
};

export default function WeddingCakesPageClient({
  copy = WEDDING_COPY_FALLBACK,
  contact = CONTACT_FALLBACK,
  gallery = [],
}: {
  copy?: WeddingCopy;
  contact?: ContactInfo;
  gallery?: GalleryImage[];
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [callbackOpen, setCallbackOpen] = useState(false);
  // Wedding starting price comes from the Bearing catalog (section
  // "wedding-cakes"); "$150" is the first-paint default so there's no flash.
  const [weddingPrice, setWeddingPrice] = useState("$150");
  useEffect(() => {
    let active = true;
    fetch("/api/wedding-price")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && typeof d?.price === "string" && d.price) setWeddingPrice(d.price);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  async function handleWeddingCallback(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !phone.trim()) return;
    setLoading(true);
    setErrorMsg("");
    const result = await submitWaitlist({
      email: email.trim(),
      phone: phone.trim(),
      notes: "Wedding consultation requested from Wedding Cakes page.",
      source_context: "cake-callback-wedding",
    });
    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setErrorMsg(result.error);
    }
  }

  return (
    <div>
      {/* Hero */}
      <Hero
        src="/cake-dreamy-3.jpg"
        alt="Beautiful wedding cake with white ranunculus"
        height="md"
        gradient
      />
      <section className="py-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4">
          {copy.heroHeading}
        </h1>
        <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide">
          {copy.heroSub}
        </p>
      </section>

      {/* Reba's Attention to Detail — Single Hero Image */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
          {copy.detailHeading}
        </h2>
        <p className="text-reba-muted text-center text-xl mb-10">{copy.detailSub}</p>
        <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/cake-detail-1.png"
            alt="White wedding cake with ranunculus and eucalyptus — close-up detail"
            width={1200}
            height={1500}
            sizes="(max-width: 768px) 100vw, 448px"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* White Wedding Cakes Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            {copy.galleryHeading}
          </h2>
          <p className="text-reba-muted text-center text-xl mb-10">{copy.gallerySub}</p>
          <CakeCarousel images={gallery.length ? gallery : whiteWeddingImages} />
        </div>
      </section>

      {/* Intro + Email Capture */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <p className="text-reba-soft leading-relaxed text-lg sm:text-xl mb-3">
            {copy.introLine1}
          </p>
          <p className="text-reba-muted leading-relaxed text-base sm:text-lg mb-10">
            {copy.introLine2}
          </p>

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F382}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-ink mb-3">
              {copy.consultHeading}
            </h3>
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
                {submitted ? (
                  <p className="text-reba-pink font-semibold text-base">We&apos;ll be in touch! Reba will call you soon — we reply during business hours (Tue–Fri 8–5, Sat 9–5).</p>
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
                    <p className="text-reba-ink font-semibold text-sm mb-4">Leave your details and we&apos;ll call you back</p>
                    <form onSubmit={handleWeddingCallback} className="space-y-3 max-w-sm mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address *"
                        required
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-ink placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number *"
                        required
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-ink placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full text-sm font-semibold transition-colors disabled:opacity-60"
                      >
                        {loading ? "Sending..." : "Request a Consultation"}
                      </button>
                      {errorMsg && (
                        <p className="text-reba-pink text-xs text-center">{errorMsg}</p>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-ink mb-6">
            {copy.pricingHeading}
          </h2>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed mb-1">
            {copy.pricingLine1}
          </p>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed mb-1">
            Multi-tier designs start at <span className="text-reba-pink font-semibold">{weddingPrice}</span>.
          </p>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed">
            {copy.pricingLine3}
          </p>
        </div>
      </section>
    </div>
  );
}
