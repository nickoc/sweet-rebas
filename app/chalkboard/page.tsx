"use client";

import { useState, useEffect } from "react";

/* ── Board Data ─────────────────────────────────────────── */

interface BoardItem {
  emoji: string;
  name: string;
  price: number;
  description: string;
  remaining: number;
  total: number;
  bakedAt: string;
  soldOut?: boolean;
}

interface Category {
  name: string;
  items: BoardItem[];
}

const SOUP_OF_THE_DAY = {
  emoji: "\u{1F372}",
  name: "Tomato Basil Bisque",
  description: "Michael\u2019s recipe \u2014 creamy, herby, perfect with sourdough",
};

const CATEGORIES: Category[] = [
  {
    name: "Soups",
    items: [
      { emoji: "\u{1F372}", name: "Tomato Basil Bisque", price: 7.00, description: "Michael\u2019s recipe \u2014 creamy, herby, perfect with a warm house roll. Today\u2019s featured soup.", remaining: 12, total: 18, bakedAt: "10:45 AM" },
      { emoji: "\u{1F372}", name: "Chicken Noodle", price: 7.00, description: "House-pulled chicken, carrots, celery, and tender egg noodles in a rich golden broth.", remaining: 9, total: 18, bakedAt: "10:30 AM" },
      { emoji: "\u{1F372}", name: "Broccoli Cheddar", price: 7.00, description: "Sharp cheddar, tender broccoli florets, a splash of cream. Comfort in a bowl.", remaining: 0, total: 12, bakedAt: "", soldOut: true },
      { emoji: "\u{1F372}", name: "Minestrone", price: 7.00, description: "Hearty Italian vegetable soup with white beans, pasta, and tomato. Naturally vegetarian.", remaining: 14, total: 18, bakedAt: "11:05 AM" },
    ],
  },
  {
    name: "Sandwiches",
    items: [
      { emoji: "\u{1F96A}", name: "Turkey & Swiss", price: 6.00, description: "Sliced turkey, Swiss cheese, lettuce, tomato, and honey mustard on fresh sourdough.", remaining: 8, total: 10, bakedAt: "11:15 AM" },
      { emoji: "\u{1F96A}", name: "Ham & Swiss", price: 6.00, description: "Honey ham and Swiss cheese on fresh-baked buttermilk bread. Simple, classic, satisfying.", remaining: 6, total: 10, bakedAt: "11:20 AM" },
      { emoji: "\u{1F96A}", name: "Tuna Salad", price: 6.00, description: "House-made tuna salad with celery, red onion, and dill on fresh bread. Light and satisfying.", remaining: 4, total: 10, bakedAt: "11:30 AM" },
      { emoji: "\u{1F96A}", name: "Egg Salad", price: 6.00, description: "Creamy homemade egg salad on your choice of bread. A timeless favorite.", remaining: 7, total: 10, bakedAt: "11:10 AM" },
    ],
  },
  {
    name: "Breakfast Burritos",
    items: [
      { emoji: "\u{1F32F}", name: "Classic Burrito", price: 5.50, description: "Eggs, cheese, potatoes, and Reba\u2019s house salsa in a warm flour tortilla. Simple and satisfying.", remaining: 14, total: 18, bakedAt: "12:02 PM" },
      { emoji: "\u{1F32F}", name: "Bacon Burrito", price: 6.00, description: "Crispy bacon, scrambled eggs, cheddar, and potatoes. The weekend warrior\u2019s breakfast.", remaining: 6, total: 12, bakedAt: "10:58 AM" },
      { emoji: "\u{1F32F}", name: "Sausage Burrito", price: 6.00, description: "Savory sausage, eggs, pepper jack, and roasted peppers. Hearty and filling.", remaining: 8, total: 18, bakedAt: "10:31 AM" },
      { emoji: "\u{1F32F}", name: "Chorizo Burrito", price: 6.00, description: "Spicy chorizo, eggs, cotija cheese, and pico de gallo. A kick to start your day.", remaining: 8, total: 12, bakedAt: "1:14 PM" },
    ],
  },
];

