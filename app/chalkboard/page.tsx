"use client";

import { useState, useEffect } from "react";

/* ── Board Data ─────────────────────────────────────────── */


const DAILY_PICKS = [
  {
    id: "soup-of-the-day",
    label: "Soup of the Day",
    emoji: "\u{1F372}",
    name: "Tomato Basil Bisque",
    description: "Michael\u2019s recipe \u2014 creamy, herby, perfect with a warm house roll.",
    price: 7.00,
    image: "/slideshow-soup.jpg",
  },
  {
    id: "sandwich-of-the-day",
    label: "Sandwich of the Day",
    emoji: "\u{1F96A}",
    name: "Turkey & Swiss",
    description: "Sliced turkey, Swiss cheese, lettuce, tomato, and honey mustard on fresh sourdough.",
    price: 6.00,
    image: "/product-breakfast-burrito.jpg",
  },
  {
    id: "cookie-of-the-day",
    label: "Cookie of the Day",
    emoji: "\u{1F36A}",
    name: "Chocolate Chip",
    description: "Reba\u2019s signature \u2014 golden edges, gooey center, real butter, premium chocolate.",
    price: 3.50,
    image: "/product-chocolate-chip.jpg",
  },
  {
    id: "bar-of-the-day",
    label: "Bar of the Day",
    emoji: "\u{1F370}",
    name: "Blondie",
    description: "Buttery, brown sugar, vanilla \u2014 a brownie\u2019s golden cousin. Chewy perfection.",
    price: 4.00,
    image: "/product-blondie.jpg",
  },
  {
    id: "sandwich-cookie-of-the-day",
    label: "Sandwich Cookie of the Day",
    emoji: "\u{1F36B}",
    name: "Chocolate Peanut Butter",
    description: "Two rich chocolate cookies with creamy peanut butter filling. Indulgent and irresistible.",
    price: 4.50,
    image: "/product-sandwich-cookies.jpg",
  },
];



/* ── Helpers ────────────────────────────────────────────── */

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/* ── Component ──────────────────────────────────────────── */

export default function ChalkboardPage() {
  const [closingIn, setClosingIn] = useState("");
  useEffect(() => {
    function calcClosing() {
      const now = new Date();
      const close = new Date();
      close.setHours(15, 0, 0, 0);
      if (now.getDay() === 0) close.setHours(14, 0, 0, 0);
      const diff = close.getTime() - now.getTime();
      if (diff <= 0) return "Closed";
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      return `${h}h ${m}m`;
    }
    setClosingIn(calcClosing());
    const timer = setInterval(() => setClosingIn(calcClosing()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isOpen = closingIn !== "Closed";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section style={{ backgroundColor: "#fff5f5" }} className="border-b border-reba-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-heading)] text-7xl sm:text-8xl text-reba-pink mb-3">
              Specials of the Day
            </h1>
            <p className="text-reba-muted text-2xl mb-4">
              {formatDate()} &mdash; Salinas Location
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className={`inline-flex items-center gap-1.5 text-lg font-medium ${isOpen ? "text-emerald-600" : "text-red-500"}`}>
                <span className={`w-3 h-3 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
                {isOpen ? "Open Now" : "Closed"}
              </span>
              {isOpen && (
                <span className="text-base text-reba-muted bg-white border border-reba-border rounded-full px-4 py-1.5">
                  Closes in {closingIn}
                </span>
              )}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-6 text-center">
            <h3 className="text-reba-cream font-semibold text-xl mb-3">Opening Hours</h3>
            <div className="flex flex-wrap justify-center gap-6 text-base">
              <div><span className="text-reba-muted">Mon&ndash;Fri:</span> <span className="text-reba-cream font-medium">7am &ndash; 3pm</span></div>
              <div><span className="text-reba-muted">Saturday:</span> <span className="text-reba-cream font-medium">8am &ndash; 3pm</span></div>
              <div><span className="text-reba-muted">Sunday:</span> <span className="text-reba-cream font-medium">8am &ndash; 2pm</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Specials of the Day — 3 on top, 2 below */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          {DAILY_PICKS.slice(0, 3).map((pick) => (
            <div
              key={pick.id}
              className="bg-white border-2 rounded-2xl overflow-hidden transition-all flex flex-col border-reba-pink/20 hover:border-reba-pink/40 hover:shadow-lg"
            >
              <div className="w-full h-48 sm:h-56 overflow-hidden">
                <img src={pick.image} alt={pick.name} className="w-full h-full object-cover" />
              </div>
              <div className="px-5 py-5 flex-1 flex flex-col">
                <span className="text-sm uppercase tracking-wider text-reba-pink font-bold mb-2">
                  {pick.label}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-2">
                  {pick.name}
                </h3>
                <p className="text-reba-muted text-base leading-relaxed mb-4 flex-1">
                  {pick.description}
                </p>
                <span className="text-reba-pink font-bold text-2xl">${pick.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: 2 cards, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {DAILY_PICKS.slice(3, 5).map((pick) => (
            <div
              key={pick.id}
              className="bg-white border-2 rounded-2xl overflow-hidden transition-all flex flex-col border-reba-pink/20 hover:border-reba-pink/40 hover:shadow-lg"
            >
              <div className="w-full h-48 sm:h-56 overflow-hidden">
                <img src={pick.image} alt={pick.name} className="w-full h-full object-cover" />
              </div>
              <div className="px-5 py-5 flex-1 flex flex-col">
                <span className="text-sm uppercase tracking-wider text-reba-pink font-bold mb-2">
                  {pick.label}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-2">
                  {pick.name}
                </h3>
                <p className="text-reba-muted text-base leading-relaxed mb-4 flex-1">
                  {pick.description}
                </p>
                <span className="text-reba-pink font-bold text-2xl">${pick.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
