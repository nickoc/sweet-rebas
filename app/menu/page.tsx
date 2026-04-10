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
      <section className="relative h-[48vh] min-h-[320px] max-h-[500px] overflow-hidden">
        <div className="grid grid-cols-4 h-full">
          <div className="bg-cover bg-center brightness-115 saturate-[1.2]" style={{ backgroundImage: "url('/slideshow-baked-goods.jpg')" }} />
          <div className="bg-cover bg-center brightness-115 saturate-[1.2]" style={{ backgroundImage: "url('/slideshow-snickerdoodles.jpg')" }} />
          <div className="bg-cover bg-center brightness-115 saturate-[1.2]" style={{ backgroundImage: "url('/slideshow-lemons.jpg')" }} />
          <div className="bg-cover bg-center brightness-115 saturate-[1.2]" style={{ backgroundImage: "url('/slideshow-soup.jpg')" }} />
        </div>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-center">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl text-white font-bold drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
              Our Menu
            </h1>
            <p className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl text-white mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              Good Food, Great Prices, Made from Scratch
            </p>
          </div>
        </div>
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
