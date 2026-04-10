"use client";

import { useState, useEffect, useRef } from "react";

const BOX_SIZES = [
  { count: 6, label: "Half Dozen", discount: 0 },
  { count: 12, label: "Full Dozen", discount: 5 },
  { count: 24, label: "Party Box", discount: 10 },
];

const ITEMS = [
  {
    id: "choc-chip",
    emoji: "\u{1F36A}",
    name: "Chocolate Chip Cookie",
    price: 3.5,
    description:
      "Classic homemade chocolate chip \u2014 crispy edges, chewy center, loaded with chips. Reba\u2019s signature.",
  },
  {
    id: "snickerdoodle",
    emoji: "\u{1F36A}",
    name: "Snickerdoodles",
    price: 3.5,
    description:
      "Soft cinnamon-sugar cookies with a crackled top. Warm spice, buttery dough, pure comfort.",
  },
  {
    id: "oatmeal",
    emoji: "\u{1F36A}",
    name: "Oatmeal Cranberry",
    price: 3.5,
    description:
      "Hearty oats with tart dried cranberries. A wholesome cookie that doesn\u2019t compromise on flavor.",
  },
  {
    id: "sandwich",
    emoji: "\u{1F36A}",
    name: "Sandwich Cookies",
    price: 4.0,
    description:
      "Two buttery cookies with a generous swirl of cream filling. Rotating flavors weekly.",
  },
  {
    id: "brownie",
    emoji: "\u{1F7EB}",
    name: "Triple Chocolate Brownies",
    price: 3.5,
    description:
      "Dense, fudgy, three kinds of chocolate. The brownie that ruins all other brownies for you.",
  },
  {
    id: "blondie",
    emoji: "\u{1F7E8}",
    name: "White Choc Butterscotch Blondies",
    price: 3.5,
    description:
      "Rich blondies studded with white chocolate chips and swirled with butterscotch. Dangerously good.",
  },
  {
    id: "lemon",
    emoji: "\u{1F34B}",
    name: "Lemon Brownies",
    price: 3.5,
    description:
      "Bright, tangy, and buttery \u2014 like a lemon bar and a brownie had a perfect child.",
  },
  {
    id: "coconut",
    emoji: "\u{1F965}",
    name: "Coconut Joy",
    price: 4.0,
    description:
      "Toasted coconut, dark chocolate, and almond in a chewy bar. Inspired by the candy bar, elevated by Reba.",
  },
];

export default function BoxBuilderPage() {
  const [selectedSize, setSelectedSize] = useState(1);
  const [box, setBox] = useState<{ id: string; name: string; emoji: string }[]>([]);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const maxItems = BOX_SIZES[selectedSize].count;
  const discount = BOX_SIZES[selectedSize].discount;
  const remaining = maxItems - box.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0) translateX(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    [headerRef.current, sizeRef.current, sidebarRef.current, ...itemRefs.current]
      .filter(Boolean)
      .forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, [mounted]);

  function addToBox(item: (typeof ITEMS)[number]) {
    if (box.length >= maxItems) return;
    setBox([...box, { id: item.id, name: item.name, emoji: item.emoji }]);
  }

  function removeFromBox(index: number) {
    setBox(box.filter((_, i) => i !== index));
  }

  function changeSize(index: number) {
    setSelectedSize(index);
    const newMax = BOX_SIZES[index].count;
    if (box.length > newMax) {
      setBox(box.slice(0, newMax));
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-reba-card border-b border-reba-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div
            ref={headerRef}
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-3">
              Build Your Cookie Box
            </h1>
            <p className="text-reba-muted max-w-lg mx-auto">
              Pick your favorites, fill the box, and we&apos;ll have it ready for pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items */}
          <div className="lg:col-span-2">
            {/* Size Picker */}
            <div
              ref={sizeRef}
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              <div className="flex gap-3 mb-6">
                {BOX_SIZES.map((size, i) => (
                  <button
                    key={size.count}
                    onClick={() => changeSize(i)}
                    className={`flex-1 rounded-xl border py-3 px-4 text-center transition-all ${
                      selectedSize === i
                        ? "border-reba-pink bg-reba-pink/5 text-reba-pink font-semibold"
                        : "border-reba-border bg-white text-reba-muted hover:border-reba-pink/30"
                    }`}
                  >
                    <div className="text-lg font-bold">{size.count}</div>
                    <div className="text-xs">{size.label}</div>
                    {size.discount > 0 && (
                      <div className="text-xs text-emerald-600 mt-0.5">
                        Save {size.discount}%
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  style={{
                    opacity: 0,
                    transform: "translateY(40px)",
                    transition: `opacity 0.6s ease ${0.15 + i * 0.05}s, transform 0.6s ease ${0.15 + i * 0.05}s`,
                  }}
                >
                  <button
                    onClick={() => addToBox(item)}
                    disabled={box.length >= maxItems}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      box.length >= maxItems
                        ? "border-reba-border bg-white opacity-50 cursor-not-allowed"
                        : "border-reba-border bg-white hover:border-reba-pink/30 hover:shadow-sm"
                    }`}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-reba-cream font-semibold text-sm">
                            {item.name}
                          </h3>
                          <span className="text-reba-pink font-medium text-sm">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-reba-muted text-xs mt-0.5 truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Box Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div
                ref={sidebarRef}
                style={{
                  opacity: 0,
                  transform: "translateX(-40px)",
                  transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
                }}
              >
                <div className="bg-white border border-reba-border rounded-2xl p-6 shadow-lg">
                  <h3 className="font-semibold text-reba-cream mb-4 flex items-center justify-between">
                    <span>Your Box</span>
                    <span className="text-sm text-reba-muted font-normal">
                      {box.length}/{maxItems}
                    </span>
                  </h3>

                  <div className="bg-reba-card border-2 border-dashed border-reba-border rounded-xl p-4 mb-4 min-h-[180px]">
                    {box.length === 0 ? (
                      <div className="flex items-center justify-center h-[160px] text-reba-muted text-sm">
                        Click items to fill your box
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {box.map((item, i) => (
                          <button
                            key={`${item.id}-${i}`}
                            onClick={() => removeFromBox(i)}
                            className="text-2xl hover:scale-110 transition-transform"
                            title={`Remove ${item.name}`}
                          >
                            {item.emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 rounded-full bg-reba-border overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full bg-reba-pink transition-all duration-300"
                      style={{ width: `${(box.length / maxItems) * 100}%` }}
                    />
                  </div>

                  {/* Summary */}
                  {box.length > 0 && discount > 0 && (
                    <div className="text-xs text-emerald-600 mb-3 text-center">
                      {discount}% discount applied!
                    </div>
                  )}

                  <div className="mt-4 space-y-2">
                    {box.length < maxItems ? (
                      <button
                        disabled
                        className="w-full bg-reba-border text-reba-muted py-3 rounded-full font-medium cursor-not-allowed"
                      >
                        Fill your box ({remaining} more)
                      </button>
                    ) : (
                      <button className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full font-medium transition-colors">
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
