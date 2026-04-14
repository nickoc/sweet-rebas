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

  const buttonClass =
    size === "sm"
      ? "px-3 py-1.5 text-xs"
      : "px-4 py-2 text-sm";
  const inputClass =
    size === "sm" ? "w-12 py-1 text-sm" : "w-14 py-1.5 text-base";
  const stepBtn =
    size === "sm" ? "w-7 h-7 text-base" : "w-9 h-9 text-lg";

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className={`bg-reba-pink hover:bg-reba-pink-hover text-white rounded-full font-semibold transition-colors w-full ${buttonClass}`}
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="border border-reba-pink/30 rounded-2xl p-3 bg-reba-pink/5">
      <p className="text-reba-cream text-xs font-medium mb-2 text-center">How many?</p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className={`rounded-full border border-reba-border bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink font-semibold transition-colors ${stepBtn}`}
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
          className={`text-center bg-white border border-reba-border rounded-lg text-reba-cream font-semibold focus:outline-none focus:border-reba-pink ${inputClass}`}
        />
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          className={`rounded-full border border-reba-border bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink font-semibold transition-colors ${stepBtn}`}
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
