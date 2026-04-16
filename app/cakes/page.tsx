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
  const [cakeSubmitted, setCakeSubmitted] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-8">
        <img src="/banner-unicorn-cakes.jpg" alt="Beautiful unicorn cakes with sprinkles and floral decorations" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.95)] via-[rgba(255,248,240,0.6)_45%] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Custom Cakes
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-1 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            As seen on Food Network&apos;s Cake Wars.
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Every cake is a custom work of art, designed and baked with love.
          </p>
        </div>
      </section>

      {/* Standard Cakes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-cream text-center mb-4">
          Our Standard Cakes
        </h2>
        <p className="text-reba-pink text-xl sm:text-2xl font-bold text-center mb-10">Ready today or within 48–72 hours</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {standardCakes.map((cake) => (
            <div key={cake.name} className="bg-white border-2 border-reba-pink/30 rounded-xl overflow-hidden">
              <div className="cursor-zoom-in overflow-hidden" onClick={() => setZoomImage({ src: cake.image, alt: cake.name })}>
                <img src={cake.image} alt={cake.name} className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-reba-cream font-semibold text-xl">{cake.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Sizes & Pricing */}
        <h3 className="font-semibold text-reba-cream text-2xl mb-6 text-center">Sizes &amp; Pricing</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {cakeSizes.map((size) => (
            <div key={size.name} className="bg-white border border-reba-pink/30 rounded-xl p-4 text-center">
              <h4 className="text-reba-cream font-semibold text-lg">{size.name}</h4>
              <p className="text-reba-muted text-base mb-1">{size.serves}</p>
              <p className="text-reba-pink font-bold text-xl">{size.price}</p>
            </div>
          ))}
        </div>

        {/* Flavor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
            <h4 className="text-reba-pink font-semibold text-lg mb-2">
              Standard Flavors <span className="font-normal text-base text-reba-muted">(always available)</span>
            </h4>
            <p className="text-reba-soft text-[1.1rem] leading-relaxed">
              Classic Vanilla<br />Carrot<br />Life by Chocolate
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
            <h4 className="text-reba-pink font-semibold text-lg mb-2">
              Specialty Flavors <span className="font-normal text-base text-reba-muted">(7-day notice)</span>
            </h4>
            <p className="text-reba-soft text-[1.1rem] leading-relaxed">
              Raspberry Lemonade<br />Blackberry Lavender Lemon<br />Razzelberry<br />Lemon<br />Red Velvet<br />Cookies &amp; Cream<br />Chocolate Peanut Butter
            </p>
          </div>
        </div>
      </section>

      {/* Call to Order */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F382}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-3">
              Call to Order Your Cake
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
                  <p className="text-reba-pink font-semibold text-base">We&apos;ll be in touch! Reba will reach out soon.</p>
                ) : (
                  <>
                    <p className="text-reba-muted text-sm mb-3">Or leave your email and we&apos;ll reach out</p>
                    <form onSubmit={(e) => { e.preventDefault(); if (cakeEmail.trim()) setCakeSubmitted(true); }} className="flex gap-3 max-w-sm mx-auto">
                      <input
                        type="email"
                        value={cakeEmail}
                        onChange={(e) => setCakeEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        className="flex-1 bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                      />
                      <button type="submit" className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                        Request Consultation
                      </button>
                    </form>
                  </>
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
