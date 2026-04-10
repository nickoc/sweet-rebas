"use client";

import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { menuItems, reviews } from "@/data/sample-data";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

/* ── Palette ────────────────────────────────────────────── */
const c = {
  cream: "#FAF6F1",
  warmWhite: "#F5EDE4",
  sage: "#8A9A7B",
  sageMuted: "#A8B89C",
  charcoal: "#2C2C2C",
  warmGray: "#6B6560",
  teal: "#2A5B5E",
  tealHover: "#1E4648",
  linen: "#EDE6DC",
  footerBg: "#2C2C2C",
  footerText: "#C4BDB5",
  border: "#DDD5CA",
};

/* ── Data ───────────────────────────────────────────────── */
const featuredCategories = [
  {
    title: "Cookies & Bars",
    description:
      "Chocolate chip with crispy edges and chewy centers. Triple chocolate brownies that ruin all others. Baked fresh every morning before dawn.",
    cta: "Explore cookies",
    items: menuItems.filter(
      (i) =>
        (i.category === "cookies" || i.category === "bars") && i.popular
    ),
  },
  {
    title: "Breakfast Burritos",
    description:
      "Eggs, cheese, potatoes, and Reba's house salsa wrapped in a warm flour tortilla. The reason regulars show up at 7:01 every morning.",
    cta: "See the lineup",
    items: menuItems.filter((i) => i.category === "burritos").slice(0, 3),
  },
  {
    title: "Pies & Celebration",
    description:
      "Dutch apple from grandmother's recipe. Key lime with real whipped cream. The pies that turned a birthday tradition into a bakery.",
    cta: "Order a pie",
    items: menuItems.filter((i) => i.category === "pies"),
  },
];

const topReviews = reviews.filter((r) => r.rating >= 4).slice(0, 3);

