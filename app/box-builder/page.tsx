"use client";

import { useState, useEffect, useRef } from "react";
import { menuItems } from "@/data/sample-data";

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

interface BoxItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export default function BoxBuilderPage() {
  const [activeTab, setActiveTab] = useState("cookies");
  const [box, setBox] = useState<BoxItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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

  function addToBox(item: typeof menuItems[number]) {
    setBox([...box, { id: item.id, name: item.name, emoji: item.emoji, price: item.price }]);
  }

  function removeFromBox(index: number) {
    setBox(box.filter((_, i) => i !== index));
  }

  const total = box.reduce((sum, item) => sum + item.price, 0);

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

      {/* Category Tabs — full width */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
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

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items */}
          <div className="lg:col-span-2">

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const image = productImages[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => addToBox(item)}
                    className="w-full text-left rounded-xl border border-reba-border bg-white hover:border-reba-pink/30 hover:shadow-sm transition-all overflow-hidden flex"
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
                      <p className="text-reba-muted text-base mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Order Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-6 shadow-lg">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-4 flex items-center justify-between">
                  <span>Your Order</span>
                  <span className="text-base text-reba-muted font-normal">
                    {box.length} {box.length === 1 ? "item" : "items"}
                  </span>
                </h3>

                <div className="bg-[#fff5f5] border-2 border-dashed border-reba-pink/20 rounded-xl p-4 mb-4 min-h-[180px] max-h-[320px] overflow-y-auto">
                  {box.length === 0 ? (
                    <div className="flex items-center justify-center h-[160px] text-reba-muted text-base">
                      Click items to add to your order
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {box.map((item, i) => (
                        <div key={`${item.id}-${i}`} className="flex items-center justify-between gap-2 text-base">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-lg">{item.emoji}</span>
                            <span className="text-reba-cream truncate">{item.name}</span>
                          </div>
                          <span className="text-reba-pink text-sm font-semibold">${item.price.toFixed(2)}</span>
                          <button
                            onClick={() => removeFromBox(i)}
                            className="text-reba-muted hover:text-red-500 text-base"
                            title="Remove"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Total */}
                {box.length > 0 && (
                  <div className="flex justify-between items-center mb-4 pt-2 border-t border-reba-border">
                    <span className="text-reba-cream font-semibold text-lg">Total</span>
                    <span className="text-reba-pink font-bold text-2xl">${total.toFixed(2)}</span>
                  </div>
                )}

                <div className="space-y-2">
                  {box.length === 0 ? (
                    <button
                      disabled
                      className="w-full bg-reba-border text-reba-muted py-3.5 rounded-full text-base font-medium cursor-not-allowed"
                    >
                      Add items to get started
                    </button>
                  ) : (
                    <button className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3.5 rounded-full text-base font-semibold transition-colors">
                      Complete Order ({box.length} items)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
