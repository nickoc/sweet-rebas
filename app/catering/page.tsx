"use client";

import { useState } from "react";
import Link from "next/link";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/lib/cart-context";

const highlights = [
  {
    emoji: "\u{1F36A}",
    title: "Cookie & Bar Platters",
    description: "An assortment of our signature cookies and bars, beautifully arranged for your event.",
    price: "from $36/dz",
    pricePerPerson: 36,
    unit: "dozen",
    href: "/menu",
    hasCounter: true,
  },
  {
    emoji: "\u{1F961}",
    title: "Breakfast Catering",
    description: "An assortment of our pastries, burritos, muffins, and coffee service for your morning meeting or event.",
    price: "from $8/person",
    pricePerPerson: 8,
    unit: "person",
    href: "/menu",
    hasCounter: true,
  },
  {
    emoji: "\u{1F382}",
    title: "Celebration Cakes",
    description: "An assortment of custom cakes for birthdays, showers, retirements, and every other reason to celebrate.",
    price: "from $40",
    pricePerPerson: 0,
    unit: "",
    href: "/cakes",
    hasCounter: false,
  },
];

const moreOptions = [
  { name: "Soup (Quarts)", desc: "An assortment of seasonal rotating flavors", price: "$12/quart", pricePerUnit: 12, unit: "quart", emoji: "\u{1F963}" },
  { name: "Sandwiches", desc: "An assortment, made fresh", price: "$6/person", pricePerUnit: 6, unit: "person", emoji: "\u{1F96A}" },
  { name: "Pies", desc: "An assortment of seasonal fruit and classic favorites", price: "$22/pie", pricePerUnit: 22, unit: "pie", emoji: "\u{1F967}" },
  { name: "Loaves", desc: "An assortment of banana, pumpkin, lemon, and more", price: "$22/loaf", pricePerUnit: 22, unit: "loaf", emoji: "\u{1F35E}", image: "/product-loaf-slices.jpg" },
];

function PeopleCounter({ count, pricePerUnit, unit, onIncrement, onDecrement }: { count: number; pricePerUnit: number; unit: string; onIncrement: () => void; onDecrement: () => void }) {
  const total = count * pricePerUnit;
  return (
    <div>
      <p className="text-reba-cream font-medium text-base mb-3">
        How many? <span className="text-reba-muted font-normal text-sm">(${pricePerUnit}/{unit})</span>
      </p>
      <div className="flex items-center justify-center gap-4 mb-2">
        <button
          onClick={onDecrement}
          className="w-10 h-10 rounded-full border-2 border-reba-pink/30 bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink font-semibold text-xl transition-colors"
        >
          &minus;
        </button>
        <span className="text-reba-cream font-bold text-2xl w-12 text-center">{count}</span>
        <button
          onClick={onIncrement}
          className="w-10 h-10 rounded-full border-2 border-reba-pink/30 bg-white text-reba-cream hover:border-reba-pink hover:text-reba-pink font-semibold text-xl transition-colors"
        >
          +
        </button>
      </div>
      {count > 0 && (
        <p className="text-reba-pink font-bold text-xl text-center mt-2">
          ${total.toFixed(2)}
        </p>
      )}
    </div>
  );
}

