"use client";

import { useState } from "react";
import { useCart, CartProduct } from "@/lib/cart-context";

interface Props {
  product: CartProduct;
  size?: "sm" | "md";
  onAdded?: () => void;
}

export default function AddToCartButton({ product, size = "md", onAdded }: Props) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  function reset() {
    setOpen(false);
    setQty(1);
  }

  function handleAdd() {
    addToCart(product, qty);
    reset();
    onAdded?.();
  }

  // All sizes meet 48px minimum — Apple HIG 44pt + Material 48dp + WCAG AAA.
  // Inputs at text-base (16px) — iOS Safari auto-zoom prevented.
  const buttonClass =
    size === "sm" ? "min-h-12 px-6 py-3 text-base" : "min-h-12 px-8 py-3 text-base";
  const inputClass = "w-14 min-h-12 py-2 text-base";
  const stepBtn = "min-w-12 min-h-12 text-xl";

  if (!open) {
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className={`bg-reba-pink hover:bg-reba-pink-hover text-white rounded-full font-semibold transition-colors ${buttonClass}`}
        >
          + Add to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="border border-reba-pink/30 rounded-2xl p-3 bg-reba-pink/5">
      <p className="text-reba-ink text-xs font-medium mb-2 text-center">How many?</p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className={`rounded-full border border-reba-border bg-white text-reba-ink hover:border-reba-pink hover:text-reba-pink font-semibold transition-colors ${stepBtn}`}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setQty(Number.isFinite(v) && v >= 1 ? v : 1);
          }}
          className={`text-center bg-white border border-reba-border rounded-lg text-reba-ink font-semibold focus:outline-none focus:border-reba-pink ${inputClass}`}
        />
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className={`rounded-full border border-reba-border bg-white text-reba-ink hover:border-reba-pink hover:text-reba-pink font-semibold transition-colors ${stepBtn}`}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className={`bg-reba-pink hover:bg-reba-pink-hover text-white rounded-full font-semibold transition-colors w-full ${buttonClass}`}
      >
        Add {qty} to Cart
      </button>
      <button
        type="button"
        onClick={reset}
        className="text-reba-muted text-xs mt-2 hover:text-reba-pink transition-colors w-full text-center"
      >
        Cancel
      </button>
    </div>
  );
}
