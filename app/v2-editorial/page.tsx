"use client";

import Link from "next/link";
import { menuItems, reviews } from "@/data/sample-data";

/* ────────────────────────────────────────────────────────────
   Sweet Reba's Bakery — V2 Editorial Luxury
   Inspired by Ron Ben-Israel / weddingcakes.com aesthetic
   Monochrome + gold accent, editorial serif, cinematic layout
   ──────────────────────────────────────────────────────────── */

// ─── Data helpers ──────────────────────────────────────────

const collections = [
  {
    slug: "the-classics",
    title: "The Classics",
    subtitle: "Perfected over two decades",
    items: menuItems.filter((i) => i.category === "cookies"),
  },
  {
    slug: "morning-rituals",
    title: "Morning Rituals",
    subtitle: "How Monterey starts the day",
    items: menuItems.filter((i) =>
      ["breakfast", "burritos"].includes(i.category)
    ),
  },
  {
    slug: "sweet-celebrations",
    title: "Sweet Celebrations",
    subtitle: "Custom cakes, pies & indulgences",
    items: menuItems.filter((i) => ["pies", "bars"].includes(i.category)),
  },
];

const featuredReviews = reviews.filter((r) => r.rating === 5).slice(0, 3);

// ─── Inline palette (self-contained, no globals changes) ───

const C = {
  cream: "#FAF7F2",
  warmWhite: "#F5F0E8",
  parchment: "#EDE8DE",
  charcoal: "#2A2A28",
  nearBlack: "#1A1A18",
  trueBlack: "#0F0F0E",
  gold: "#C9A96E",
  goldMuted: "#B8956A",
  warmGray: "#8A8580",
  hairline: "#D4CFC6",
  hairlineDark: "#3A3835",
} as const;

// ─── Typography helpers ────────────────────────────────────

const serif = {
  fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
};
const sansSerif = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};
const tracking = (v: string) => ({ letterSpacing: v });
const uppercase = {
  textTransform: "uppercase" as const,
  ...tracking("0.18em"),
  fontSize: "0.7rem",
  fontWeight: 500,
};

