"use client";

import { useState, useEffect, useRef } from "react";
import { menuItems } from "@/data/sample-data";
import CartSummary from "@/components/CartSummary";
import { useCart, slug } from "@/lib/cart-context";

const CATEGORIES = [
  { key: "cookies", label: "Cookies" },
  { key: "bars", label: "Bars" },
  { key: "breakfast", label: "Breakfast" },
  { key: "burritos", label: "Burritos" },
  { key: "sandwiches", label: "Sandwiches" },
  { key: "soup", label: "Soup" },
  { key: "pies", label: "Pies" },
];

const productImages: Record<string, string> = {
  "choc-chip-cookie": "/product-chocolate-chip.jpg",
  "snickerdoodles": "/product-snickerdoodles.jpg",
  "oatmeal-cranberry": "/product-oatmeal-cranberry.jpg",
  "sandwich-cookies": "/product-sandwich-cookies.jpg",
  "peanut-butter": "/product-peanut-butter.jpg",
  "ginger-cookie": "/product-ginger.jpg",
  "triple-choc-brownies": "/product-brownie.jpg",
  "butterscotch-blondies": "/product-blondie.jpg",
  "lemon-brownies": "/product-lemon-brownie.jpg",
  "coconut-joy": "/product-coconut-joy.jpg",
  "cinnamon-donut-muffins": "/product-cinnamon-donut-muffins.jpg",
  "coffee-cake-muffins": "/product-coffee-cake.jpg",
  "morning-muffins": "/product-morning-muffins.jpg",
  "loaf-slices": "/product-loaf-slices.jpg",
  "lemon-loaf": "/product-lemon-loaf.jpg",
  "classic-burrito": "/product-breakfast-burrito.jpg",
  "life-by-chocolate": "/product-life-by-chocolate.jpg",
  "carrot-cake": "/product-carrot-cake.jpg",
};

export default function BoxBuilderPage() {
  const [activeTab, setActiveTab] = useState("cookies");
  const [flashId, setFlashId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && headerRef.current) {
      headerRef.current.style.opacity = "1";
      headerRef.current.style.transform = "translateY(0)";
    }
  }, [mounted]);

  const filteredItems = menuItems.filter((item) => item.category === activeTab);

  function handleAdd(item: typeof menuItems[number]) {
    const image = productImages[item.id];
    addToCart({
      id: slug(item.name),
      name: item.name,
      price: item.price,
      image: image,
      emoji: item.emoji,
    }, 1);
    setFlashId(item.id);
    setTimeout(() => setFlashId(null), 400);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-reba-border" style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div
            ref={headerRef}
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl lg:text-8xl text-reba-pink mb-4">
              Build Your Order
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-reba-pink mb-2 tracking-wide">
              Pick your favorites from our full menu and we&apos;ll have it ready for pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`py-3 rounded-xl text-base font-bold transition-all ${
                activeTab === cat.key
                  ? "bg-reba-pink text-white shadow-md"
                  : "border-2 border-reba-pink/30 text-reba-pink hover:bg-reba-pink/10"
              }`}
              style={activeTab !== cat.key ? { backgroundColor: "#fff5f5" } : undefined}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const image = productImages[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleAdd(item)}
                className={`cursor-pointer rounded-xl border bg-white overflow-hidden flex transition-all ${flashId === item.id ? "border-reba-pink shadow-lg scale-[1.02]" : "border-reba-border hover:border-reba-pink/30"}`}
              >
                {image ? (
                  <div className="w-28 sm:w-36 flex-shrink-0">
                    <img src={image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-28 sm:w-36 flex-shrink-0 bg-[#fff5f5] flex items-center justify-center">
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                )}
                <div className="flex-1 p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-reba-cream font-semibold text-lg">{item.name}</h3>
                    <span className="text-reba-pink font-semibold text-lg">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-reba-muted text-base mt-1 line-clamp-2 mb-3">{item.description}</p>
                  <span className={`inline-block px-6 py-2 rounded-full font-semibold text-sm transition-colors ${flashId === item.id ? "bg-green-500 text-white" : "bg-reba-pink text-white"}`}>
                    {flashId === item.id ? "Added!" : "Tap to Add"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <CartSummary />
      </section>
    </div>
  );
}
