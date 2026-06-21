"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CakeCarousel } from "@/components/CakeGallery";
import { submitWaitlist } from "@/lib/waitlist";
import CustomCakeOrderForm from "@/components/CustomCakeOrderForm";
import { CONTACT_FALLBACK, type ContactInfo } from "@/lib/contact-info";

const detailImages = [
  { src: "/cake-detail-1.png", alt: "White ranunculus detail" },
  { src: "/cake-detail-2.png", alt: "Pink gold leaf detail" },
  { src: "/cake-detail-3.png", alt: "Red roses and piping detail" },
  { src: "/cake-detail-4.png", alt: "Beach cake detail" },
  { src: "/cake-detail-5.png", alt: "Blue pearls detail" },
];

const dreamyImages = [
  { src: "/cake-dreamy-1.jpg", alt: "Rustic tiered cake with anemones" },
  { src: "/cake-dreamy-2.jpg", alt: "Pink cake with gold leaf" },
  { src: "/cake-dreamy-3.jpg", alt: "White tiered cake with ranunculus" },
  { src: "/cake-dreamy-4.jpg", alt: "Wedding cake with red roses" },
];

const favoriteImages = [
  { src: "/cake-fav-1.jpg", alt: "Succulent buttercream cake" },
  { src: "/cake-fav-2.jpg", alt: "Peacock cake with flowers" },
  { src: "/cake-fav-3.jpg", alt: "Pink and purple roses tiered cake" },
  { src: "/cake-fav-4.jpg", alt: "Book stack illusion cake" },
];

const specialImages = [
  { src: "/cake-special-1.jpg", alt: "Guadalupe cake with roses" },
  { src: "/cake-special-2.jpg", alt: "Bixby Bridge chocolate cake" },
  { src: "/cake-special-3.jpg", alt: "Pink peony semi-naked cake" },
  { src: "/cake-special-4.jpg", alt: "Beach theme cake" },
];

const standardCakes = [
  { name: "Life by Chocolate", image: "/product-life-by-chocolate.jpg" },
  { name: "Carrot Cake", image: "/product-carrot-cake.jpg" },
  { name: 'Chocolate 6" Cake', image: "/product-chocolate-whole-cake.jpg" },
];

const cakeSizes = [
  { name: '6" Round', serves: "~10-12 servings", price: "$40" },
  { name: '8" Round', serves: "~15-20 servings", price: "$55" },
  { name: '9" Round', serves: "~20-25 servings", price: "$65" },
  { name: "1/4 Sheet", serves: "~30-35 servings", price: "$45" },
  { name: "Cupcakes", serves: "Per dozen", price: "$36/dz" },
];

export type CakesCopy = {
  heroHeading: string;
  heroSub1: string;
  heroSub2: string;
  favoriteHeading: string;
  favoriteSub: string;
  specialHeading: string;
  specialSub: string;
  orderHeading: string;
  orderSub: string;
  callLine1: string;
  callLine2: string;
  callLeadtime: string;
  planFast: string;
  planWedding: string;
  planEvent: string;
};

const CAKES_COPY_FALLBACK: CakesCopy = {
  heroHeading: "Custom Cakes",
  heroSub1: "As seen on Food Network's Cake Wars.",
  heroSub2: "Every cake is a custom work of art, designed and baked with love.",
  favoriteHeading: "Favorite Thing",
  favoriteSub: "The ones everyone asks about",
  specialHeading: "Special Occasion",
  specialSub: "Weddings, milestones, and celebrations worth remembering",
  orderHeading: "Start Your Order",
  orderSub: "Order online below, give us a call, or chat with us — whatever's easiest for you.",
  callLine1: "Call to Order",
  callLine2: "Your Custom Cake",
  callLeadtime: "Please allow 7 days for custom cake orders.",
  planFast: "Need a Cake Fast?",
  planWedding: "Planning a Wedding?",
  planEvent: "Planning an Event?",
};

function ZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border border-reba-border rounded-full w-10 h-10 flex items-center justify-center text-reba-ink hover:text-reba-pink transition-colors shadow-md" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <Image src={src} alt={alt} width={1200} height={1500} sizes="(max-width: 640px) 100vw, 512px" className="w-full h-auto object-cover" />
        <div className="p-4 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-ink">{alt}</h3>
        </div>
      </div>
    </div>
  );
}

