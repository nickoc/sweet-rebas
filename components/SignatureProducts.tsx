"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import CartSummary from "./CartSummary";
import { CartProduct, formatPrice } from "@/lib/cart-context";

const PRODUCTS: (CartProduct & { desc: string })[] = [
  { id: "chocolate-chip-cookie", name: "Chocolate Chip Cookie", price: 3.50, image: "/product-chocolate-chip.jpg", desc: "Classic homemade chocolate chip — crispy edges, chewy center, loaded with chips." },
  { id: "snickerdoodles", name: "Snickerdoodles", price: 3.50, image: "/product-snickerdoodles.jpg", desc: "Soft cinnamon-sugar cookies with a crackled top. Warm spice, buttery dough, pure comfort." },
  { id: "triple-chocolate-brownie", name: "Triple Chocolate Brownie", price: 3.50, image: "/product-brownie.jpg", desc: "Dense, fudgy, three kinds of chocolate. The brownie that ruins all other brownies for you." },
  { id: "breakfast-burrito", name: "Breakfast Burrito", price: 5.50, image: "/product-breakfast-burrito.jpg", desc: "Hearty, handmade, and stuffed with fresh ingredients. Served daily until 1 PM." },
];

export default function SignatureProducts() {
  const [selected, setSelected] = useState<(typeof PRODUCTS)[number] | null>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    if (selected) {
      document.body.style.overflow = "hidden";
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-reba-border rounded-2xl overflow-hidden hover:border-reba-pink/40 hover:shadow-lg transition-all flex flex-col"
          >
            <button
              onClick={() => setSelected(product)}
              className="aspect-[3/4] overflow-hidden cursor-zoom-in block"
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
            <div className="p-5 text-center flex flex-col flex-1">
              <h3 className="text-reba-cream font-semibold text-lg leading-tight mb-1">
                {product.name}
              </h3>
              <p className="text-reba-pink font-semibold text-base mb-3">
                {formatPrice(product.price)}
              </p>
              <p className="text-reba-muted text-base leading-relaxed mb-4 flex-1">
                {product.desc}
              </p>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/menu"
          className="inline-block bg-reba-pink hover:bg-reba-pink-hover text-white px-12 py-4 rounded-full text-2xl font-bold transition-colors shadow-lg"
        >
          View Full Menu &rarr;
        </Link>
      </div>

      <CartSummary />

      {/* Expanded product modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border border-reba-border rounded-full w-10 h-10 flex items-center justify-center text-reba-cream hover:text-reba-pink transition-colors shadow-md"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="aspect-square md:aspect-auto md:h-full overflow-hidden">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-2">
                {selected.name}
              </h2>
              <p className="text-reba-pink text-2xl font-semibold mb-4">
                {formatPrice(selected.price)}
              </p>
              <p className="text-reba-soft text-lg leading-relaxed mb-6 flex-1">
                {selected.desc}
              </p>
              <AddToCartButton product={selected} onAdded={() => setSelected(null)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
