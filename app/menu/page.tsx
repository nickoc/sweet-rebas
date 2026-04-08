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
      {/* Hero */}
      <section className="bg-gradient-to-b from-reba-card to-reba-dark py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl text-reba-cream mb-4">
            Our Menu
          </h1>
          <p className="text-reba-muted text-lg">
            Everything is made from scratch, every single day.
          </p>
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
