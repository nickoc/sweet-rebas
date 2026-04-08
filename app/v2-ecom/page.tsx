"use client";

import Link from "next/link";
import { menuItems, reviews } from "@/data/sample-data";
import type { MenuItem, Review } from "@/data/sample-data";

/* ------------------------------------------------------------------ */
/*  V2 E-COM — "Cool E-Commerce Brand" variant                        */
/*  Milk Bar-inspired DTC bakery homepage                              */
/*  Self-contained: own nav, footer, palette (no globals mutation)     */
/* ------------------------------------------------------------------ */

// ── Palette & design tokens (inline, no globals.css changes) ──────
const C = {
  black: "#0a0a0a",
  white: "#fafafa",
  pink: "#e4207b",
  pinkHover: "#f72d8e",
  pinkMuted: "rgba(228,32,123,0.12)",
  pinkGlow: "rgba(228,32,123,0.35)",
  gray100: "#f5f5f5",
  gray200: "#e5e5e5",
  gray400: "#a3a3a3",
  gray500: "#737373",
  gray700: "#404040",
  gray900: "#171717",
  star: "#facc15",
};

// ── Helpers ───────────────────────────────────────────────────────
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < Math.round(rating) ? C.star : C.gray200}
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.69l5.34-.78L10 1z" />
        </svg>
      ))}
    </span>
  );
}

