"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import CartSummary from "@/components/CartSummary";

const dailyPicks = [
  {
    id: "soup-of-the-day",
    label: "Soup of the Day",
    emoji: "\u{1F963}",
    name: "Creamy Tomato Basil",
    description: "Roasted San Marzano tomatoes, fresh basil, a swirl of cream. Served with a warm house roll.",
    price: 8.50,
  },
  {
    id: "sandwich-of-the-day",
    label: "Sandwich of the Day",
    emoji: "\u{1F96A}",
    name: "Turkey & Swiss",
    description: "Sliced turkey, Swiss cheese, lettuce, tomato, and honey mustard on fresh sourdough.",
    price: 9.50,
  },
];

export default function HomeDailyPicks() {
  const { addToCart } = useCart();
  const [flashId, setFlashId] = useState<string | null>(null);

  function handleAdd(pick: typeof dailyPicks[number]) {
    addToCart({
      id: pick.id,
      name: `${pick.label}: ${pick.name}`,
      price: pick.price,
      emoji: pick.emoji,
    }, 1);
    setFlashId(pick.id);
    setTimeout(() => setFlashId(null), 400);
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-6">
        {dailyPicks.map((pick) => (
          <div
            key={pick.id}
            onClick={() => handleAdd(pick)}
            className={`cursor-pointer bg-white rounded-2xl shadow-md border-2 overflow-hidden transition-all ${flashId === pick.id ? "border-reba-pink shadow-lg scale-[1.02]" : "border-reba-pink/30 hover:border-reba-pink/40 hover:shadow-lg"}`}
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
                <span className="text-reba-pink font-semibold text-xl whitespace-nowrap">
                  ${pick.price.toFixed(2)}
                </span>
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
      <CartSummary />
    </>
  );
}