/* ── Helpers ────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          fill={i < rating ? "#C9A96E" : "#DDD5CA"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Photo Placeholder ──────────────────────────────────── */
function PhotoPlaceholder({
  description,
  aspect = "aspect-[16/9]",
  className = "",
}: {
  description: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`${aspect} ${className} relative overflow-hidden`}
      style={{
        background:
          "linear-gradient(135deg, #DDD5CA 0%, #C4B8A8 40%, #B8A892 70%, #A89878 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <p
          className="text-center text-sm tracking-wide"
          style={{
            color: c.warmGray,
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function V2WarmPage() {
  return (
    <div
      className={cormorant.className}
      style={{
        backgroundColor: c.cream,
        color: c.charcoal,
        minHeight: "100vh",
      }}
    >
      {/* ─── NAV ──────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(250, 246, 241, 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          <Link
            href="/v2-warm"
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: c.charcoal,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Sweet Reba&apos;s
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {["Menu", "Our Story", "Locations", "Contact"].map((label) => (
              <Link
                key={label}
                href={
                  label === "Menu"
                    ? "/menu"
                    : label === "Our Story"
                      ? "#our-story"
                      : label === "Locations"
                        ? "#locations"
                        : "#contact"
                }
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: c.warmGray,
                  textDecoration: "none",
                }}
                className="hidden sm:block hover:opacity-70 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section style={{ paddingTop: "64px" }}>
        <div className="relative w-full" style={{ minHeight: "85vh" }}>
          {/* Photo placeholder — full bleed */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(170deg, #D4C4A8 0%, #C9B896 25%, #BFA87C 50%, #D4C0A0 75%, #E8DCC8 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center px-8">
              <p
                className="text-center text-lg"
                style={{
                  color: "rgba(107, 101, 96, 0.5)",
                  fontStyle: "italic",
                  maxWidth: "400px",
                }}
              >
                Golden-hour photograph of the Sweet Reba&apos;s storefront --
                warm light spilling through the windows, a few customers visible
                inside
              </p>
            </div>
          </div>

          {/* Text overlay — bottom left */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              background:
                "linear-gradient(to top, rgba(250,246,241,0.95) 0%, rgba(250,246,241,0.6) 50%, transparent 100%)",
              padding: "6rem 2rem 3rem",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <h1
                style={{
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  color: c.charcoal,
                  marginBottom: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Sweet Reba&apos;s
              </h1>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: c.warmGray,
                }}
              >
                Artisan Bakery &middot; Carmel &amp; Salinas &middot; Est. 2004
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOURS + INTRO ────────────────────────────────── */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: c.sage,
            marginBottom: "1.5rem",
          }}
        >
          Open 7am &ndash; 3pm, Monday through Saturday
        </p>
        <p
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 300,
            lineHeight: 1.6,
            color: c.charcoal,
          }}
        >
          What started as a birthday cake for her son in 2004 became one of the
          most beloved bakeries on the Monterey Peninsula. Reba brought her
          grandmother&apos;s recipes to life &mdash; and twenty-two years later,
          the oven hasn&apos;t stopped.
        </p>

        {/* Fire repair notice — understated */}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "1rem 1.5rem",
            border: `1px solid ${c.border}`,
            borderRadius: "4px",
            fontSize: "0.85rem",
            color: c.warmGray,
            lineHeight: 1.6,
          }}
        >
          Our Carmel Crossroads location is temporarily closed for fire repairs.
          Our Salinas cafe at 268 Main St is open and ready to welcome you.
        </div>
      </section>

      {/* ─── DISPLAY CASE ─────────────────────────────────── */}
      <section>
        <PhotoPlaceholder
          description="Wide shot of the display case -- rows of cookies, brownies, scones, and pies behind curved glass, morning light streaming across the counter"
          aspect="aspect-[21/9]"
        />
      </section>

      {/* ─── EDITORIAL GRID ───────────────────────────────── */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 1.5rem",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {featuredCategories.map((cat) => (
            <div key={cat.title}>
              <PhotoPlaceholder
                description={`Close-up: ${cat.title.toLowerCase()} arranged on parchment paper, natural light`}
                aspect="aspect-[4/5]"
                className="mb-6"
              />
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: c.charcoal,
                  marginBottom: "0.75rem",
                }}
              >
                {cat.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: c.warmGray,
                  marginBottom: "1.25rem",
                }}
              >
                {cat.description}
              </p>
              <Link
                href="/menu"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: c.teal,
                  textDecoration: "none",
                  borderBottom: `1px solid ${c.teal}`,
                  paddingBottom: "2px",
                }}
                className="hover:opacity-70 transition-opacity"
              >
                {cat.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DIVIDER ──────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "120px",
          margin: "0 auto",
          borderBottom: `1px solid ${c.border}`,
        }}
      />

      {/* ─── OUR STORY ────────────────────────────────────── */}
      <section
        id="our-story"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 1.5rem",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: c.sage,
                marginBottom: "1.25rem",
              }}
            >
              Our Story
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: c.charcoal,
                marginBottom: "1.5rem",
              }}
            >
              It began with a birthday cake.
            </h2>
            <div
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: c.warmGray,
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                In 2004, Reba baked a cake for her son&apos;s birthday. Friends
                tasted it and started placing orders. Word spread through the
                neighborhood, then across town, then across the Monterey
                Peninsula.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                She brought her grandmother&apos;s recipes out of the family
                kitchen and into Carmel Crossroads, where locals quickly made it
                their morning ritual. The cookies were perfect. The burritos
                were legendary. The pies brought people back for every holiday.
              </p>
              <p style={{ marginBottom: "1.5rem" }}>
                Food Network came calling &mdash; Reba appeared on Cake Wars,
                earning recognition from legendary judge Ron Ben Israel. But
                what she&apos;s most proud of is the regulars who come in every
                morning, the families who order pies for every celebration, and
                the community that grew up around her ovens.
              </p>
              <Link
                href="/about"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: c.teal,
                  textDecoration: "none",
                  borderBottom: `1px solid ${c.teal}`,
                  paddingBottom: "2px",
                }}
                className="hover:opacity-70 transition-opacity"
              >
                Read the full story
              </Link>
            </div>
          </div>
          <PhotoPlaceholder
            description="Candid portrait of Reba in her kitchen -- flour-dusted apron, warm smile, rolling pin in hand, golden morning light from the window"
            aspect="aspect-[3/4]"
          />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ backgroundColor: c.warmWhite }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "5rem 1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: c.sage,
              textAlign: "center",
              marginBottom: "0.75rem",
            }}
          >
            4.8 Stars on Google
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              color: c.charcoal,
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            What our neighbors say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topReviews.map((review) => (
              <div
                key={review.id}
                style={{
                  padding: "2rem",
                  backgroundColor: c.cream,
                  borderRadius: "4px",
                }}
              >
                <StarRating rating={review.rating} />
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: c.warmGray,
                    marginTop: "1rem",
                    marginBottom: "1.5rem",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: c.charcoal,
                    }}
                  >
                    {review.author}
                  </p>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: c.warmGray,
                    }}
                  >
                    {review.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR CAFES ────────────────────────────────────── */}
      <section
        id="locations"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 1.5rem",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: c.sage,
            textAlign: "center",
            marginBottom: "0.75rem",
          }}
        >
          Two Locations
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            color: c.charcoal,
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Our Cafes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Carmel */}
          <div>
            <PhotoPlaceholder
              description="Exterior of the Carmel Crossroads location -- climbing vines, a chalkboard menu visible through the window"
              aspect="aspect-[4/3]"
              className="mb-6"
            />
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                color: c.charcoal,
                marginBottom: "0.5rem",
              }}
            >
              Carmel Crossroads
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: c.warmGray,
                marginBottom: "0.25rem",
              }}
            >
              206 Crossroads Blvd, Carmel, CA
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: c.warmGray,
                marginBottom: "0.5rem",
              }}
            >
              (831) 601-4818
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: c.sage,
                fontStyle: "italic",
              }}
            >
              Temporarily closed for fire repairs &mdash; we&apos;ll be back
              soon.
            </p>
          </div>

          {/* Salinas */}
          <div>
            <PhotoPlaceholder
              description="Interior of the Old Town Salinas cafe -- a couple at a small table, pastries and coffee, warm overhead lighting"
              aspect="aspect-[4/3]"
              className="mb-6"
            />
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                color: c.charcoal,
                marginBottom: "0.5rem",
              }}
            >
              Old Town Salinas
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: c.warmGray,
                marginBottom: "0.25rem",
              }}
            >
              268 Main St, Salinas, CA
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: c.warmGray,
                marginBottom: "0.5rem",
              }}
            >
              (831) 676-0628
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: c.teal,
                fontWeight: 500,
              }}
            >
              Open Monday &ndash; Saturday, 7am &ndash; 3pm
            </p>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM ────────────────────────────────────── */}
      <section style={{ backgroundColor: c.warmWhite }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "3.5rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: c.sage,
              marginBottom: "1.5rem",
            }}
          >
            @sweetrebasbakery
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "Fresh cookies cooling on a wire rack, steam rising",
              "Breakfast burrito cross-section showing layers of eggs, cheese, potatoes",
              "A whole Dutch apple pie on a rustic wooden cutting board",
              "Reba handing a pink box across the counter to a smiling customer",
            ].map((desc, i) => (
              <PhotoPlaceholder
                key={i}
                description={desc}
                aspect="aspect-square"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer
        id="contact"
        style={{
          backgroundColor: c.footerBg,
          color: c.footerText,
          padding: "4rem 1.5rem 2rem",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "0.75rem",
              }}
            >
              Sweet Reba&apos;s
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: c.footerText,
              }}
            >
              Artisan bakery on the Monterey Peninsula. Baking with love since
              2004.
            </p>
          </div>

          {/* Hours */}
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "0.75rem",
              }}
            >
              Hours
            </p>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
              Monday &ndash; Saturday
              <br />
              7:00am &ndash; 3:00pm
              <br />
              <span style={{ opacity: 0.6 }}>Closed Sunday</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "0.75rem",
              }}
            >
              Quick Links
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {[
                { label: "Menu", href: "/menu" },
                { label: "Our Story", href: "/about" },
                { label: "Custom Cakes", href: "/menu" },
                { label: "Wholesale", href: "/menu" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.85rem",
                    color: c.footerText,
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "0.75rem",
              }}
            >
              Stay in Touch
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.7,
                marginBottom: "1rem",
              }}
            >
              Seasonal menus, holiday pre-orders, and the occasional recipe.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", gap: "0.5rem" }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.8rem",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "3px",
                  color: "#FFFFFF",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  backgroundColor: c.teal,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "3rem auto 0",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
            opacity: 0.6,
          }}
        >
          <p>&copy; 2004&ndash;2026 Sweet Reba&apos;s Bakery</p>
          <p>Carmel Crossroads &middot; Old Town Salinas</p>
        </div>
      </footer>
    </div>
  );
}
