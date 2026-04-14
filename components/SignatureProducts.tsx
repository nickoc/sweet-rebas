"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Product {
  name: string;
  price: number;
  image: string;
  desc: string;
}

interface CartLine {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  { name: "Chocolate Chip Cookie", price: 3.50, image: "/product-chocolate-chip.jpg", desc: "Classic homemade chocolate chip — crispy edges, chewy center, loaded with chips." },
  { name: "Snickerdoodles", price: 3.50, image: "/product-snickerdoodles.jpg", desc: "Soft cinnamon-sugar cookies with a crackled top. Warm spice, buttery dough, pure comfort." },
  { name: "Triple Chocolate Brownie", price: 3.50, image: "/product-brownie.jpg", desc: "Dense, fudgy, three kinds of chocolate. The brownie that ruins all other brownies for you." },
  { name: "Breakfast Burrito", price: 5.50, image: "/product-breakfast-burrito.jpg", desc: "Hearty, handmade, and stuffed with fresh ingredients. Served daily until 1 PM." },
];

function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function SignatureProducts() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [pickerFor, setPickerFor] = useState<string | null>(null);
  const [pickerQty, setPickerQty] = useState(1);
  const [modalQty, setModalQty] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);

  function openPicker(name: string) {
    setPickerFor(name);
    setPickerQty(1);
  }

  function openModal(p: Product) {
    setSelected(p);
    setModalQty(1);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelected(null);
        setPickerFor(null);
      }
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

  function addToCart(product: Product, quantity: number) {
    setCart((prev) => {
      const existing = prev.find((line) => line.product.name === product.name);
      if (existing) {
        return prev.map((line) =>
          line.product.name === product.name
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [...prev, { product, quantity }];
    });
    setPickerFor(null);
    setSelected(null);
    // Scroll the cart panel into view so the customer sees their order
    setTimeout(() => {
      cartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  function removeFromCart(productName: string) {
    setCart((prev) => prev.filter((line) => line.product.name !== productName));
  }

  function clearCart() {
    setCart([]);
  }

  const cartTotal = cart.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {PRODUCTS.map((product) => {
          const isPickerOpen = pickerFor === product.name;
          return (
            <div
              key={product.name}
              className="group bg-white border border-reba-border rounded-2xl overflow-hidden hover:border-reba-pink/40 hover:shadow-lg transition-all flex flex-col"
            >
              <button
                onClick={() => openModal(product)}
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
                <p className="text-reba-muted text-sm leading-relaxed mb-4 flex-1">
                  {product.desc}
                </p>

                {!isPickerOpen ? (
                  <button
                    onClick={() => openPicker(product.name)}
                    className="bg-reba-pink hover:bg-reba-pink-hover text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors w-full"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="border border-reba-pink/30 rounded-2xl p-3 bg-reba-pink/5">
                    <p className="text-reba-cream text-xs font-medium mb-2">
                      How many?
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setPickerQty((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 rounded-full border border-reba-border bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink text-lg font-semibold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={pickerQty}
                        onChange={(e) => {
                          const v = parseInt(e.target.value, 10);
                          setPickerQty(Number.isFinite(v) && v >= 1 ? v : 1);
                        }}
                        className="w-14 text-center bg-white border border-reba-border rounded-lg py-1.5 text-reba-cream font-semibold focus:outline-none focus:border-reba-pink"
                      />
                      <button
                        type="button"
                        onClick={() => setPickerQty((q) => q + 1)}
                        className="w-9 h-9 rounded-full border border-reba-border bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink text-lg font-semibold transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => addToCart(product, pickerQty)}
                      className="bg-reba-pink hover:bg-reba-pink-hover text-white py-2 rounded-full text-sm font-semibold transition-colors w-full"
                    >
                      Add {pickerQty} to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => setPickerFor(null)}
                      className="text-reba-muted text-xs mt-2 hover:text-reba-pink transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/menu"
          className="text-reba-pink hover:text-reba-pink-hover transition-colors font-medium"
        >
          View Full Menu &rarr;
        </Link>
      </div>

      {/* Your Order — running summary */}
      {cart.length > 0 && (
        <div
          ref={cartRef}
          className="mt-12 max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border-2 border-reba-pink/30 p-6 sm:p-8 relative"
        >
          {/* Clear/close-all button */}
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
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
          <ul className="divide-y divide-reba-border">
            {cart.map((line) => (
              <li key={line.product.name} className="flex items-center gap-4 py-3">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="w-14 h-14 rounded-lg object-cover border border-reba-border"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-reba-cream font-semibold text-sm truncate">
                    {line.product.name}
                  </p>
                  <p className="text-reba-muted text-xs">
                    {line.quantity} × {formatPrice(line.product.price)}
                  </p>
                </div>
                <p className="text-reba-pink font-semibold text-sm whitespace-nowrap">
                  {formatPrice(line.product.price * line.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(line.product.name)}
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
            <span className="text-reba-cream font-semibold">Total</span>
            <span className="text-reba-pink text-2xl font-semibold">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <Link
            href="/box-builder"
            className="mt-4 block text-center bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Continue to Checkout
          </Link>
        </div>
      )}

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
              <p className="text-reba-soft leading-relaxed mb-6 flex-1">
                {selected.desc}
              </p>

              <p className="text-reba-cream text-sm font-medium mb-2">
                How many would you like?
              </p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 rounded-full border border-reba-border bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink text-xl font-semibold transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={modalQty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setModalQty(Number.isFinite(v) && v >= 1 ? v : 1);
                  }}
                  className="w-20 text-center bg-white border border-reba-border rounded-lg py-2 text-reba-cream text-lg font-semibold focus:outline-none focus:border-reba-pink"
                />
                <button
                  type="button"
                  onClick={() => setModalQty((q) => q + 1)}
                  className="w-11 h-11 rounded-full border border-reba-border bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink text-xl font-semibold transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart(selected, modalQty)}
                className="bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full text-base font-semibold transition-colors w-full"
              >
                Add {modalQty} to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