function formatPrice(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

// ── Product Card ──────────────────────────────────────────────────
function ProductCard({ item }: { item: MenuItem }) {
  return (
    <div
      className="group flex-shrink-0 w-[220px] sm:w-[260px] snap-start"
      style={{ fontFamily: "var(--font-ecom-body)" }}
    >
      {/* Image placeholder */}
      <div
        className="relative rounded-2xl overflow-hidden mb-3 flex items-center justify-center"
        style={{
          background: C.gray100,
          height: 260,
          transition: "transform 0.3s ease",
        }}
      >
        <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300">
          {item.emoji}
        </span>
        {item.popular && (
          <span
            className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: C.pink, color: C.white }}
          >
            Bestseller
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold leading-tight" style={{ color: C.black }}>
            {item.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Stars rating={4.8} size={12} />
            <span className="text-xs" style={{ color: C.gray500 }}>
              4.8
            </span>
          </div>
        </div>
        <span className="text-sm font-bold whitespace-nowrap" style={{ color: C.black }}>
          {formatPrice(item.price)}
        </span>
      </div>
    </div>
  );
}

// ── Product Card (Grid variant — larger) ──────────────────────────
function ProductGridCard({ item }: { item: MenuItem }) {
  return (
    <div className="group" style={{ fontFamily: "var(--font-ecom-body)" }}>
      <div
        className="relative rounded-2xl overflow-hidden mb-3 flex items-center justify-center"
        style={{ background: C.gray100, height: 220 }}
      >
        <span className="text-5xl select-none group-hover:scale-110 transition-transform duration-300">
          {item.emoji}
        </span>
        {item.popular && (
          <span
            className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: C.pink, color: C.white }}
          >
            Bestseller
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold" style={{ color: C.black }}>
        {item.name}
      </h3>
      <p className="text-xs mt-1 line-clamp-2" style={{ color: C.gray500 }}>
        {item.description}
      </p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5">
          <Stars rating={4.8} size={12} />
          <span className="text-xs" style={{ color: C.gray500 }}>
            (48)
          </span>
        </div>
        <span className="text-sm font-bold" style={{ color: C.black }}>
          {formatPrice(item.price)}
        </span>
      </div>
    </div>
  );
}

// ── Occasion Card ─────────────────────────────────────────────────
function OccasionCard({
  emoji,
  title,
  subtitle,
  bg,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  bg: string;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-end min-h-[220px] cursor-pointer group"
      style={{ background: bg }}
    >
      <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {emoji}
      </span>
      <h3 className="text-xl font-bold" style={{ color: C.black, fontFamily: "var(--font-ecom-heading)" }}>
        {title}
      </h3>
      <p className="text-sm mt-1" style={{ color: C.gray700 }}>
        {subtitle}
      </p>
      <span
        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider mt-3"
        style={{ color: C.pink }}
      >
        Shop now
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────
function TestimonialCard({ review }: { review: Review }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{
        background: C.white,
        border: `1px solid ${C.gray200}`,
        fontFamily: "var(--font-ecom-body)",
      }}
    >
      <Stars rating={review.rating} size={16} />
      <p className="text-sm leading-relaxed" style={{ color: C.gray700 }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-2 mt-auto pt-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: C.pinkMuted, color: C.pink }}
        >
          {review.author.charAt(0)}
        </div>
        <div>
          <span className="text-sm font-semibold" style={{ color: C.black }}>
            {review.author}
          </span>
          <span className="text-xs ml-2" style={{ color: C.gray400 }}>
            via {review.platform}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Category groups for product rails ─────────────────────────────
const sweets = menuItems.filter((i) => i.category === "cookies" || i.category === "bars");
const morningFuel = menuItems.filter(
  (i) => i.category === "burritos" || i.category === "breakfast"
);
const celebrations = menuItems.filter((i) => i.category === "pies");
const bestsellers = menuItems.filter((i) => i.popular);

// ══════════════════════════════════════════════════════════════════
//  PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════

export default function V2EcomPage() {
  return (
    <>
      {/* ── Scoped styles + fonts ──────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        :root {
          --font-ecom-heading: 'Space Grotesk', system-ui, sans-serif;
          --font-ecom-body: 'DM Sans', system-ui, sans-serif;
        }
        .ecom-page {
          font-family: var(--font-ecom-body);
          color: ${C.black};
          background: ${C.white};
          /* Override the root layout dark theme */
        }
        .ecom-page * { box-sizing: border-box; }
        .ecom-page ::selection {
          background: ${C.pinkMuted};
          color: ${C.black};
        }
        .scroll-rail {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 0.5rem;
          scrollbar-width: none;
        }
        .scroll-rail::-webkit-scrollbar { display: none; }
        .ecom-btn-black {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2rem;
          background: ${C.black};
          color: ${C.white};
          font-family: var(--font-ecom-heading);
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ecom-btn-black:hover {
          background: ${C.pink};
          transform: translateY(-1px);
          box-shadow: 0 4px 20px ${C.pinkGlow};
        }
        .ecom-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.75rem;
          background: transparent;
          color: ${C.black};
          font-family: var(--font-ecom-heading);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border: 2px solid ${C.black};
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ecom-btn-outline:hover {
          background: ${C.black};
          color: ${C.white};
        }
        .ecom-btn-pink {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2rem;
          background: ${C.pink};
          color: ${C.white};
          font-family: var(--font-ecom-heading);
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ecom-btn-pink:hover {
          background: ${C.pinkHover};
          transform: translateY(-1px);
          box-shadow: 0 4px 20px ${C.pinkGlow};
        }
        .pink-box-pattern {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(228,32,123,0.04) 20px,
            rgba(228,32,123,0.04) 40px
          );
        }
      `}</style>

      <div className="ecom-page">
        {/* ── Announcement Bar ───────────────────────────────────── */}
        <div
          className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-widest"
          style={{
            background: C.pink,
            color: C.white,
            fontFamily: "var(--font-ecom-heading)",
          }}
        >
          Now Open: Old Town Salinas&ensp;|&ensp;Order for Pickup
        </div>

        {/* ── Navigation ─────────────────────────────────────────── */}
        <nav
          className="sticky top-0 z-50 w-full border-b"
          style={{
            background: `${C.white}ee`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderColor: C.gray200,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/v2-ecom" className="flex items-center gap-2 no-underline">
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
              >
                Sweet Reba&apos;s
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                style={{ background: C.pinkMuted, color: C.pink }}
              >
                Bakery
              </span>
            </Link>

            {/* Desktop nav links */}
            <div
              className="hidden md:flex items-center gap-8 text-sm font-medium"
              style={{ color: C.gray700, fontFamily: "var(--font-ecom-body)" }}
            >
              {["Sweets", "Morning Fuel", "Celebrations", "Gift Boxes", "Catering"].map(
                (label) => (
                  <a
                    key={label}
                    href="#"
                    className="hover:opacity-70 transition-opacity no-underline"
                    style={{ color: C.gray700 }}
                  >
                    {label}
                  </a>
                )
              )}
            </div>

            {/* Cart icon */}
            <div className="flex items-center gap-4">
              <button
                className="relative p-2"
                style={{ color: C.black }}
                aria-label="Cart"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: C.pink, color: C.white }}
                >
                  0
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* ── Hero: Split Panel ──────────────────────────────────── */}
        <section className="w-full" style={{ background: C.gray100 }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 min-h-[520px]">
            {/* Left: Image placeholder (60%) */}
            <div
              className="lg:col-span-3 relative flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)`,
                minHeight: 360,
              }}
            >
              <div className="text-center">
                <span className="text-[120px] sm:text-[160px] leading-none select-none block">
                  🍪
                </span>
                <p
                  className="text-xs uppercase tracking-widest mt-4 font-semibold"
                  style={{ color: C.pink, fontFamily: "var(--font-ecom-heading)" }}
                >
                  Featured: Spring Collection
                </p>
              </div>
              {/* Pink box corner accent */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24"
                style={{
                  background: C.pink,
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />
            </div>

            {/* Right: Text block (40%) */}
            <div className="lg:col-span-2 flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-12 lg:py-0">
              <div className="flex items-center gap-2 mb-4">
                <Stars rating={4.8} size={16} />
                <span
                  className="text-sm font-medium"
                  style={{ color: C.gray500 }}
                >
                  4.8 stars&ensp;/&ensp;200+ reviews
                </span>
              </div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: C.pink, fontFamily: "var(--font-ecom-heading)" }}
              >
                Since 2004&ensp;/&ensp;As seen on Food Network
              </p>
              <h1
                className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
                style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
              >
                The cookie that
                <br />
                starts{" "}
                <span style={{ color: C.pink }}>arguments.</span>
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: C.gray700 }}>
                Crispy edges. Gooey center. Real butter. No shortcuts.
                Baked fresh every single morning on the Monterey Peninsula
                since Reba first turned on the oven 22 years ago.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="ecom-btn-black">Order Now</button>
                <button className="ecom-btn-outline">View Menu</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── "From Our Kitchen to You" — Horizontal Product Rail ── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: C.pink, fontFamily: "var(--font-ecom-heading)" }}
                >
                  Fresh today
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
                >
                  From Our Kitchen to You
                </h2>
              </div>
              <a
                href="#"
                className="hidden sm:inline-flex text-sm font-semibold no-underline"
                style={{ color: C.pink }}
              >
                View all &rarr;
              </a>
            </div>
            <div className="scroll-rail">
              {menuItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Occasion-Based Categories ────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 pink-box-pattern">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
              >
                Shop by Occasion
              </h2>
              <p className="text-sm" style={{ color: C.gray500 }}>
                Whether you need breakfast, a sugar fix, or a showstopper
                &mdash; we have it covered.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <OccasionCard
                emoji="🌯"
                title="Morning Fuel"
                subtitle="Burritos, scones, muffins &mdash; fuel up before the day steals your energy."
                bg="linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)"
              />
              <OccasionCard
                emoji="🍪"
                title="Sweet Tooth"
                subtitle="Cookies, brownies, bars. The good stuff. No explanation needed."
                bg="linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)"
              />
              <OccasionCard
                emoji="🥧"
                title="Celebrations"
                subtitle="Pies and cakes for the moments that matter. 48-hour notice, please."
                bg="linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)"
              />
              <OccasionCard
                emoji="🎁"
                title="Catering"
                subtitle="Feed the office, the party, the whole neighborhood. We scale."
                bg="linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
              />
            </div>
          </div>
        </section>

        {/* ── "Why Sweet Reba's?" Brand Story ──────────────────────── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo placeholder */}
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center relative"
              style={{ background: C.gray100, minHeight: 400 }}
            >
              <span className="text-8xl select-none">
                👩‍🍳
              </span>
              {/* Pink box accent */}
              <div
                className="absolute top-4 right-4 w-16 h-16 rounded-xl"
                style={{ background: C.pink, opacity: 0.9 }}
              />
              <div
                className="absolute bottom-4 left-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: C.black,
                  color: C.white,
                  fontFamily: "var(--font-ecom-heading)",
                }}
              >
                Est. 2004
              </div>
            </div>

            {/* Story text */}
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: C.pink, fontFamily: "var(--font-ecom-heading)" }}
              >
                Our story
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
              >
                22 years of &ldquo;one more
                <br />
                cookie, please.&rdquo;
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed"
                style={{ color: C.gray700 }}
              >
                <p>
                  Sweet Reba&apos;s started in 2004 with one oven, one recipe book, and
                  a stubborn belief that small-town bakeries can compete with anyone
                  if they refuse to take shortcuts.
                </p>
                <p>
                  Two decades later, we&apos;re still baking everything from scratch
                  every morning. Same real butter. Same local eggs. Same grandmother&apos;s
                  pie crust recipe. Featured on Food Network&apos;s Cake Wars, but
                  honestly? Our regulars already knew.
                </p>
                <p>
                  Two locations on the Monterey Peninsula. Zero preservatives.
                  No frozen dough. No excuses.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 mt-8">
                {[
                  { value: "22+", label: "Years baking" },
                  { value: "200+", label: "5-star reviews" },
                  { value: "2", label: "Locations" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-3xl font-bold"
                      style={{
                        fontFamily: "var(--font-ecom-heading)",
                        color: C.pink,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider mt-1" style={{ color: C.gray500 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bestsellers Grid ─────────────────────────────────────── */}
        <section
          className="py-16 sm:py-20 px-4 sm:px-6"
          style={{ background: C.gray100 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: C.pink, fontFamily: "var(--font-ecom-heading)" }}
              >
                Fan favorites
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
              >
                The Ones That Sell Out First
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {bestsellers.map((item) => (
                <ProductGridCard key={item.id} item={item} />
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="ecom-btn-black">Shop All Products</button>
            </div>
          </div>
        </section>

        {/* ── Morning Fuel Rail ─────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: C.pink, fontFamily: "var(--font-ecom-heading)" }}
                >
                  Before noon
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
                >
                  Morning Fuel
                </h2>
              </div>
              <a
                href="#"
                className="hidden sm:inline-flex text-sm font-semibold no-underline"
                style={{ color: C.pink }}
              >
                View all &rarr;
              </a>
            </div>
            <div className="scroll-rail">
              {morningFuel.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Customer Testimonials ────────────────────────────────── */}
        <section
          className="py-16 sm:py-20 px-4 sm:px-6"
          style={{ background: C.gray100 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: C.pink, fontFamily: "var(--font-ecom-heading)" }}
              >
                Real people, real opinions
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
              >
                Don&apos;t Take Our Word for It
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Stars rating={4.8} size={18} />
                <span className="text-sm font-medium" style={{ color: C.gray500 }}>
                  4.8 average from 200+ reviews
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {reviews.slice(0, 3).map((review) => (
                <TestimonialCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>

        {/* ── "The Pink Box" — Brand Moment ────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div
            className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative"
            style={{ background: C.pink }}
          >
            <div className="px-8 sm:px-14 py-14 sm:py-20 text-center relative z-10">
              <span className="text-6xl sm:text-7xl block mb-6">📦</span>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-ecom-heading)",
                  color: C.white,
                }}
              >
                The Pink Box
              </h2>
              <p
                className="text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                When you see the pink box, you know something good is inside.
                Custom gift boxes for any occasion &mdash; birthdays, holidays,
                or &ldquo;I just really need a brownie&rdquo; emergencies.
              </p>
              <button
                className="ecom-btn-black"
                style={{ background: C.white, color: C.pink }}
              >
                Build a Gift Box
              </button>
            </div>
            {/* Decorative diagonal stripes */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.3) 30px, rgba(255,255,255,0.3) 60px)",
              }}
            />
          </div>
        </section>

        {/* ── "Stay Sweet" Email Capture ────────────────────────────── */}
        <section
          className="py-16 sm:py-20 px-4 sm:px-6"
          style={{ background: C.gray100 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-4xl block mb-4">🎂</span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-ecom-heading)", color: C.black }}
            >
              Stay Sweet
            </h2>
            <p className="text-base mb-8" style={{ color: C.gray500 }}>
              Join the list. Get first dibs on seasonal drops, secret menu items,
              and a free treat on your birthday.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full text-sm outline-none"
                style={{
                  border: `2px solid ${C.gray200}`,
                  background: C.white,
                  color: C.black,
                  fontFamily: "var(--font-ecom-body)",
                }}
              />
              <button className="ecom-btn-pink" type="submit">
                Subscribe
              </button>
            </form>
            <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
              <label
                className="text-xs font-medium"
                style={{ color: C.gray500 }}
              >
                Birthday (for a free treat!)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM"
                  maxLength={2}
                  className="w-12 text-center px-2 py-2 rounded-lg text-sm outline-none"
                  style={{
                    border: `2px solid ${C.gray200}`,
                    background: C.white,
                    color: C.black,
                    fontFamily: "var(--font-ecom-body)",
                  }}
                />
                <span style={{ color: C.gray400, lineHeight: "2.5rem" }}>/</span>
                <input
                  type="text"
                  placeholder="DD"
                  maxLength={2}
                  className="w-12 text-center px-2 py-2 rounded-lg text-sm outline-none"
                  style={{
                    border: `2px solid ${C.gray200}`,
                    background: C.white,
                    color: C.black,
                    fontFamily: "var(--font-ecom-body)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <footer style={{ background: C.black, color: C.white }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Brand */}
              <div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-ecom-heading)" }}
                >
                  Sweet Reba&apos;s
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.gray400 }}>
                  Handmade cookies, bars, breakfast burritos, pies & cakes.
                  Baked from scratch every morning on the Monterey Peninsula since 2004.
                </p>
                <div className="flex gap-3 mt-4">
                  {["IG", "FB", "YT"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold no-underline transition-colors"
                      style={{
                        background: C.gray900,
                        color: C.gray400,
                        border: `1px solid ${C.gray700}`,
                      }}
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>

              {/* Shop */}
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{
                    fontFamily: "var(--font-ecom-heading)",
                    color: C.gray400,
                  }}
                >
                  Shop
                </h4>
                <ul className="space-y-2">
                  {["Cookies & Bars", "Breakfast Burritos", "Pies & Cakes", "Gift Boxes", "Catering"].map(
                    (label) => (
                      <li key={label}>
                        <a
                          href="#"
                          className="text-sm no-underline hover:underline"
                          style={{ color: C.gray500 }}
                        >
                          {label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Locations */}
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{
                    fontFamily: "var(--font-ecom-heading)",
                    color: C.gray400,
                  }}
                >
                  Locations
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: C.white }}>
                      Old Town Salinas
                    </p>
                    <p className="text-sm" style={{ color: C.gray500 }}>
                      268 Main St, Salinas CA
                    </p>
                    <p className="text-sm" style={{ color: C.gray500 }}>
                      (831) 676-0628
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: C.white }}>
                      Carmel Crossroads
                    </p>
                    <p className="text-sm" style={{ color: C.gray500 }}>
                      Temporarily closed for repairs
                    </p>
                    <p className="text-sm" style={{ color: C.gray500 }}>
                      (831) 601-4818
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{
                    fontFamily: "var(--font-ecom-heading)",
                    color: C.gray400,
                  }}
                >
                  Hours
                </h4>
                <div className="space-y-1">
                  <p className="text-sm" style={{ color: C.gray500 }}>
                    <span style={{ color: C.white }}>Mon &ndash; Sat</span>&ensp;7am &ndash; 3pm
                  </p>
                  <p className="text-sm" style={{ color: C.gray500 }}>
                    <span style={{ color: C.white }}>Sunday</span>&ensp;Closed
                  </p>
                </div>
                <div
                  className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: C.pinkMuted,
                    color: C.pink,
                    fontFamily: "var(--font-ecom-heading)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: C.pink }}
                  />
                  As seen on Food Network
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
              style={{ borderTop: `1px solid ${C.gray700}`, color: C.gray500 }}
            >
              <p>&copy; {new Date().getFullYear()} Sweet Reba&apos;s Bakery. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:underline no-underline" style={{ color: C.gray500 }}>
                  Privacy
                </a>
                <a href="#" className="hover:underline no-underline" style={{ color: C.gray500 }}>
                  Terms
                </a>
                <a href="#" className="hover:underline no-underline" style={{ color: C.gray500 }}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
