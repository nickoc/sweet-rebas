"use client";

import { useState, useEffect } from "react";
import { useCart, slug } from "@/lib/cart-context";
import CartSummary from "@/components/CartSummary";

/* ── Board Data ─────────────────────────────────────────── */

interface BoardItem {
  emoji: string;
  name: string;
  price: number;
  description: string;
  soldOut?: boolean;
}

interface Category {
  name: string;
  items: BoardItem[];
}

const DAILY_PICKS = [
  {
    id: "soup-of-the-day",
    label: "Soup of the Day",
    emoji: "\u{1F372}",
    name: "Tomato Basil Bisque",
    description: "Michael\u2019s recipe \u2014 creamy, herby, perfect with a warm house roll.",
    price: 7.00,
  },
  {
    id: "sandwich-of-the-day",
    label: "Sandwich of the Day",
    emoji: "\u{1F96A}",
    name: "Turkey & Swiss",
    description: "Sliced turkey, Swiss cheese, lettuce, tomato, and honey mustard on fresh sourdough.",
    price: 6.00,
  },
];

const CATEGORIES: Category[] = [
  {
    name: "Soups",
    items: [
      { emoji: "\u{1F372}", name: "Tomato Basil Bisque", price: 7.00, description: "Michael\u2019s recipe \u2014 creamy, herby, perfect with a warm house roll. Today\u2019s featured soup." },
      { emoji: "\u{1F372}", name: "Chicken Noodle", price: 7.00, description: "House-pulled chicken, carrots, celery, and tender egg noodles in a rich golden broth." },
      { emoji: "\u{1F372}", name: "Broccoli Cheddar", price: 7.00, description: "Sharp cheddar, tender broccoli florets, a splash of cream. Comfort in a bowl.", soldOut: true },
      { emoji: "\u{1F372}", name: "Minestrone", price: 7.00, description: "Hearty Italian vegetable soup with white beans, pasta, and tomato. Naturally vegetarian." },
    ],
  },
  {
    name: "Sandwiches",
    items: [
      { emoji: "\u{1F96A}", name: "Turkey & Swiss", price: 6.00, description: "Sliced turkey, Swiss cheese, lettuce, tomato, and honey mustard on fresh sourdough." },
      { emoji: "\u{1F96A}", name: "Ham & Swiss", price: 6.00, description: "Honey ham and Swiss cheese on fresh-baked buttermilk bread. Simple, classic, satisfying." },
      { emoji: "\u{1F96A}", name: "Tuna Salad", price: 6.00, description: "House-made tuna salad with celery, red onion, and dill on fresh bread. Light and satisfying." },
      { emoji: "\u{1F96A}", name: "Egg Salad", price: 6.00, description: "Creamy homemade egg salad on your choice of bread. A timeless favorite." },
    ],
  },
  {
    name: "Breakfast Burritos",
    items: [
      { emoji: "\u{1F32F}", name: "Classic Burrito", price: 5.50, description: "Eggs, cheese, potatoes, and Reba\u2019s house salsa in a warm flour tortilla. Simple and satisfying." },
      { emoji: "\u{1F32F}", name: "Bacon Burrito", price: 6.00, description: "Crispy bacon, scrambled eggs, cheddar, and potatoes. The weekend warrior\u2019s breakfast." },
      { emoji: "\u{1F32F}", name: "Sausage Burrito", price: 6.00, description: "Savory sausage, eggs, pepper jack, and roasted peppers. Hearty and filling." },
      { emoji: "\u{1F32F}", name: "Chorizo Burrito", price: 6.00, description: "Spicy chorizo, eggs, cotija cheese, and pico de gallo. A kick to start your day." },
    ],
  },
];