export default function V2EditorialPage() {
  return (
    <>
      {/* ── Google Fonts for this variant ── */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        /* Hide root layout chrome for this editorial page */
        body > header,
        body > footer,
        body > div[class*="chat"],
        body > main > header,
        #chat-widget {
          display: none !important;
        }
        body > main {
          padding-top: 0 !important;
        }
        body {
          background: ${C.cream} !important;
          color: ${C.charcoal} !important;
        }

        /* Editorial page resets */
        .ed-page * {
          box-sizing: border-box;
        }
        .ed-page ::selection {
          background: ${C.gold};
          color: ${C.trueBlack};
        }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Scroll indicator animation */
        @keyframes ed-drift {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(10px); opacity: 1; }
        }

        /* Hairline divider */
        .ed-hairline {
          border: none;
          height: 1px;
          background: ${C.hairline};
          margin: 0;
        }

        /* Image placeholder shimmer */
        @keyframes ed-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .ed-img-placeholder {
          background: linear-gradient(
            90deg,
            ${C.parchment} 25%,
            ${C.warmWhite} 50%,
            ${C.parchment} 75%
          );
          background-size: 200% 100%;
          animation: ed-shimmer 3s ease-in-out infinite;
        }

        /* Collection card hover */
        .ed-collection-card {
          transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease;
        }
        .ed-collection-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        /* Form inputs */
        .ed-input {
          width: 100%;
          padding: 0.875rem 0;
          border: none;
          border-bottom: 1px solid ${C.hairline};
          background: transparent;
          color: ${C.charcoal};
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .ed-input:focus {
          border-bottom-color: ${C.gold};
        }
        .ed-input::placeholder {
          color: ${C.warmGray};
        }
        .ed-textarea {
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
        }

        /* Nav link hover underline */
        .ed-nav-link {
          position: relative;
          text-decoration: none;
        }
        .ed-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: ${C.gold};
          transition: width 0.3s ease;
        }
        .ed-nav-link:hover::after {
          width: 100%;
        }

        /* Gallery grid item */
        .ed-gallery-item {
          position: relative;
          overflow: hidden;
        }
        .ed-gallery-item .ed-gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,15,14,0.7) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }
        .ed-gallery-item:hover .ed-gallery-overlay {
          opacity: 1;
        }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .ed-hero-title { font-size: 3.2rem !important; line-height: 1.05 !important; }
          .ed-section-title { font-size: 2.4rem !important; }
          .ed-pull-quote { font-size: 1.6rem !important; }
          .ed-collection-grid { grid-template-columns: 1fr !important; }
          .ed-gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .ed-split { grid-template-columns: 1fr !important; }
          .ed-footer-grid { grid-template-columns: 1fr !important; text-align: center; }
          .ed-nav-links { display: none !important; }
          .ed-about-text { padding: 3rem 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .ed-hero-title { font-size: 2.4rem !important; }
          .ed-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="ed-page" style={{ background: C.cream, color: C.charcoal, minHeight: "100vh" }}>

        {/* ════════════════════════════════════════════════════
            NAVIGATION — Minimal editorial
           ════════════════════════════════════════════════════ */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "1.25rem 2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: `${C.cream}E6`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: `1px solid ${C.hairline}`,
          }}
        >
          <Link
            href="/v2-editorial"
            style={{
              ...serif,
              fontSize: "1.15rem",
              fontWeight: 600,
              color: C.charcoal,
              textDecoration: "none",
            }}
          >
            Sweet Reba&rsquo;s
          </Link>

          <div
            className="ed-nav-links"
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              ...sansSerif,
              ...uppercase,
              color: C.warmGray,
            }}
          >
            <a href="#collections" className="ed-nav-link" style={{ color: "inherit" }}>
              Collections
            </a>
            <a href="#about" className="ed-nav-link" style={{ color: "inherit" }}>
              Story
            </a>
            <a href="#gallery" className="ed-nav-link" style={{ color: "inherit" }}>
              Custom Cakes
            </a>
            <a href="#contact" className="ed-nav-link" style={{ color: "inherit" }}>
              Visit
            </a>
          </div>

          <a
            href="tel:8316010418"
            style={{
              ...sansSerif,
              ...uppercase,
              color: C.warmGray,
              textDecoration: "none",
            }}
            className="ed-nav-link"
          >
            (831) 601-4818
          </a>
        </nav>

        {/* ════════════════════════════════════════════════════
            HERO — Full-viewport cinematic immersion
           ════════════════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            height: "100vh",
            minHeight: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Background image placeholder */}
          <div
            className="ed-img-placeholder"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, ${C.parchment} 0%, #E8DDD0 40%, #D4C8B8 100%)`,
            }}
          />

          {/* Warm golden overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 30%, rgba(250,247,242,0.3) 60%, rgba(250,247,242,0.95) 100%)",
            }}
          />

          {/* Hero content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "0 2rem 6rem",
              maxWidth: "900px",
            }}
          >
            {/* Press attribution */}
            <p
              style={{
                ...sansSerif,
                ...uppercase,
                color: C.goldMuted,
                marginBottom: "1.5rem",
                fontSize: "0.65rem",
              }}
            >
              As seen on Food Network&rsquo;s Cake Wars
            </p>

            <h1
              className="ed-hero-title"
              style={{
                ...serif,
                fontSize: "5.5rem",
                fontWeight: 400,
                lineHeight: 1,
                color: C.charcoal,
                marginBottom: "1.25rem",
              }}
            >
              Sweet
              <br />
              Reba&rsquo;s
            </h1>

            <p
              style={{
                ...sansSerif,
                ...tracking("0.25em"),
                textTransform: "uppercase",
                fontSize: "0.72rem",
                color: C.warmGray,
                fontWeight: 400,
              }}
            >
              Artisan Bakery &middot; Carmel &amp; Salinas &middot; Est. 2004
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "1px",
                height: "40px",
                background: C.warmGray,
                opacity: 0.4,
                animation: "ed-drift 2s ease-in-out infinite",
              }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            PRESS BAR — Minimal credibility strip
           ════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "3rem 2rem",
            textAlign: "center",
            borderTop: `1px solid ${C.hairline}`,
            borderBottom: `1px solid ${C.hairline}`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "2.5rem",
              ...sansSerif,
              ...uppercase,
              fontSize: "0.6rem",
              color: C.warmGray,
            }}
          >
            <span>Food Network</span>
            <span style={{ color: C.hairline }}>|</span>
            <span>Cake Wars</span>
            <span style={{ color: C.hairline }}>|</span>
            <span>Ron Ben-Israel, Judge</span>
            <span style={{ color: C.hairline }}>|</span>
            <span>4.8 Stars on Google</span>
            <span style={{ color: C.hairline }}>|</span>
            <span>Est. 2004</span>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            COLLECTIONS — Editorial product categories
           ════════════════════════════════════════════════════ */}
        <section
          id="collections"
          style={{
            padding: "6rem 2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                ...sansSerif,
                ...uppercase,
                color: C.goldMuted,
                marginBottom: "1rem",
                fontSize: "0.65rem",
              }}
            >
              The Bakery
            </p>
            <h2
              className="ed-section-title"
              style={{
                ...serif,
                fontSize: "3rem",
                fontWeight: 400,
                color: C.charcoal,
                marginBottom: "0.75rem",
              }}
            >
              Collections
            </h2>
            <p
              style={{
                ...sansSerif,
                fontSize: "0.95rem",
                color: C.warmGray,
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Twenty years of craft, distilled into three daily rituals.
            </p>
          </div>

          <div
            className="ed-collection-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {collections.map((col) => (
              <div
                key={col.slug}
                className="ed-collection-card"
                style={{
                  background: C.warmWhite,
                  border: `1px solid ${C.hairline}`,
                  overflow: "hidden",
                }}
              >
                {/* Image placeholder */}
                <div
                  className="ed-img-placeholder"
                  style={{
                    height: "320px",
                    background: `linear-gradient(135deg, ${C.parchment}, #DDD5C8)`,
                  }}
                />
                <div style={{ padding: "2rem" }}>
                  <p
                    style={{
                      ...sansSerif,
                      ...uppercase,
                      color: C.goldMuted,
                      marginBottom: "0.6rem",
                      fontSize: "0.6rem",
                    }}
                  >
                    {col.items.length} selections
                  </p>
                  <h3
                    style={{
                      ...serif,
                      fontSize: "1.6rem",
                      fontWeight: 500,
                      color: C.charcoal,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {col.title}
                  </h3>
                  <p
                    style={{
                      ...sansSerif,
                      fontSize: "0.85rem",
                      color: C.warmGray,
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {col.subtitle}
                  </p>

                  {/* Item list */}
                  <div
                    style={{
                      borderTop: `1px solid ${C.hairline}`,
                      paddingTop: "1rem",
                    }}
                  >
                    {col.items.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          padding: "0.5rem 0",
                          borderBottom: `1px solid ${C.hairline}20`,
                          ...sansSerif,
                          fontSize: "0.85rem",
                        }}
                      >
                        <span style={{ color: C.charcoal }}>{item.name}</span>
                        <span
                          style={{
                            color: C.warmGray,
                            fontSize: "0.8rem",
                            marginLeft: "1rem",
                            flexShrink: 0,
                          }}
                        >
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {col.items.length > 4 && (
                      <p
                        style={{
                          ...sansSerif,
                          fontSize: "0.75rem",
                          color: C.goldMuted,
                          marginTop: "0.75rem",
                          ...tracking("0.1em"),
                        }}
                      >
                        + {col.items.length - 4} more
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="ed-hairline" style={{ maxWidth: "120px", margin: "0 auto" }} />

        {/* ════════════════════════════════════════════════════
            PULL QUOTE — The conversion stat
           ════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "6rem 2rem",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <p
            className="ed-pull-quote"
            style={{
              ...serif,
              fontSize: "2.2rem",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.4,
              color: C.charcoal,
            }}
          >
            &ldquo;9 out of 10 customers who try our product become repeat
            buyers.&rdquo;
          </p>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: C.gold,
              margin: "2rem auto",
            }}
          />
          <p
            style={{
              ...sansSerif,
              ...uppercase,
              fontSize: "0.6rem",
              color: C.warmGray,
            }}
          >
            Based on 22 years of baking for the Monterey Peninsula
          </p>
        </section>

        <hr className="ed-hairline" style={{ maxWidth: "120px", margin: "0 auto" }} />

        {/* ════════════════════════════════════════════════════
            ABOUT — Full-bleed editorial portrait + narrative
           ════════════════════════════════════════════════════ */}
        <section
          id="about"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "80vh",
          }}
          className="ed-split"
        >
          {/* B&W Portrait placeholder */}
          <div
            style={{
              background: `linear-gradient(135deg, #3A3A38, #2A2A28, #1A1A18)`,
              position: "relative",
              minHeight: "500px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...sansSerif,
                ...uppercase,
                fontSize: "0.6rem",
                color: "#666",
                ...tracking("0.2em"),
              }}
            >
              Portrait of Reba
            </div>
          </div>

          {/* Narrative */}
          <div
            className="ed-about-text"
            style={{
              padding: "5rem 4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: C.warmWhite,
            }}
          >
            <p
              style={{
                ...sansSerif,
                ...uppercase,
                color: C.goldMuted,
                marginBottom: "1.5rem",
                fontSize: "0.65rem",
              }}
            >
              The Story
            </p>

            <h2
              className="ed-section-title"
              style={{
                ...serif,
                fontSize: "2.8rem",
                fontWeight: 400,
                color: C.charcoal,
                marginBottom: "2rem",
                lineHeight: 1.15,
              }}
            >
              From a birthday
              <br />
              cake to Cake Wars
            </h2>

            <div
              style={{
                ...sansSerif,
                fontSize: "0.95rem",
                color: C.warmGray,
                lineHeight: 1.9,
                maxWidth: "480px",
              }}
            >
              <p style={{ marginBottom: "1.25rem" }}>
                In 2004, Reba baked a birthday cake for a friend&rsquo;s
                daughter. Word spread. Orders followed. Within a year, what
                started in a home kitchen had outgrown every surface in the
                house.
              </p>
              <p style={{ marginBottom: "1.25rem" }}>
                Two decades later, Sweet Reba&rsquo;s has become a Monterey
                Peninsula institution &mdash; known for cookies that sell out by
                noon, breakfast burritos that draw lines around the block, and
                custom cakes that have graced celebrations from Pacific Grove to
                Pebble Beach.
              </p>
              <p>
                The craft caught the attention of Food Network, where Reba
                competed on Cake Wars under the discerning eye of judge Ron
                Ben-Israel. But ask any regular, and they&rsquo;ll tell you: the
                real magic is in the chocolate chip cookie.
              </p>
            </div>

            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "3rem",
              }}
            >
              <div>
                <p
                  style={{
                    ...serif,
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: C.charcoal,
                  }}
                >
                  22
                </p>
                <p
                  style={{
                    ...sansSerif,
                    ...uppercase,
                    fontSize: "0.55rem",
                    color: C.warmGray,
                    marginTop: "0.25rem",
                  }}
                >
                  Years baking
                </p>
              </div>
              <div>
                <p
                  style={{
                    ...serif,
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: C.charcoal,
                  }}
                >
                  2
                </p>
                <p
                  style={{
                    ...sansSerif,
                    ...uppercase,
                    fontSize: "0.55rem",
                    color: C.warmGray,
                    marginTop: "0.25rem",
                  }}
                >
                  Locations
                </p>
              </div>
              <div>
                <p
                  style={{
                    ...serif,
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: C.charcoal,
                  }}
                >
                  4.8
                </p>
                <p
                  style={{
                    ...sansSerif,
                    ...uppercase,
                    fontSize: "0.55rem",
                    color: C.warmGray,
                    marginTop: "0.25rem",
                  }}
                >
                  Google stars
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            REVIEWS — Editorial testimonials
           ════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "6rem 2rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                ...sansSerif,
                ...uppercase,
                color: C.goldMuted,
                marginBottom: "1rem",
                fontSize: "0.65rem",
              }}
            >
              Voices
            </p>
            <h2
              className="ed-section-title"
              style={{
                ...serif,
                fontSize: "3rem",
                fontWeight: 400,
                color: C.charcoal,
              }}
            >
              What They Say
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "3rem",
            }}
          >
            {featuredReviews.map((review, idx) => (
              <div
                key={review.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "2rem",
                  alignItems: "start",
                  paddingBottom: idx < featuredReviews.length - 1 ? "3rem" : 0,
                  borderBottom:
                    idx < featuredReviews.length - 1
                      ? `1px solid ${C.hairline}`
                      : "none",
                }}
              >
                <div
                  style={{
                    ...serif,
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: C.hairline,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  &ldquo;
                </div>
                <div>
                  <p
                    style={{
                      ...serif,
                      fontSize: "1.15rem",
                      fontStyle: "italic",
                      lineHeight: 1.8,
                      color: C.charcoal,
                      marginBottom: "1rem",
                    }}
                  >
                    {review.text}
                  </p>
                  <p
                    style={{
                      ...sansSerif,
                      ...uppercase,
                      fontSize: "0.6rem",
                      color: C.warmGray,
                    }}
                  >
                    {review.author} &mdash;{" "}
                    {review.platform.charAt(0).toUpperCase() +
                      review.platform.slice(1)}{" "}
                    &middot; {review.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="ed-hairline" style={{ maxWidth: "120px", margin: "0 auto" }} />

        {/* ════════════════════════════════════════════════════
            CUSTOM CAKES — Editorial gallery
           ════════════════════════════════════════════════════ */}
        <section
          id="gallery"
          style={{
            padding: "6rem 2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                ...sansSerif,
                ...uppercase,
                color: C.goldMuted,
                marginBottom: "1rem",
                fontSize: "0.65rem",
              }}
            >
              Bespoke
            </p>
            <h2
              className="ed-section-title"
              style={{
                ...serif,
                fontSize: "3rem",
                fontWeight: 400,
                color: C.charcoal,
                marginBottom: "0.75rem",
              }}
            >
              Custom Cakes
            </h2>
            <p
              style={{
                ...sansSerif,
                fontSize: "0.95rem",
                color: C.warmGray,
                maxWidth: "440px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Each cake is designed and crafted by hand. Allow 3&ndash;5 days for
              custom orders.
            </p>
          </div>

          <div
            className="ed-gallery-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "320px 320px",
              gap: "1rem",
            }}
          >
            {[
              { span: "span 2", label: "Wedding & Celebration Cakes" },
              { span: "span 1", label: "Tiered Designs" },
              { span: "span 1", label: "Sculptural" },
              { span: "span 1", label: "Floral & Botanical" },
              { span: "span 1", label: "Birthday Favorites" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="ed-gallery-item"
                style={{
                  gridColumn: idx === 0 ? item.span : "span 1",
                  background: `linear-gradient(${135 + idx * 20}deg, ${C.parchment}, #DDD5C8, #C8BFB0)`,
                }}
              >
                <div className="ed-gallery-overlay">
                  <p
                    style={{
                      ...sansSerif,
                      fontSize: "0.8rem",
                      color: "#FAF7F2",
                      ...tracking("0.08em"),
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p
              style={{
                ...sansSerif,
                fontSize: "0.85rem",
                color: C.warmGray,
                lineHeight: 1.7,
              }}
            >
              Judged by Ron Ben-Israel on Food Network&rsquo;s Cake Wars.
              <br />
              From birthdays to weddings, every detail is intentional.
            </p>
          </div>
        </section>

        <hr className="ed-hairline" style={{ maxWidth: "120px", margin: "0 auto" }} />

        {/* ════════════════════════════════════════════════════
            CONTACT — Split layout with minimal form
           ════════════════════════════════════════════════════ */}
        <section
          id="contact"
          style={{
            padding: "6rem 2rem",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            className="ed-split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
            }}
          >
            {/* Visit info */}
            <div>
              <p
                style={{
                  ...sansSerif,
                  ...uppercase,
                  color: C.goldMuted,
                  marginBottom: "1.5rem",
                  fontSize: "0.65rem",
                }}
              >
                Visit
              </p>
              <h2
                className="ed-section-title"
                style={{
                  ...serif,
                  fontSize: "2.8rem",
                  fontWeight: 400,
                  color: C.charcoal,
                  marginBottom: "2.5rem",
                  lineHeight: 1.15,
                }}
              >
                Come see us
              </h2>

              {/* Locations */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div
                  style={{
                    marginBottom: "2rem",
                    paddingBottom: "2rem",
                    borderBottom: `1px solid ${C.hairline}`,
                  }}
                >
                  <p
                    style={{
                      ...sansSerif,
                      ...uppercase,
                      fontSize: "0.6rem",
                      color: C.goldMuted,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Carmel Crossroads
                  </p>
                  <p
                    style={{
                      ...sansSerif,
                      fontSize: "0.9rem",
                      color: C.charcoal,
                      lineHeight: 1.7,
                    }}
                  >
                    206 Crossroads Blvd
                    <br />
                    Carmel, CA 93923
                  </p>
                  <p
                    style={{
                      ...sansSerif,
                      fontSize: "0.8rem",
                      color: C.warmGray,
                      marginTop: "0.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    Temporarily closed for fire repairs
                  </p>
                  <p
                    style={{
                      ...sansSerif,
                      fontSize: "0.85rem",
                      color: C.warmGray,
                      marginTop: "0.5rem",
                    }}
                  >
                    (831) 601-4818
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      ...sansSerif,
                      ...uppercase,
                      fontSize: "0.6rem",
                      color: C.goldMuted,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Old Town Salinas
                  </p>
                  <p
                    style={{
                      ...sansSerif,
                      fontSize: "0.9rem",
                      color: C.charcoal,
                      lineHeight: 1.7,
                    }}
                  >
                    268 Main St
                    <br />
                    Salinas, CA 93901
                  </p>
                  <p
                    style={{
                      ...sansSerif,
                      fontSize: "0.85rem",
                      color: C.warmGray,
                      marginTop: "0.5rem",
                    }}
                  >
                    (831) 676-0628
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div>
                <p
                  style={{
                    ...sansSerif,
                    ...uppercase,
                    fontSize: "0.6rem",
                    color: C.goldMuted,
                    marginBottom: "0.75rem",
                  }}
                >
                  Hours
                </p>
                <p
                  style={{
                    ...sansSerif,
                    fontSize: "0.9rem",
                    color: C.charcoal,
                    lineHeight: 1.7,
                  }}
                >
                  Monday &ndash; Saturday: 7am &ndash; 3pm
                </p>
                <p
                  style={{
                    ...sansSerif,
                    fontSize: "0.9rem",
                    color: C.warmGray,
                  }}
                >
                  Closed Sunday
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <p
                style={{
                  ...sansSerif,
                  ...uppercase,
                  color: C.goldMuted,
                  marginBottom: "1.5rem",
                  fontSize: "0.65rem",
                }}
              >
                Inquiries
              </p>
              <h3
                style={{
                  ...serif,
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: C.charcoal,
                  marginBottom: "2rem",
                }}
              >
                Custom orders, catering &amp; wholesale
              </h3>

              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="ed-input"
                  style={sansSerif}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="ed-input"
                  style={sansSerif}
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  className="ed-input"
                  style={sansSerif}
                />
                <textarea
                  placeholder="Tell us about your order or event"
                  className="ed-input ed-textarea"
                  style={sansSerif}
                />
                <button
                  type="submit"
                  style={{
                    ...sansSerif,
                    ...uppercase,
                    fontSize: "0.65rem",
                    padding: "1rem 2.5rem",
                    border: `1px solid ${C.charcoal}`,
                    background: "transparent",
                    color: C.charcoal,
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.charcoal;
                    e.currentTarget.style.color = C.cream;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = C.charcoal;
                  }}
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            FOOTER — Dark editorial
           ════════════════════════════════════════════════════ */}
        <footer
          style={{
            background: C.nearBlack,
            color: C.warmGray,
            padding: "4rem 2rem 3rem",
            marginTop: "2rem",
          }}
        >
          <div
            className="ed-footer-grid"
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand */}
            <div>
              <p
                style={{
                  ...serif,
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  color: C.cream,
                  marginBottom: "1rem",
                }}
              >
                Sweet Reba&rsquo;s
              </p>
              <p
                style={{
                  ...sansSerif,
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  maxWidth: "320px",
                  color: "#6A6560",
                }}
              >
                Artisan bakery on the Monterey Peninsula. Baking from scratch
                since 2004. As featured on Food Network&rsquo;s Cake Wars.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p
                style={{
                  ...sansSerif,
                  ...uppercase,
                  fontSize: "0.6rem",
                  color: "#6A6560",
                  marginBottom: "1rem",
                }}
              >
                Navigate
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {[
                  { label: "Menu", href: "/menu" },
                  { label: "Custom Cakes", href: "/cakes" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      ...sansSerif,
                      fontSize: "0.85rem",
                      color: C.warmGray,
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = C.cream)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = C.warmGray)
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                style={{
                  ...sansSerif,
                  ...uppercase,
                  fontSize: "0.6rem",
                  color: "#6A6560",
                  marginBottom: "1rem",
                }}
              >
                Contact
              </p>
              <div
                style={{
                  ...sansSerif,
                  fontSize: "0.85rem",
                  lineHeight: 2,
                }}
              >
                <p>Carmel: (831) 601-4818</p>
                <p>Salinas: (831) 676-0628</p>
                <p style={{ marginTop: "0.5rem", color: "#6A6560" }}>
                  Mon&ndash;Sat 7am&ndash;3pm
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: `1px solid ${C.hairlineDark}`,
              paddingTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              maxWidth: "1100px",
              margin: "0 auto",
              ...sansSerif,
              fontSize: "0.7rem",
              color: "#5A5550",
            }}
          >
            <p>&copy; {new Date().getFullYear()} Sweet Reba&rsquo;s Bakery. All rights reserved.</p>
            <p style={{ ...tracking("0.15em") }}>
              Carmel Crossroads &middot; Old Town Salinas
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
