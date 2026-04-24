/**
 * Today's chalkboard — powered by the Bearing catalog API.
 *
 * Specials are edited from the Sweet Reba's AI OS portal:
 *   https://getbearing.co/c/sweet-rebas/catalog
 * and picked up here within ~5 minutes via Next.js ISR cache.
 */

import ClosingCountdown from "./closing-countdown";
import ChalkboardNewsletterCard from "@/components/ChalkboardNewsletterCard";

export const revalidate = 30; // 30 seconds — fast demo/edit loop

const CATALOG_API =
  process.env.NEXT_PUBLIC_BEARING_API_URL?.replace(
    "/api/bearing-chat",
    "/api/catalog/sweet-rebas",
  ) || "https://getbearing.co/api/catalog/sweet-rebas";

type Special = {
  id: string;
  slot: string;
  date: string;
  name: string;
  description: string | null;
  price_label: string | null;
  image_url: string | null;
  notes: string | null;
};

const SLOT_META: Record<
  string,
  { label: string; emoji: string; fallbackImage: string }
> = {
  soup: {
    label: "Soup of the Day",
    emoji: "🍲",
    fallbackImage: "/slideshow-soup.jpg",
  },
  sandwich: {
    label: "Sandwich of the Day",
    emoji: "🥪",
    fallbackImage: "/product-breakfast-burrito.jpg",
  },
  cookie: {
    label: "Cookie of the Day",
    emoji: "🍪",
    fallbackImage: "/product-chocolate-chip.jpg",
  },
  featured: {
    label: "Today's Feature",
    emoji: "✨",
    fallbackImage: "/slideshow-baked-goods.jpg",
  },
};

const SLOT_ORDER = ["soup", "sandwich", "cookie", "featured"];

async function loadSpecials(): Promise<{
  date: string;
  specials: Special[];
}> {
  try {
    const res = await fetch(CATALOG_API, { next: { revalidate: 30 } });
    if (!res.ok) return { date: "", specials: [] };
    const data = (await res.json()) as {
      date: string;
      today: Special[];
    };
    return { date: data.date, specials: data.today ?? [] };
  } catch {
    return { date: "", specials: [] };
  }
}

function formatDate(iso: string): string {
  if (!iso) {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "America/Los_Angeles",
    });
  }
  // iso is YYYY-MM-DD in Pacific. Render consistently.
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

export default async function ChalkboardPage() {
  const { date, specials } = await loadSpecials();

  // Keep ordering consistent regardless of insert order
  const ordered = SLOT_ORDER.map((slot) =>
    specials.find((s) => s.slot === slot),
  ).filter((s): s is Special => !!s);

  return (
    <div className="min-h-screen">
      <section
        style={{ backgroundColor: "#fff5f5" }}
        className="border-b border-reba-border"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-heading)] text-7xl sm:text-8xl text-reba-pink mb-3">
              Specials of the Day
            </h1>
            <p className="text-reba-muted text-2xl mb-4">
              {formatDate(date)} &mdash; Salinas Location
            </p>
            <ClosingCountdown />
          </div>

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-6 text-center">
            <h3 className="text-reba-cream font-semibold text-xl mb-3">
              Opening Hours
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-base">
              <div>
                <span className="text-reba-muted">Mon&ndash;Fri:</span>{" "}
                <span className="text-reba-cream font-medium">7am &ndash; 3pm</span>
              </div>
              <div>
                <span className="text-reba-muted">Saturday:</span>{" "}
                <span className="text-reba-cream font-medium">8am &ndash; 3pm</span>
              </div>
              <div>
                <span className="text-reba-muted">Sunday:</span>{" "}
                <span className="text-reba-cream font-medium">8am &ndash; 2pm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        {ordered.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-reba-pink/40 rounded-3xl p-12 text-center">
            <p className="text-6xl mb-4">🧁</p>
            <p className="font-[family-name:var(--font-heading)] text-4xl text-reba-cream mb-3">
              Reba&apos;s baking something up.
            </p>
            <p className="text-reba-muted text-lg max-w-md mx-auto">
              Today&apos;s specials will show up here soon — check back in a
              bit or give us a call at (831) 676-0628.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {ordered.map((s) => {
              const meta = SLOT_META[s.slot] ?? {
                label: s.slot,
                emoji: "⭐",
                fallbackImage: "/slideshow-baked-goods.jpg",
              };
              const image = s.image_url ?? meta.fallbackImage;
              return (
                <div
                  key={s.id}
                  className="bg-white border-2 rounded-2xl overflow-hidden transition-all flex flex-col border-reba-pink/20 hover:border-reba-pink/40 hover:shadow-lg"
                >
                  <div className="w-full h-48 sm:h-56 overflow-hidden">
                    <img
                      src={image}
                      alt={s.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-5 py-5 flex-1 flex flex-col">
                    <span className="text-sm uppercase tracking-wider text-reba-pink font-bold mb-2">
                      {meta.emoji} {meta.label}
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-2">
                      {s.name}
                    </h3>
                    {s.description && (
                      <p className="text-reba-muted text-base leading-relaxed mb-4 flex-1">
                        {s.description}
                      </p>
                    )}
                    {s.price_label && (
                      <span className="text-reba-pink font-bold text-2xl">
                        {s.price_label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <ChalkboardNewsletterCard />
      </section>
    </div>
  );
}