const COMING_TOMORROW = ["Butternut Squash Soup is back tomorrow"];

/* ── Helpers ────────────────────────────────────────────── */

function getStockColor(remaining: number, total: number) {
  const pct = remaining / total;
  if (pct > 0.5) return "bg-emerald-400";
  if (pct > 0.25) return "bg-yellow-400";
  return "bg-red-400";
}

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
      close.setHours(15, 0, 0, 0); // 3 PM
      if (now.getDay() === 0) close.setHours(14, 0, 0, 0); // 2 PM Sunday
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

  const allItems = CATEGORIES.flatMap((c) => c.items);
  const available = allItems.filter((i) => !i.soldOut).length;
  const soldOut = allItems.filter((i) => i.soldOut).length;
  const totalRemaining = allItems.reduce((sum, i) => sum + i.remaining, 0);
  const isOpen = closingIn !== "Closed";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-reba-card border-b border-reba-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-2">
                Reba&apos;s Board
              </h1>
              <p className="text-reba-muted">
                {formatDate()} &mdash; Salinas Location
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${isOpen ? "text-emerald-600" : "text-red-500"}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
                {isOpen ? "Open Now" : "Closed"}
              </span>
              {isOpen && (
                <span className="text-xs text-reba-muted bg-white border border-reba-border rounded-full px-3 py-1">
                  Closes in {closingIn}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-reba-border rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-reba-pink">{available}</div>
              <div className="text-xs text-reba-muted mt-1">Items Available</div>
            </div>
            <div className="bg-white border border-reba-border rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-reba-pink">{soldOut}</div>
              <div className="text-xs text-reba-muted mt-1">Sold Out</div>
            </div>
            <div className="bg-white border border-reba-border rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-reba-pink">{totalRemaining}</div>
              <div className="text-xs text-reba-muted mt-1">Total Remaining</div>
            </div>
          </div>
        </div>
      </section>

      {/* Soup of the Day */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-reba-card border border-reba-pink/30 rounded-2xl p-6 flex items-center gap-4">
          <span className="text-4xl">{SOUP_OF_THE_DAY.emoji}</span>
          <div>
            <p className="text-xs text-reba-pink uppercase tracking-wider font-semibold mb-1">
              Michael&apos;s Soup of the Day
            </p>
            <h3 className="text-reba-cream font-bold text-lg">{SOUP_OF_THE_DAY.name}</h3>
            <p className="text-reba-muted text-sm">{SOUP_OF_THE_DAY.description}</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {CATEGORIES.map((category) => (
          <div key={category.name} className="mb-12 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream">
                {category.name}
              </h2>
              <div className="flex-1 h-px bg-reba-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className={`bg-white border rounded-xl p-5 ${
                    item.soldOut
                      ? "border-reba-border opacity-60"
                      : "border-reba-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <h3 className="text-reba-cream font-semibold">{item.name}</h3>
                    </div>
                    {item.soldOut ? (
                      <span className="text-xs text-red-500 font-semibold bg-red-50 px-2 py-1 rounded-full">
                        Sold Out
                      </span>
                    ) : (
                      <span className="text-reba-pink font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-reba-muted text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  {item.soldOut ? (
                    <p className="text-reba-pink text-xs italic">Gone! Back tomorrow.</p>
                  ) : (
                    <>
                      <div className="h-1.5 rounded-full bg-reba-border overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full ${getStockColor(item.remaining, item.total)}`}
                          style={{ width: `${(item.remaining / item.total) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-reba-muted">
                        <span>{item.remaining} remaining</span>
                        <span>Baked at {item.bakedAt}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Coming Tomorrow */}
      <section className="bg-reba-card border-t border-reba-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-6">
            Coming Tomorrow
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {COMING_TOMORROW.map((item) => (
              <span
                key={item}
                className="bg-white border border-reba-border rounded-full px-5 py-2.5 text-sm text-reba-muted"
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
