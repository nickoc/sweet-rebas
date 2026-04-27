"use client";

import { useState, useEffect } from "react";

const standardCakes = [
  { name: "Life by Chocolate", image: "/product-life-by-chocolate.jpg" },
  { name: "Strawberries and Cream", image: "/product-strawberries-cream.jpg" },
  { name: "Carrot Cake", image: "/product-carrot-cake.jpg" },
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

export default function SignatureCakesPage() {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const [cakeEmail, setCakeEmail] = useState("");
  const [cakePhone, setCakePhone] = useState("");
  const [cakeSubmitted, setCakeSubmitted] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <img src="/banner-signature-cakes.jpg" alt="Layered strawberries and cream cake slice" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.3)] to-transparent" />
        <div className="relative min-h-[60vh]" />
      </section>
      <section className="py-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4">
          Signature Cakes
        </h1>
        <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide">
          Our most loved cakes, baked fresh for you.
        </p>
      </section>

      {/* Standard Cakes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <p className="text-reba-pink text-lg sm:text-xl font-bold mb-2">
              Please allow 48 hours for Signature Cake orders, or call to check availability in our store.
            </p>
            <p className="text-reba-pink text-lg sm:text-xl font-bold mb-8">
              We also deliver.
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


      {/* Planning Buttons */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/cakes"
            className="flex-1 text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-4 rounded-full text-xl font-semibold italic transition-colors shadow-md flex items-center justify-center"
          >
            Planning for a Special Occasion?
          </a>
          <a
            href="/wedding-cakes"
            className="flex-1 text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-4 rounded-full text-xl font-semibold italic transition-colors shadow-md flex items-center justify-center"
          >
            Planning a Wedding?
          </a>
          <a
            href="/catering"
            className="flex-1 text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-4 rounded-full text-xl font-semibold italic transition-colors shadow-md flex items-center justify-center"
          >
            Planning an Event?
          </a>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {zoomImage && <ZoomModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
    </div>
  );
}
