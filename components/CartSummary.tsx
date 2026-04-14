"use client";

import { useEffect, useRef } from "react";
import { useCart, formatPrice } from "@/lib/cart-context";

export default function CartSummary() {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const ref = useRef<HTMLDivElement>(null);
  const lastCount = useRef(totalItems);

  // Scroll into view when the cart grows (item added)
  useEffect(() => {
    if (totalItems > lastCount.current) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    lastCount.current = totalItems;
  }, [totalItems]);

  function handleSubmit() {
    const summary = cart
      .map((line) => `  • ${line.quantity} × ${line.product.name}`)
      .join("\n");
    alert(
      `Thank you! Your order has been received:\n\n${summary}\n\nTotal: ${formatPrice(totalPrice)}\n\nWe'll have it ready soon.`,
    );
    clearCart();
  }

  if (cart.length === 0) return null;

  return (
    <div
      ref={ref}
      className="mt-12 max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border-2 border-reba-pink/30 p-6 sm:p-8 relative"
    >
      <button
        onClick={clearCart}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-reba-border hover:border-reba-pink hover:bg-reba-pink/10 text-reba-cream hover:text-reba-pink transition-colors flex items-center justify-center shadow-sm"
        aria-label="Clear cart and start over"
        title="Clear cart and start over"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-baseline justify-between mb-4 pr-12">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-reba-cream">
          Your Order
        </h3>
        <span className="text-reba-muted text-sm">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
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

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-reba-border">
        <span className="text-reba-cream font-semibold text-lg">Total</span>
        <span className="text-reba-pink text-2xl font-semibold">
          {formatPrice(totalPrice)}
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 block w-full text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-colors"
      >
        Submit Order
      </button>
    </div>
  );
}