function CateringHighlights() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const { addToCart } = useCart();
  const [flashId, setFlashId] = useState<string | null>(null);

  function increment(title: string) {
    setCounts((prev) => ({ ...prev, [title]: (prev[title] || 0) + 1 }));
  }
  function decrement(title: string) {
    setCounts((prev) => ({ ...prev, [title]: Math.max(0, (prev[title] || 0) - 1) }));
  }
  function addCateringToCart(name: string, pricePerUnit: number, emoji: string, unit: string) {
    const count = counts[name] || 0;
    if (count === 0) return;
    const total = pricePerUnit * count;
    addToCart({
      id: name.toLowerCase().replace(/\s+/g, "-") + "-" + count,
      name: `${name} — ${count} ${unit}${count > 1 ? "s" : ""}`,
      price: total,
      emoji: emoji,
    }, 1);
    setFlashId(name);
    setTimeout(() => setFlashId(null), 400);
    setCounts((prev) => ({ ...prev, [name]: 0 }));
  }

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-10 text-center">
          Catering for Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => {
            const count = counts[item.title] || 0;
            return (
              <div
                key={item.title}
                className={`bg-white border-2 rounded-2xl p-8 text-center flex flex-col transition-all ${flashId === item.title ? "border-reba-pink shadow-lg scale-[1.02]" : "border-reba-pink/30"}`}
              >
                <div className="text-5xl mb-5">{item.emoji}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-3">
                  {item.title}
                </h3>
                <p className="text-reba-muted text-base sm:text-lg leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>
                <p className="text-reba-pink font-bold text-xl mb-5">{item.price}</p>
                {item.hasCounter ? (
                  <div>
                    <PeopleCounter count={count} pricePerUnit={item.pricePerPerson} unit={item.unit} onIncrement={() => increment(item.title)} onDecrement={() => decrement(item.title)} />
                    {count > 0 && (
                      <button
                        onClick={() => addCateringToCart(item.title, item.pricePerPerson, item.emoji, item.unit)}
                        className={`mt-4 inline-block py-3 px-8 rounded-full text-base font-semibold transition-colors ${flashId === item.title ? "bg-green-500 text-white" : "bg-reba-pink hover:bg-reba-pink-hover text-white"}`}
                      >
                        {flashId === item.title ? "Added!" : "Add to Order"}
                      </button>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full text-base font-semibold transition-colors"
                  >
                    Explore Custom Cakes
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* More Catering Options */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-8 text-center">
            More Catering Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {moreOptions.map((item) => {
              const count = counts[item.name] || 0;
              return (
                <div
                  key={item.name}
                  className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${flashId === item.name ? "border-reba-pink shadow-lg scale-[1.02]" : "border-reba-pink/30"}`}
                >
                  <div className="flex">
                    {item.image ? (
                      <div className="w-32 sm:w-40 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-32 sm:w-40 flex-shrink-0 bg-[#fff5f5] flex items-center justify-center">
                        <span className="text-6xl">{item.emoji}</span>
                      </div>
                    )}
                    <div className="flex-1 p-5">
                      <h4 className="text-reba-cream font-semibold text-xl mb-1">{item.name}</h4>
                      <p className="text-reba-muted text-base mb-2">{item.desc}</p>
                      <PeopleCounter count={count} pricePerUnit={item.pricePerUnit} unit={item.unit} onIncrement={() => increment(item.name)} onDecrement={() => decrement(item.name)} />
                      {count > 0 && (
                        <button
                          onClick={() => addCateringToCart(item.name, item.pricePerUnit, item.emoji, item.unit)}
                          className={`mt-4 inline-block py-2.5 px-6 rounded-full text-base font-semibold transition-colors ${flashId === item.name ? "bg-green-500 text-white" : "bg-reba-pink hover:bg-reba-pink-hover text-white"}`}
                        >
                          {flashId === item.name ? "Added!" : "Add to Order"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="pb-32">
        <CartSummary />
      </div>
    </>
  );
}

export default function CateringPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-6">
        <img src="/slideshow-snickerdoodles.jpg" alt="Fresh-baked snickerdoodle cookies" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.95)] via-[rgba(255,248,240,0.6)_45%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl lg:text-8xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Sweet Reba&apos;s Catering
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-reba-pink mb-2 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Feeding a Crowd?
          </p>
        </div>
      </section>

      {/* Good to Know */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h3 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-8 text-center">
          Good to Know
        </h3>
        <div className="space-y-6">
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed">
            <span className="text-reba-cream font-semibold">Delivery available</span> &mdash; We deliver within Monterey County for orders over $100. Pickup is always free at either location.
          </p>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed">
            <span className="text-reba-cream font-semibold">72-hour notice required</span> &mdash; Please place catering orders at least 3 days in advance so we can bake everything fresh.
          </p>
          <p className="text-reba-soft text-base sm:text-lg leading-relaxed">
            <span className="text-reba-cream font-semibold">Custom packages welcome</span> &mdash; Don&apos;t see exactly what you need? We love building custom menus. Tell us about your event and we&apos;ll put something together.
          </p>
        </div>
      </section>

      {/* Catering Highlights */}
      <CateringHighlights />

    </div>
  );
}
