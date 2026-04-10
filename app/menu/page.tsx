import Link from "next/link";
import { menuItems } from "@/data/sample-data";

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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="/slideshow-baked-goods.jpg" alt="Fresh baked goods from Sweet Reba's" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.6)] via-[rgba(255,248,240,0.15)_30%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl lg:text-8xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Our Menu
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-2 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Good Food, Great Prices, Made from Scratch
          </p>
        </div>
      </section>

      {/* Flavor Quiz CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
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
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-reba-border" />
              </div>

              {categoryNotes[category] && (
                <p className="text-reba-pink text-sm mb-6 italic">
                  {categoryNotes[category]}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-reba-card border border-reba-border rounded-xl p-5 hover:border-reba-pink/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{item.emoji}</span>
                          <h3 className="text-reba-cream font-semibold">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-reba-muted text-sm leading-relaxed">
                          {item.description}
                        </p>
                        {/* Notes shown at category level */}
                      </div>
                      <span className="text-reba-pink font-semibold whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
