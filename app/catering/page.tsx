import Link from "next/link";

const highlights = [
  {
    emoji: "\u{1F36A}",
    title: "Cookie & Bar Platters",
    description: "Our signature cookies and bars, beautifully arranged for your event.",
    price: "from $36/dz",
    href: "/menu",
  },
  {
    emoji: "\u{1F961}",
    title: "Breakfast Catering",
    description: "Pastries, burritos, muffins, and coffee service for your morning meeting or event.",
    price: "from $8/person",
    href: "/menu",
  },
  {
    emoji: "\u{1F382}",
    title: "Celebration Cakes",
    description: "Custom cakes for birthdays, showers, retirements, and every reason to celebrate.",
    price: "from $40",
    href: "/cakes",
  },
];

const moreOptions = [
  { name: "Soup (Quarts)", desc: "Seasonal rotating flavors", price: "$12" },
  { name: "Sandwiches", desc: "Assorted, made fresh", price: "$6/person" },
  { name: "Pies", desc: "Seasonal fruit and classic favorites", price: "$18\u2013$25" },
  { name: "Loaves", desc: "Banana, pumpkin, lemon, and more", price: "$22" },
];

export default function CateringPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="/slideshow-snickerdoodles.jpg" alt="Fresh-baked snickerdoodle cookies" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.6)] via-[rgba(255,248,240,0.15)_30%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl lg:text-8xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Sweet Reba&apos;s Catering
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-2 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Let Us Feed Your People
          </p>
        </div>
      </section>

      {/* Good to Know */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-6 text-center">
          Good to Know
        </h3>
        <div className="space-y-5">
          <p className="text-reba-soft text-sm leading-relaxed">
            <span className="text-reba-cream font-semibold">Delivery available</span> &mdash; We deliver within Monterey County for orders over $100. Pickup is always free at either location.
          </p>
          <p className="text-reba-soft text-sm leading-relaxed">
            <span className="text-reba-cream font-semibold">72-hour notice required</span> &mdash; Please place catering orders at least 3 days in advance so we can bake everything fresh.
          </p>
          <p className="text-reba-soft text-sm leading-relaxed">
            <span className="text-reba-cream font-semibold">Custom packages welcome</span> &mdash; Don&apos;t see exactly what you need? We love building custom menus. Tell us about your event and we&apos;ll put something together.
          </p>
        </div>
      </section>

      {/* Catering Highlights */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-white border-2 border-reba-pink/30 rounded-2xl p-8 text-center flex flex-col"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-3">
                {item.title}
              </h3>
              <p className="text-reba-muted text-sm leading-relaxed flex-1 mb-4">
                {item.description}
              </p>
              <p className="text-reba-pink font-bold text-lg mb-4">{item.price}</p>
              <Link
                href={item.href}
                className="bg-reba-pink hover:bg-reba-pink-hover text-white py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                + Add
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* More Options & Good to Know */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl mx-auto">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-6 text-center">
              More Catering Options
            </h3>
              <div className="space-y-4">
                {moreOptions.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 bg-white border border-reba-border rounded-xl p-4"
                  >
                    <div>
                      <h4 className="text-reba-cream font-semibold text-sm">{item.name}</h4>
                      <p className="text-reba-muted text-xs">{item.desc}</p>
                    </div>
                    <span className="text-reba-pink font-semibold text-sm whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