export default function CakesPageClient({
  copy = CAKES_COPY_FALLBACK,
  contact = CONTACT_FALLBACK,
}: {
  copy?: CakesCopy;
  contact?: ContactInfo;
}) {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const [cakeEmail, setCakeEmail] = useState("");
  const [cakePhone, setCakePhone] = useState("");
  const [cakeSubmitted, setCakeSubmitted] = useState(false);
  const [cakeLoading, setCakeLoading] = useState(false);
  const [cakeError, setCakeError] = useState("");
  const [callbackOpen, setCallbackOpen] = useState(false);

  async function handleCustomCakeCallback(e: React.FormEvent) {
    e.preventDefault();
    if (!cakeEmail.trim() || !cakePhone.trim()) return;
    setCakeLoading(true);
    setCakeError("");
    const result = await submitWaitlist({
      email: cakeEmail.trim(),
      phone: cakePhone.trim(),
      notes: "Callback requested from Custom Cakes page.",
      source_context: "cake-callback-custom",
    });
    setCakeLoading(false);
    if (result.ok) {
      setCakeSubmitted(true);
    } else {
      setCakeError(result.error);
    }
  }

  return (
    <div>
      {/* Hero */}
      <Hero
        src="/banner-unicorn-cakes.jpg"
        alt="Beautiful unicorn cakes with sprinkles and floral decorations"
        height="md"
        gradient
      />
      <section className="py-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4">
          {copy.heroHeading}
        </h1>
        <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-4 tracking-wide">
          {copy.heroSub1}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide">
          {copy.heroSub2}
        </p>
      </section>

      {/* Favorite Thing Gallery */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            {copy.favoriteHeading}
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">{copy.favoriteSub}</p>
          <CakeCarousel images={favoriteImages} />
        </div>
      </section>

      {/* Special Occasion Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            {copy.specialHeading}
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">{copy.specialSub}</p>
          <CakeCarousel images={specialImages} />
        </div>
      </section>

      {/* Order Your Custom Cake (online order form) */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-3">
            {copy.orderHeading}
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">
            {copy.orderSub}
          </p>
          <CustomCakeOrderForm />
        </div>
      </section>

      {/* Call to Order */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F382}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-ink mb-1">
              {copy.callLine1}
            </h3>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-ink mb-3">
              {copy.callLine2}
            </h3>
            <p className="text-reba-pink text-lg sm:text-xl font-bold mb-8">
              {copy.callLeadtime}
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
                {cakeSubmitted ? (
                  <p className="text-reba-pink font-semibold text-base">We&apos;ll be in touch! Reba will call you soon — we reply during business hours (Tue–Fri 8–5, Sat 9–5).</p>
                ) : !callbackOpen ? (
                  <Button onClick={() => setCallbackOpen(true)}>
                    Request a Call Back
                  </Button>
                ) : (
                  <div className="bg-reba-card border border-reba-border rounded-xl p-5 relative">
                    <button
                      onClick={() => setCallbackOpen(false)}
                      className="absolute top-2 right-2 min-w-12 min-h-12 inline-flex items-center justify-center text-reba-muted hover:text-reba-pink transition-colors text-xl leading-none"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <p className="text-reba-ink font-semibold text-sm mb-4">Leave your details and we&apos;ll call you back</p>
                    <form onSubmit={handleCustomCakeCallback} className="space-y-3 max-w-sm mx-auto">
                      <Input
                        variant="rounded"
                        type="email"
                        name="cakeEmail"
                        value={cakeEmail}
                        onChange={(e) => setCakeEmail(e.target.value)}
                        placeholder="Your email address *"
                        required
                      />
                      <Input
                        variant="rounded"
                        type="tel"
                        name="cakePhone"
                        value={cakePhone}
                        onChange={(e) => setCakePhone(e.target.value)}
                        placeholder="Your phone number *"
                        required
                      />
                      <Button type="submit" disabled={cakeLoading} className="w-full">
                        {cakeLoading ? "Sending..." : "Request a Call Back"}
                      </Button>
                      {cakeError && (
                        <p className="text-reba-pink text-xs text-center">{cakeError}</p>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Planning Buttons */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/cakes/signature"
            className="flex-1 text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-4 rounded-full text-xl font-semibold italic transition-colors shadow-md flex items-center justify-center"
          >
            {copy.planFast}
          </a>
          <a
            href="/wedding-cakes"
            className="flex-1 text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-4 rounded-full text-xl font-semibold italic transition-colors shadow-md flex items-center justify-center"
          >
            {copy.planWedding}
          </a>
          <a
            href="/catering"
            className="flex-1 text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-4 rounded-full text-xl font-semibold italic transition-colors shadow-md flex items-center justify-center"
          >
            {copy.planEvent}
          </a>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {zoomImage && <ZoomModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
    </div>
  );
}
