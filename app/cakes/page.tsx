import Link from "next/link";
import { CakeSlideshow, CakeCarousel } from "@/components/CakeGallery";

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
  { name: '6" Round', serves: "~10-12 servings", price: "$40" },
  { name: '8" Round', serves: "~15-20 servings", price: "$55" },
  { name: '9" Round', serves: "~20-25 servings", price: "$65" },
  { name: "1/4 Sheet", serves: "~30-35 servings", price: "$45" },
  { name: "Cupcakes", serves: "Per dozen", price: "$36/dz" },
];

export default function CakesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-8">
        <img src="/banner-unicorn-cakes.jpg" alt="Beautiful unicorn cakes with sprinkles and floral decorations" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.95)] via-[rgba(255,248,240,0.6)_45%] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Custom Cakes
          </h1>
          <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-1 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            As seen on Food Network&apos;s Cake Wars.
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-reba-pink mb-2 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Every cake is a custom work of art, designed and baked with love.
          </p>
        </div>
      </section>

      {/* Dreamy Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            Dreamy
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">Soft, whimsical, and utterly romantic</p>
          <CakeCarousel images={dreamyImages} />
        </div>
      </section>

      {/* Favorite Thing Gallery */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            Favorite Thing
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">The ones everyone asks about</p>
          <CakeCarousel images={favoriteImages} />
        </div>
      </section>

      {/* Special Occasion Gallery */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-pink text-center mb-4">
            Special Occasion
          </h2>
          <p className="text-reba-muted text-center text-xl mb-8">Weddings, milestones, and celebrations worth remembering</p>
          <CakeCarousel images={specialImages} />
        </div>
      </section>

      {/* Cake Sizes & Pricing */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="font-semibold text-reba-cream text-2xl mb-6">Sizes &amp; Pricing</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {cakeSizes.map((size) => (
              <div key={size.name} className="bg-white border border-reba-pink/30 rounded-xl p-4 text-center">
                <h4 className="text-reba-cream font-semibold text-lg">{size.name}</h4>
                <p className="text-reba-muted text-base mb-1">{size.serves}</p>
                <p className="text-reba-pink font-bold text-xl">{size.price}</p>
              </div>
            ))}
          </div>

          {/* Flavor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
              <h4 className="text-reba-pink font-semibold text-lg mb-2">
                Standard Flavors <span className="font-normal text-base text-reba-muted">(always available)</span>
              </h4>
              <p className="text-reba-soft text-[1.1rem] leading-relaxed">
                Classic Vanilla<br />Carrot<br />Life by Chocolate
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
              <h4 className="text-reba-pink font-semibold text-lg mb-2">
                Specialty Flavors <span className="font-normal text-base text-reba-muted">(7-day notice)</span>
              </h4>
              <p className="text-reba-soft text-[1.1rem] leading-relaxed">
                Raspberry Lemonade<br />Blackberry Lavender Lemon<br />Razzelberry<br />Lemon<br />Red Velvet<br />Cookies &amp; Cream<br />Chocolate Peanut Butter
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-reba-pink shadow-sm">
              <h4 className="text-reba-pink font-semibold text-lg mb-2">Wedding Cakes</h4>
              <p className="text-reba-soft text-[1.1rem] leading-relaxed mb-4">
                Custom consultation required.<br />Multi-tier designs.<br />Tasting sessions available.
              </p>
              <a href="tel:8316014818" className="text-reba-pink font-semibold text-base hover:text-reba-pink-hover transition-colors">
                Schedule a tasting &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Good to Know */}
      <section className="bg-reba-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-reba-card border-2 border-reba-pink/30 rounded-2xl p-10 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-6">
              Good to Know
            </h2>
            <div className="space-y-5 text-reba-soft text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
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

      {/* Visit Us */}
      <section className="bg-reba-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-6xl text-white mb-5">
            Visit Us to Discuss Your Dream Cake
          </h2>
          <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-lg mx-auto">
            Every great cake starts with a conversation. Tell us about your occasion
            and let&apos;s create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="text-white">
              <a
                href="https://maps.google.com/?q=Sweet+Rebas+206+Crossroads+Blvd+Carmel+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 text-base hover:text-white transition-colors underline underline-offset-2"
              >
                Carmel Crossroads
              </a>
              <br />
              <a href="tel:8316014818" className="text-2xl font-semibold hover:text-white/80 transition-colors">
                (831) 601-4818
              </a>
            </div>
            <div className="text-white">
              <a
                href="https://maps.google.com/?q=Sweet+Rebas+268+Main+St+Salinas+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 text-base hover:text-white transition-colors underline underline-offset-2"
              >
                Old Town Salinas
              </a>
              <br />
              <a href="tel:8316760628" className="text-2xl font-semibold hover:text-white/80 transition-colors">
                (831) 676-0628
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
