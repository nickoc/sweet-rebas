"use client";

import { useState } from "react";
import { useCart, formatPrice } from "@/lib/cart-context";

export default function CartSummary() {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const [expanded, setExpanded] = useState(false);

  function handleSubmit() {
    const summary = cart
      .map((line) => `  • ${line.quantity} × ${line.product.name}`)
      .join("\n");
    alert(
      `Thank you! Your order has been received:\n\n${summary}\n\nTotal: ${formatPrice(totalPrice)}\n\nWe'll have it ready soon.`,
    );
    clearCart();
    setExpanded(false);
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
