import Link from "next/link";
import { CakeSlideshow, CakeCarousel } from "@/components/CakeGallery";
import WeddingConsultation from "@/components/WeddingConsultation";

const detailImages = [
  { src: "/cake-detail-1.png", alt: "White ranunculus detail" },
  { src: "/cake-detail-2.png", alt: "Pink gold leaf detail" },
  { src: "/cake-detail-3.png", alt: "Red roses and piping detail" },
  { src: "/cake-detail-4.png", alt: "Beach cake detail" },
  { src: "/cake-detail-5.png", alt: "Blue pearls detail" },
];

const dreamyImages = [
  { src: "/cake-dreamy-1.jpg", alt: "Rustic tiered cake with anemones" },
  { src: "/cake-dreamy-2.jpg", alt: "Pink cake with gold leaf" },
  { src: "/cake-dreamy-3.jpg", alt: "White tiered cake with ranunculus" },
  { src: "/cake-dreamy-4.jpg", alt: "Wedding cake with red roses" },
];

const favoriteImages = [
  { src: "/cake-fav-1.jpg", alt: "Succulent buttercream cake" },
  { src: "/cake-fav-2.jpg", alt: "Peacock cake with flowers" },
  { src: "/cake-fav-3.jpg", alt: "Pink and purple roses tiered cake" },
  { src: "/cake-fav-4.jpg", alt: "Book stack illusion cake" },
];

const specialImages = [
  { src: "/cake-special-1.jpg", alt: "Guadalupe cake with roses" },
  { src: "/cake-special-2.jpg", alt: "Bixby Bridge chocolate cake" },
  { src: "/cake-special-3.jpg", alt: "Pink peony semi-naked cake" },
  { src: "/cake-special-4.jpg", alt: "Beach theme cake" },
];

const cakeSizes = [
  { name: '6" Round', serves: "Serves 8-10", price: "$40" },
  { name: '8" Round', serves: "Serves 14-18", price: "$55" },
  { name: '9" Round', serves: "Serves 20-24", price: "$65" },
  { name: "1/4 Sheet", serves: "Serves 12-16", price: "$45" },
  { name: "Cupcakes", serves: "Minimum one dozen", price: "$36/dz" },
];

export default function CakesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="/banner-unicorn-cakes.jpg" alt="Beautiful unicorn cakes with sprinkles and floral decorations" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.6)] via-[rgba(255,248,240,0.15)_30%] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Custom Cakes for Everyone
          </h1>
          <p className="text-reba-soft text-lg max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            As seen on Food Network&apos;s Cake Wars. Every cake is a custom
            work of art, designed and baked with love.
          </p>
        </div>
      </section>

      {/* Intro + Dream Cake CTA */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-10 text-center">
          <p className="text-reba-soft leading-relaxed text-lg">
            Every custom cake is designed and baked from scratch &mdash; just for you.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dream-cake"
              className="inline-block bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Tell Us About Your Dream Cake {"\u2728"}
            </Link>
            <WeddingConsultation />
          </div>
        </div>
      </section>

      {/* Detail Slideshow */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-pink text-center mb-2">
          Reba&apos;s Attention to Detail
        </h2>
        <p className="text-reba-muted text-center mb-10">A few of our favorite creations</p>
        <CakeSlideshow images={detailImages} />
      </section>

      {/* Dreamy Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-pink text-center mb-2">
            Dreamy
          </h2>
          <p className="text-reba-muted text-center text-sm mb-8">Soft, whimsical, and utterly romantic</p>
          <CakeCarousel images={dreamyImages} />
        </div>
      </section>

      {/* Favorite Thing Gallery */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-pink text-center mb-2">
            Favorite Thing
          </h2>
          <p className="text-reba-muted text-center text-sm mb-8">The ones everyone asks about</p>
          <CakeCarousel images={favoriteImages} />
        </div>
      </section>

      {/* Special Occasion Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-pink text-center mb-2">
            Special Occasion
          </h2>
          <p className="text-reba-muted text-center text-sm mb-8">Weddings, milestones, and celebrations worth remembering</p>
          <CakeCarousel images={specialImages} />
        </div>
      </section>

      {/* Cake Sizes & Pricing */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream text-center mb-10">
            Cake Sizes &amp; Pricing
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {cakeSizes.map((size) => (
              <div key={size.name} className="bg-white border border-reba-pink/30 rounded-xl p-4 text-center">
                <h3 className="text-reba-cream font-semibold text-sm mb-1">{size.name}</h3>
                <p className="text-reba-muted text-xs mb-2">{size.serves}</p>
                <p className="text-reba-pink font-bold text-lg">{size.price}</p>
              </div>
            ))}
          </div>

          {/* Flavor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
              <h4 className="text-reba-pink font-semibold mb-1">
                Standard Flavors <span className="font-normal text-xs text-reba-muted">(always available)</span>
              </h4>
              <p className="text-reba-soft text-sm leading-relaxed">
                Classic Vanilla<br />Carrot<br />Life by Chocolate
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
              <h4 className="text-reba-pink font-semibold mb-1">
                Specialty Flavors <span className="font-normal text-xs text-reba-muted">(7-day notice)</span>
              </h4>
              <p className="text-reba-soft text-sm leading-relaxed">
                Raspberry Lemonade<br />Blackberry Lavender Lemon<br />Razzelberry<br />Lemon<br />Red Velvet<br />Cookies &amp; Cream<br />Chocolate Peanut Butter
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
              <h4 className="text-reba-pink font-semibold mb-1">Wedding Cakes</h4>
              <p className="text-reba-soft text-sm leading-relaxed mb-3">
                Custom consultation required.<br />Multi-tier designs.<br />Tasting sessions available.
              </p>
              <a href="tel:8316014818" className="text-reba-pink font-semibold text-sm hover:text-reba-pink-hover transition-colors">
                Schedule a tasting &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="bg-reba-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-reba-card border border-reba-pink/30 rounded-2xl p-8 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
              How to Order
            </h2>
            <div className="space-y-4 text-reba-soft text-sm leading-relaxed max-w-2xl mx-auto">
              <p>
                All custom cakes require a minimum of{" "}
                <span className="text-reba-pink font-semibold">72 hours advance notice</span>.
                For wedding cakes and large orders, we recommend booking at least 2-4 weeks ahead.
              </p>
              <p>
                We start every cake with a consultation to understand your vision, occasion, and
                flavor preferences. From there, we create a custom design that&apos;s uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dream Cake CTA */}
      <section className="bg-reba-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-white mb-4">
            Visit Us to Discuss Your Dream Cake
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Every great cake starts with a conversation. Tell us about your occasion
            and let&apos;s create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="text-white">
              <p className="text-white/70 text-sm">Carmel Crossroads</p>
              <a href="tel:8316014818" className="text-xl font-semibold hover:text-white/80 transition-colors">
                (831) 601-4818
              </a>
            </div>
            <div className="text-white">
              <p className="text-white/70 text-sm">Old Town Salinas</p>
              <a href="tel:8316760628" className="text-xl font-semibold hover:text-white/80 transition-colors">
                (831) 676-0628
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
