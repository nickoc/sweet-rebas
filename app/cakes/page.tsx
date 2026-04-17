"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CakeSlideshow, CakeCarousel } from "@/components/CakeGallery";

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
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border border-reba-border rounded-full w-10 h-10 flex items-center justify-center text-reba-cream hover:text-reba-pink transition-colors shadow-md" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <img src={src} alt={alt} className="w-full object-cover" />
        <div className="p-4 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream">{alt}</h3>
        </div>
      </div>
    </div>
  );
}

export default function CakesPage() {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const [cakeEmail, setCakeEmail] = useState("");
  const [cakePhone, setCakePhone] = useState("");
  const [cakeSubmitted, setCakeSubmitted] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <img src="/banner-unicorn-cakes.jpg" alt="Beautiful unicorn cakes with sprinkles and floral decorations" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.3)] to-transparent" />
        <div className="relative min-h-[60vh]" />
      </section>
      <section style={{ backgroundColor: "#fff5f5" }} className="py-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4">
          Custom Cakes
        </h1>
        <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-1 tracking-wide">
          As seen on Food Network&apos;s Cake Wars.
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide">
          Every cake is a custom work of art, designed and baked with love.
        </p>
      </section>

      {/* Call to Order */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F382}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-1">
              Call to Order
            </h3>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-3">
              Your Custom Cake
            </h3>
            <p className="text-reba-pink text-lg sm:text-xl font-bold mb-8">
              Please allow 7 days for custom cake orders.
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
                {cakeSubmitted ? (
                  <p className="text-reba-pink font-semibold text-base">We&apos;ll be in touch! Reba will call you soon.</p>
                ) : !callbackOpen ? (
                  <button
                    onClick={() => setCallbackOpen(true)}
                    className="bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-3 rounded-full text-base font-semibold transition-colors"
                  >
                    Request a Call Back
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
                    <form onSubmit={(e) => { e.preventDefault(); if (cakeEmail.trim() && cakePhone.trim()) setCakeSubmitted(true); }} className="space-y-3 max-w-sm mx-auto">
                      <input
                        type="email"
                        value={cakeEmail}
                        onChange={(e) => setCakeEmail(e.target.value)}
                        placeholder="Your email address *"
                        required
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <input
                        type="tel"
                        value={cakePhone}
                        onChange={(e) => setCakePhone(e.target.value)}
                        placeholder="Your phone number *"
                        required
                        className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <button type="submit" className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full text-sm font-semibold transition-colors">
                        Request a Call Back
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorite Thing Gallery */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            Favorite Thing
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">The ones everyone asks about</p>
          <CakeCarousel images={favoriteImages} />
        </div>
      </section>

      {/* Special Occasion Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            Special Occasion
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">Weddings, milestones, and celebrations worth remembering</p>
          <CakeCarousel images={specialImages} />
        </div>
      </section>



      {/* Visit Us */}
      <section className="bg-reba-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-6xl text-white mb-5">
            Visit Us to Discuss Your Dream Cake
          </h2>
          <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-lg mx-auto">
            Every great cake starts with a conversation. Tell us about your occasion
            and let&apos;s create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="text-white">
              <a
                href="https://maps.google.com/?q=Sweet+Rebas+206+Crossroads+Blvd+Carmel+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 text-base hover:text-white transition-colors underline underline-offset-2"
              >
                Carmel Crossroads
              </a>
              <br />
              <a href="tel:8316014818" className="text-2xl font-semibold hover:text-white/80 transition-colors">
                (831) 601-4818
              </a>
            </div>
            <div className="text-white">
              <a
                href="https://maps.google.com/?q=Sweet+Rebas+268+Main+St+Salinas+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 text-base hover:text-white transition-colors underline underline-offset-2"
              >
                Old Town Salinas
              </a>
              <br />
              <a href="tel:8316760628" className="text-2xl font-semibold hover:text-white/80 transition-colors">
                (831) 676-0628
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {zoomImage && <ZoomModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
    </div>
  );
}
