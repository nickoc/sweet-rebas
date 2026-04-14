"use client";

import { useState } from "react";
import Link from "next/link";
import { menuItems } from "@/data/sample-data";
import AddToCartButton from "@/components/AddToCartButton";
import CartSummary from "@/components/CartSummary";
import { slug, useCart } from "@/lib/cart-context";

function QuickAddCard({ item, image }: { item: typeof menuItems[number]; image?: string }) {
  const { addToCart } = useCart();
  const [flash, setFlash] = useState(false);

  function handleClick() {
    addToCart({
      id: slug(item.name),
      name: item.name,
      price: item.price,
      image: image,
      emoji: item.emoji,
    }, 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
  }

  return (
    <div
      onClick={handleClick}
      className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all flex ${flash ? "border-reba-pink shadow-lg scale-[1.02]" : "border-reba-border hover:border-reba-pink/30"}`}
    >
      {image ? (
        <div className="w-28 sm:w-36 flex-shrink-0">
          <img src={image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-28 sm:w-36 flex-shrink-0 bg-reba-card flex items-center justify-center">
          <span className="text-3xl">{item.emoji}</span>
        </div>
      )}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-reba-cream font-semibold text-xl">{item.name}</h3>
          <span className="text-reba-pink font-semibold text-xl whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-reba-muted text-[1.05rem] leading-relaxed mb-3 flex-1">{item.description}</p>
        <div className="mt-auto">
          <span className={`inline-block px-6 py-2 rounded-full font-semibold text-sm transition-colors ${flash ? "bg-green-500 text-white" : "bg-reba-pink text-white"}`}>
            {flash ? "Added!" : "Tap to Add"}
          </span>
        </div>
      </div>
    </div>
  );
}

const cakeProducts = [
  { name: "Life by Chocolate", image: "/product-life-by-chocolate.jpg" },
  { name: "Carrot Cake", image: "/product-carrot-cake.jpg" },
  { name: 'Chocolate 6" Cake', image: "/product-chocolate-whole-cake.jpg" },
];

const cakeSizes = [
  { label: '6" Round', serves: "~10-12 servings", price: 40 },
  { label: '8" Round', serves: "~15-20 servings", price: 55 },
  { label: '9" Round', serves: "~20-25 servings", price: 65 },
  { label: "1/4 Sheet", serves: "~30-35 servings", price: 45 },
  { label: "Cupcakes (dozen)", serves: "Per dozen", price: 36 },
];

function CakeOrderCards() {
  const { addToCart } = useCart();
  const [selectedCake, setSelectedCake] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);

  function handleSizeClick(cakeName: string, size: typeof cakeSizes[number]) {
    const id = slug(`${cakeName} ${size.label}`);
    addToCart({
      id,
      name: `${cakeName} — ${size.label}`,
      price: size.price,
      emoji: "\u{1F382}",
    }, 1);
    setFlashId(id);
    setTimeout(() => {
      setFlashId(null);
      setSelectedCake(null);
    }, 500);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      {cakeProducts.map((cake) => (
        <div key={cake.name} className="bg-white border-2 border-reba-pink/30 rounded-xl overflow-hidden">
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-[200px] object-cover cursor-pointer"
            onClick={() => setSelectedCake(selectedCake === cake.name ? null : cake.name)}
          />
          <div className="p-5 text-center">
            <h3 className="text-reba-cream font-semibold text-xl mb-2">{cake.name}</h3>
            <button
              onClick={() => setSelectedCake(selectedCake === cake.name ? null : cake.name)}
              className="inline-block px-6 py-2 rounded-full font-semibold text-sm bg-reba-pink text-white hover:bg-reba-pink-hover transition-colors"
            >
              {selectedCake === cake.name ? "Close" : "Choose Size & Order"}
            </button>
          </div>

          {selectedCake === cake.name && (
            <div className="border-t border-reba-border px-5 py-4 space-y-2">
              {cakeSizes.map((size) => {
                const id = slug(`${cake.name} ${size.label}`);
                return (
                  <button
                    key={size.label}
                    onClick={() => handleSizeClick(cake.name, size)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${flashId === id ? "border-reba-pink bg-green-50" : "border-reba-border hover:border-reba-pink/30"}`}
                  >
                    <div>
                      <span className="text-reba-cream font-semibold text-base">{size.label}</span>
                      <span className="text-reba-muted text-sm ml-2">{size.serves}</span>
                    </div>
                    <span className={`font-semibold text-base ${flashId === id ? "text-green-500" : "text-reba-pink"}`}>
                      {flashId === id ? "Added!" : `$${size.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const categories = [
  "Cookies",
  "Bars",
  "Breakfast",
  "Burritos",
  "Sandwiches",
  "Soup",
  "Pies",
];

const categoryNotes: Record<string, string> = {
  Pies: "7-day advance order required for all pies. Call to place your order.",
  Burritos: "Served daily until 1 PM or until sold out.",
};

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
};

export default function MenuPage() {
  const grouped = categories.reduce(
    (acc, cat) => {
      acc[cat] = menuItems.filter((item) => item.category === cat.toLowerCase());
      return acc;
    },
    {} as Record<string, typeof menuItems>
  );

  return (
    <div>
      {/* Hero Photo Banner */}
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-8">
        <img src="/slideshow-baked-goods.jpg" alt="Fresh baked goods from Sweet Reba's" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.95)] via-[rgba(255,248,240,0.6)_45%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl lg:text-8xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Our Menu
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-reba-pink mb-2 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Good Food, Great Prices, Made from Scratch
          </p>
        </div>
      </section>

      {/* Flavor Quiz & Chalkboard CTAs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-3 bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <span className="text-2xl">{"\u{1F36A}"}</span>
          <span>Flavor Quiz &mdash; What should I try?</span>
        </Link>
        <Link
          href="/chalkboard"
          className="inline-flex items-center gap-3 bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <span className="text-2xl">{"\u{1F4CB}"}</span>
          <span>Today&apos;s Chalkboard at Sweet Reba&apos;s</span>
        </Link>
      </section>

      {/* Menu Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((category) => {
          const items = grouped[category];
          if (!items || items.length === 0) return null;

          return (
            <div key={category} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-reba-border" />
              </div>

              {categoryNotes[category] && (
                <p className="text-reba-pink text-base mb-6 italic">
                  {categoryNotes[category]}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => {
                  const image = productImages[item.id];
                  return (
                    <QuickAddCard
                      key={item.id}
                      item={item}
                      image={image}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        <CartSummary />
      </section>

      {/* Cakes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream">
            Cakes
          </h2>
          <div className="flex-1 h-px bg-reba-border" />
        </div>
        <p className="text-reba-muted text-base mb-8">
          7-day advance notice for custom cakes &amp; pies. 72-hour notice for larger orders. Standard flavors may be available sooner &mdash; call to ask!
        </p>

        {/* Cake Products — click to choose size */}
        <CakeOrderCards />

        {/* Sizes & Pricing Reference */}
        <h3 className="font-semibold text-reba-cream text-2xl mb-6">Sizes &amp; Pricing</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {[
            { name: '6" Round', serves: "~10-12 servings", price: "$40" },
            { name: '8" Round', serves: "~15-20 servings", price: "$55" },
            { name: '9" Round', serves: "~20-25 servings", price: "$65" },
            { name: "1/4 Sheet", serves: "~30-35 servings", price: "$45" },
            { name: "Cupcakes", serves: "Per dozen", price: "$36/dz" },
          ].map((size) => (
            <div key={size.name} className="bg-white border border-reba-pink/30 rounded-xl p-4 text-center">
              <h4 className="text-reba-cream font-semibold text-lg">{size.name}</h4>
              <p className="text-reba-muted text-base mb-1">{size.serves}</p>
              <p className="text-reba-pink font-bold text-xl">{size.price}</p>
            </div>
          ))}
        </div>

        {/* Flavor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
            <h4 className="text-reba-pink font-semibold text-lg mb-2">
              Standard Flavors <span className="font-normal text-base text-reba-muted">(always available)</span>
            </h4>
            <p className="text-reba-soft text-[1.1rem] leading-relaxed">
              Classic Vanilla<br />Carrot<br />Life by Chocolate
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
            <h4 className="text-reba-pink font-semibold text-lg mb-2">
              Specialty Flavors <span className="font-normal text-base text-reba-muted">(7-day notice)</span>
            </h4>
            <p className="text-reba-soft text-[1.1rem] leading-relaxed">
              Raspberry Lemonade<br />Blackberry Lavender Lemon<br />Razzelberry<br />Lemon<br />Red Velvet<br />Cookies &amp; Cream<br />Chocolate Peanut Butter
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
            <h4 className="text-reba-pink font-semibold text-lg mb-2">Wedding Cakes</h4>
            <p className="text-reba-soft text-[1.1rem] leading-relaxed mb-4">
              Custom consultation required.<br />Multi-tier designs.<br />Tasting sessions available.
            </p>
            <a href="tel:8316014818" className="text-reba-pink font-semibold text-base hover:text-reba-pink-hover transition-colors">
              Schedule a tasting &rarr;
            </a>
          </div>
        </div>

        {/* Order CTA */}
        <div className="text-center">
          <Link
            href="/cakes"
            className="bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Order Your Custom Cake
          </Link>
        </div>
      </section>
    </div>
  );
}
