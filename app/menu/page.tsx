"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { menuItems } from "@/data/sample-data";
import AddToCartButton from "@/components/AddToCartButton";
import CartSummary from "@/components/CartSummary";
import { slug, useCart } from "@/lib/cart-context";

function ImageZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border border-reba-border rounded-full w-10 h-10 flex items-center justify-center text-reba-cream hover:text-reba-pink transition-colors shadow-md" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <img src={src} alt={alt} className="w-full object-cover" />
        <div className="p-4 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream">{alt}</h3>
        </div>
      </div>
    </div>
  );
}

function QuickAddCard({ item, image, imagePositionClass, imageWidthClass, onImageClick }: { item: typeof menuItems[number]; image?: string; imagePositionClass?: string; imageWidthClass?: string; onImageClick?: (src: string, alt: string) => void }) {
  const widthClass = imageWidthClass ?? "w-40 sm:w-52";
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
      className="bg-white border rounded-xl overflow-hidden transition-all flex border-reba-border hover:border-reba-pink/30"
    >
      {image ? (
        <div className={`${widthClass} flex-shrink-0 cursor-zoom-in`} onClick={() => onImageClick?.(image, item.name)}>
          <img src={image} alt={item.name} className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${imagePositionClass ?? ""}`} />
        </div>
      ) : (
        <div className={`${widthClass} flex-shrink-0 bg-reba-card flex items-center justify-center`}>
          <span className="text-3xl">{item.emoji}</span>
        </div>
      )}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-reba-cream font-semibold text-xl">{item.name}</h3>
          <span className="text-reba-pink font-semibold text-xl whitespace-nowrap">
            {item.sizes ? `From $${Math.min(...item.sizes.map((s) => s.price)).toFixed(2)}` : `$${item.price.toFixed(2)}`}
          </span>
        </div>
        <p className="text-reba-muted text-[1.05rem] leading-relaxed mb-3 flex-1">{item.description}</p>
        {item.sizes && (
          <div className="border-t border-reba-border pt-3 space-y-1.5">
            {item.sizes.map((size) => (
              <div key={size.label} className="flex items-center justify-between text-base">
                <span className="text-reba-cream font-medium">{size.label}</span>
                <span className="text-reba-pink font-semibold">${size.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
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

function CakeOrderCards({ onImageClick }: { onImageClick?: (src: string, alt: string) => void }) {
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
            className="w-full h-[200px] object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
            onClick={() => onImageClick?.(cake.image, cake.name)}
          />
          <div className="p-5 text-center">
            <h3 className="text-reba-cream font-semibold text-xl mb-2">{cake.name}</h3>
            <button
              onClick={() => setSelectedCake(selectedCake === cake.name ? null : cake.name)}
              className="inline-block px-6 py-2 rounded-full font-semibold text-sm bg-gray-500 text-white/80 transition-colors"
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
  "Salads",
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
  "peanut-butter-brownie": "/product-peanut-butter-brownie.jpg",
  "peanut-butter-chocolate-chip-brownie": "/product-peanut-butter-chocolate-chip-brownie.jpg",
  "cinnamon-donut-muffins": "/product-cinnamon-donut-muffins.jpg",
  "coffee-cake": "/product-coffee-cake.jpg",
  "banana-pudding": "/product-banana-pudding.jpg",
  "banana-bread": "/product-banana-bread.jpg",
  "lemon-loaf": "/product-lemon-loaf.jpg",
  "morning-glory-muffins": "/product-morning-glory-muffins.jpg",
  "whole-loaves": "/product-whole-loaves.jpg",
  "classic-burrito": "/product-breakfast-burrito.jpg",
  "burrito-supreme": "/product-burrito-supreme.jpg",
  "albacore-tuna": "/product-albacore-tuna.jpg",
  "breakfast-sandwich": "/product-breakfast-sandwich.jpg",
  "italian-sub": "/product-italian-sub.jpg",
  "mediterranean-quinoa-salad": "/product-mediterranean-quinoa-salad.jpg",
  "potato-salad": "/product-potato-salad.jpg",
  "soup": "/about-soup.jpg",
  "dutch-apple-pie": "/product-dutch-apple-pie.jpg",
  "key-lime-pie": "/product-key-lime-pie.jpg",
  "lemon-meringue-pie": "/product-lemon-meringue-pie.jpg",
  "pecan-pie": "/product-pecan-pie.jpg",
};

const productImagePositions: Record<string, string> = {
  "banana-bread": "object-[68%_center]",
  "lemon-loaf": "object-[68%_center]",
  "coffee-cake": "object-[68%_center]",
  "morning-glory-muffins": "object-[68%_center]",
  "key-lime-pie": "object-[60%_center]",
  "lemon-meringue-pie": "object-[60%_center]",
};

const productImageWidths: Record<string, string> = {};

export default function MenuPage() {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

  function handleImageClick(src: string, alt: string) {
    setZoomImage({ src, alt });
  }

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
      <section className="relative min-h-[60vh] overflow-hidden">
        <img src="/slideshow-baked-goods.jpg" alt="Fresh baked goods from Sweet Reba's" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="relative min-h-[60vh]" />
      </section>
      <section className="py-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-7xl sm:text-9xl lg:text-[10rem] text-reba-pink mb-4">
          Our Menu
        </h1>
        <p className="text-3xl sm:text-4xl font-bold text-reba-pink mb-2 tracking-wide">
          Good Food, Great Prices, Made from Scratch
        </p>
      </section>

      {/* Flavor Quiz CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 flex justify-center">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-3 bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          <span className="text-2xl">{"\u{1F36A}"}</span>
          <span>Flavor Quiz &mdash; What should I try?</span>
        </Link>
      </section>

      {/* Menu Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((category) => {
          const items = grouped[category];
          if (!items || items.length === 0) return null;

          return (
            <div key={category} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-cream">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-reba-border" />
              </div>

              {categoryNotes[category] && (
                <p className="text-reba-pink text-xl sm:text-2xl font-bold mb-6 text-center">
                  {categoryNotes[category]}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => {
                  const image = productImages[item.id];
                  const imagePositionClass = productImagePositions[item.id];
                  const imageWidthClass = productImageWidths[item.id];
                  return (
                    <QuickAddCard
                      key={item.id}
                      item={item}
                      image={image}
                      imagePositionClass={imagePositionClass}
                      imageWidthClass={imageWidthClass}
                      onImageClick={handleImageClick}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        <CartSummary />
      </section>


      {/* Image Zoom Modal */}
      {zoomImage && <ImageZoomModal src={zoomImage.src} alt={zoomImage.alt} onClose={() => setZoomImage(null)} />}
    </div>
  );
}
