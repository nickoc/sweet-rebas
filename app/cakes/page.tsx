import Link from "next/link";

const cakeCategories = [
  {
    title: "Birthday Cakes",
    emoji: "🎂",
    description:
      "From whimsical children's cakes to elegant adult celebrations. Every birthday cake is a custom creation designed to make the guest of honor feel truly special.",
  },
  {
    title: "Wedding Cakes",
    emoji: "💒",
    description:
      "Your wedding cake should be as extraordinary as your love story. We work with you to design a centerpiece that's as beautiful as it is delicious.",
  },
  {
    title: "Anniversary Cakes",
    emoji: "💕",
    description:
      "Celebrate your milestones with a cake that reflects your journey together. Classic elegance or modern design — we bring your vision to life.",
  },
  {
    title: "Celebration Cakes",
    emoji: "🎉",
    description:
      "Graduations, baby showers, retirements, promotions — every milestone deserves a Sweet Reba's cake. Tell us your occasion and we'll create something unforgettable.",
  },
];

export default function CakesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-reba-card to-reba-dark py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl text-reba-cream mb-4">
            Custom Cakes for Every Occasion
          </h1>
          <p className="text-reba-muted text-lg max-w-2xl mx-auto">
            As seen on Food Network&apos;s Cake Wars. Every cake is a custom
            work of art, designed and baked with love.
          </p>
        </div>
      </section>

      {/* Cake Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cakeCategories.map((cat) => (
            <div
              key={cat.title}
              className="bg-reba-card border border-reba-border rounded-2xl p-8 hover:border-reba-pink/30 transition-colors"
            >
              <div className="text-5xl mb-4">{cat.emoji}</div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-3">
                {cat.title}
              </h2>
              <p className="text-reba-muted text-sm leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ordering Info */}
      <section className="bg-reba-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-reba-card border border-reba-pink/30 rounded-2xl p-8 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
              How to Order
            </h2>
            <div className="space-y-4 text-reba-soft text-sm leading-relaxed max-w-2xl mx-auto">
              <p>
                All custom cakes require a minimum of{" "}
                <span className="text-reba-pink font-semibold">
                  72 hours advance notice
                </span>
                . For wedding cakes and large orders, we recommend booking at
                least 2-4 weeks ahead.
              </p>
              <p>
                We start every cake with a consultation to understand your
                vision, occasion, and flavor preferences. From there, we create
                a custom design that&apos;s uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Network Credential */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
          <div className="text-4xl mb-4">📺</div>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-3">
            Food Network Recognized
          </h2>
          <p className="text-reba-muted text-sm leading-relaxed max-w-xl mx-auto">
            Reba competed on Food Network&apos;s Cake Wars and earned
            recognition from legendary pastry judge Ron Ben Israel. When you
            order a Sweet Reba&apos;s cake, you&apos;re getting Food
            Network-caliber artistry.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-reba-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-white mb-4">
            Call Us to Discuss Your Dream Cake
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Every great cake starts with a conversation. Tell us about your
            occasion and let&apos;s create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="text-white">
              <p className="text-white/70 text-sm">Carmel Crossroads</p>
              <a
                href="tel:8316014818"
                className="text-xl font-semibold hover:text-white/80 transition-colors"
              >
                (831) 601-4818
              </a>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/30" />
            <div className="text-white">
              <p className="text-white/70 text-sm">Old Town Salinas</p>
              <a
                href="tel:8316760628"
                className="text-xl font-semibold hover:text-white/80 transition-colors"
              >
                (831) 676-0628
              </a>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-block bg-white text-reba-pink hover:bg-reba-cream px-8 py-3.5 rounded-full text-lg font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