const COMING_TOMORROW = ["Butternut Squash Soup is back tomorrow"];

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
  const [flashId, setFlashId] = useState<string | null>(null);
  const { addToCart } = useCart();

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

  function handleAdd(id: string, name: string, price: number, emoji: string) {
    addToCart({ id, name, price, emoji }, 1);
    setFlashId(id);
    setTimeout(() => setFlashId(null), 400);
  }

  const isOpen = closingIn !== "Closed";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section style={{ backgroundColor: "#fff5f5" }} className="border-b border-reba-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink mb-2">
                Reba&apos;s Board
              </h1>
              <p className="text-reba-muted text-lg">
                {formatDate()} &mdash; Salinas Location
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 text-base font-medium ${isOpen ? "text-emerald-600" : "text-red-500"}`}>
                <span className={`w-3 h-3 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
                {isOpen ? "Open Now" : "Closed"}
              </span>
              {isOpen && (
                <span className="text-sm text-reba-muted bg-white border border-reba-border rounded-full px-4 py-1.5">
                  Closes in {closingIn}
                </span>
              )}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-6">
            <h3 className="text-reba-cream font-semibold text-lg mb-3">Opening Hours</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-base">
              <div><span className="text-reba-muted">Mon&ndash;Fri:</span> <span className="text-reba-cream font-medium">7am &ndash; 3pm</span></div>
              <div><span className="text-reba-muted">Saturday:</span> <span className="text-reba-cream font-medium">8am &ndash; 3pm</span></div>
              <div><span className="text-reba-muted">Sunday:</span> <span className="text-reba-cream font-medium">8am &ndash; 2pm</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Soup & Sandwich of the Day — side by side */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 gap-6">
          {DAILY_PICKS.map((pick) => (
            <div
              key={pick.id}
              onClick={() => handleAdd(pick.id, `${pick.label}: ${pick.name}`, pick.price, pick.emoji)}
              className={`cursor-pointer bg-white border-2 rounded-2xl overflow-hidden transition-all ${flashId === pick.id ? "border-reba-pink shadow-lg scale-[1.02]" : "border-reba-pink/30 hover:border-reba-pink/40 hover:shadow-lg"}`}
            >
              <div className="bg-reba-pink/10 px-6 py-4 border-b border-reba-border flex items-center justify-between">
                <span className="text-base uppercase tracking-wider text-reba-pink font-semibold">
                  {pick.label}
                </span>
                <span className="text-3xl">{pick.emoji}</span>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream">
                    {pick.name}
                  </h3>
                  <span className="text-reba-pink font-semibold text-xl">${pick.price.toFixed(2)}</span>
                </div>
                <p className="text-reba-muted text-base sm:text-lg leading-relaxed mb-4">
                  {pick.description}
                </p>
                <span className={`inline-block px-6 py-2 rounded-full font-semibold text-sm transition-colors ${flashId === pick.id ? "bg-green-500 text-white" : "bg-reba-pink text-white"}`}>
                  {flashId === pick.id ? "Added!" : "Tap to Add"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {CATEGORIES.map((category) => (
          <div key={category.name} className="mb-14 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream">
                {category.name}
              </h2>
              <div className="flex-1 h-px bg-reba-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((item) => {
                const itemId = slug(item.name);
                return (
                  <div
                    key={item.name}
                    onClick={() => !item.soldOut && handleAdd(itemId, item.name, item.price, item.emoji)}
                    className={`bg-white border-2 rounded-xl p-6 transition-all ${
                      item.soldOut
                        ? "border-reba-border opacity-60 cursor-default"
                        : flashId === itemId
                          ? "border-reba-pink shadow-lg scale-[1.02] cursor-pointer"
                          : "border-reba-border hover:border-reba-pink/30 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <h3 className="text-reba-cream font-semibold text-xl">{item.name}</h3>
                      </div>
                      {item.soldOut ? (
                        <span className="text-sm text-red-500 font-semibold bg-red-50 px-3 py-1 rounded-full">
                          Sold Out
                        </span>
                      ) : (
                        <span className="text-reba-pink font-semibold text-xl">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-reba-muted text-base leading-relaxed mb-3">
                      {item.description}
                    </p>
                    {item.soldOut ? (
                      <p className="text-reba-pink text-base italic">Gone! Back tomorrow.</p>
                    ) : (
                      <span className={`inline-block px-6 py-2 rounded-full font-semibold text-sm transition-colors ${flashId === itemId ? "bg-green-500 text-white" : "bg-reba-pink text-white"}`}>
                        {flashId === itemId ? "Added!" : "Tap to Add"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <CartSummary />
      </section>

      {/* Coming Tomorrow */}
      <section className="bg-reba-pink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-white mb-8">
            Coming Tomorrow
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {COMING_TOMORROW.map((item) => (
              <span
                key={item}
                className="bg-white/20 border border-white/30 rounded-full px-6 py-3 text-base text-white font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
