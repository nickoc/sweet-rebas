"use client";

import { useState } from "react";
import { useCart, formatPrice } from "@/lib/cart-context";

export default function CartSummary() {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [confirmed, setConfirmed] = useState<{ items: typeof cart; total: number } | null>(null);

  function handleSubmit() {
    setConfirmed({ items: [...cart], total: totalPrice });
    clearCart();
    setExpanded(false);
  }

  if (confirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-reba-pink/30 p-8 sm:p-10 max-w-lg mx-4 text-center">
          <div className="text-5xl mb-4">{"\u{1F389}"}</div>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-2">
            Thank You!
          </h3>
          <p className="text-reba-muted text-lg mb-6">
            Your order has been received. We&apos;ll have it ready soon.
          </p>
          <ul className="text-left mb-6 divide-y divide-reba-border">
            {confirmed.items.map((line) => (
              <li key={line.product.id} className="flex justify-between py-3">
                <span className="text-reba-cream text-base">
                  {line.quantity} &times; {line.product.name}
                </span>
                <span className="text-reba-pink font-semibold text-base">
                  {formatPrice(line.product.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center border-t border-reba-border pt-4 mb-6">
            <span className="text-reba-cream font-semibold text-xl">Total</span>
            <span className="text-reba-pink font-semibold text-2xl">{formatPrice(confirmed.total)}</span>
          </div>
          <button
            onClick={() => setConfirmed(null)}
            className="bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Expanded cart detail */}
      {expanded && (
        <div className="max-w-2xl mx-auto mb-0 bg-white rounded-t-3xl shadow-2xl border-2 border-b-0 border-reba-pink/30 p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-reba-cream">
              Your Order
            </h3>
            <button
              onClick={clearCart}
              className="text-reba-muted hover:text-reba-pink text-sm transition-colors"
            >
              Clear All
            </button>
          </div>

          <ul className="divide-y divide-reba-border">
            {cart.map((line) => (
              <li key={line.product.id} className="flex items-center gap-4 py-3">
                {line.product.image ? (
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    className="w-14 h-14 rounded-lg object-cover border border-reba-border"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg border border-reba-border bg-reba-pink/5 flex items-center justify-center text-2xl">
                    {line.product.emoji ?? "🍴"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-reba-cream font-semibold text-base truncate">
                    {line.product.name}
                  </p>
                  <p className="text-reba-muted text-sm">
                    {line.quantity} × {formatPrice(line.product.price)}
                  </p>
                </div>
                <p className="text-reba-pink font-semibold text-base whitespace-nowrap">
                  {formatPrice(line.product.price * line.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(line.product.id)}
                  className="text-reba-muted hover:text-reba-pink transition-colors p-1"
                  aria-label={`Remove ${line.product.name}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubmit}
            className="mt-4 block w-full text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Submit Order
          </button>
        </div>
      )}

      {/* Sticky bottom bar — always visible when cart has items */}
      <div
        className="bg-reba-pink cursor-pointer shadow-[0_-6px_30px_rgba(0,0,0,0.15)]"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="max-w-2xl mx-auto px-8 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="bg-white text-reba-pink text-lg font-bold w-11 h-11 rounded-full flex items-center justify-center shadow-md">
              {totalItems}
            </span>
            <span className="text-white font-semibold text-xl sm:text-2xl">
              {expanded ? "Hide Order" : "Click to View Your Order"}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-white text-2xl sm:text-3xl font-semibold">
              {formatPrice(totalPrice)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearCart();
                setExpanded(false);
              }}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Clear cart and close"
              title="Clear cart and start over"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
