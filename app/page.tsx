import Link from "next/link";
import { menuItems, reviews } from "@/data/sample-data";

const popularItems = menuItems.filter((item) => item.popular).slice(0, 4);
const topReviews = reviews.slice(0, 3);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-reba-pink" : "text-reba-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src="/cookie-face-reba.jpg" alt="Reba holding up two cookies" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.6)] via-[rgba(255,248,240,0.15)_30%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-6 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Sweet Reba&apos;s
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-2 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Artisan Bakery. Made with Love Since 2004.
          </p>
          <p className="text-white/80 mb-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Carmel Crossroads &amp; Old Town Salinas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-3.5 rounded-full text-lg font-medium transition-colors"
            >
              View Menu
            </Link>
            <Link
              href="/menu"
              className="border border-reba-pink text-reba-pink hover:bg-reba-pink/10 px-8 py-3.5 rounded-full text-lg font-medium transition-colors"
            >
              Order for Pickup
            </Link>
          </div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-reba-card border border-reba-pink/30 rounded-2xl p-6 text-center">
          <p className="text-reba-cream text-sm sm:text-base leading-relaxed">
            <span className="text-reba-pink font-semibold">Notice:</span> Our
            Carmel location is temporarily closed for fire repairs (6-8 weeks).
            Our Salinas location at 268 Main St is open and ready to serve you!
          </p>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
          What Makes Us Special
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">📺</div>
            <h3 className="text-reba-cream font-semibold text-lg mb-2">
              Food Network Featured
            </h3>
            <p className="text-reba-muted text-sm leading-relaxed">
              Recognized on Cake Wars by legendary judge Ron Ben Israel for our
              extraordinary cake artistry.
            </p>
          </div>
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-reba-cream font-semibold text-lg mb-2">
              22 Years of Love
            </h3>
            <p className="text-reba-muted text-sm leading-relaxed">
              It all started with a birthday cake for Reba&apos;s son in 2004.
              Two decades later, we&apos;re still baking with the same passion.
            </p>
          </div>
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-reba-cream font-semibold text-lg mb-2">
              4.8 Stars
            </h3>
            <p className="text-reba-muted text-sm leading-relaxed">
              Top-rated on Google and beloved across 10 Nextdoor neighborhoods.
              Our community is our greatest ingredient.
            </p>
          </div>
        </div>
      </section>

      {/* Fresh Today */}
      <section className="bg-reba-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-4">
            Fresh Today
          </h2>
          <p className="text-reba-muted text-center mb-14">
            Some of our most popular items
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="bg-reba-card border border-reba-border rounded-2xl p-6 hover:border-reba-pink/30 transition-colors"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="text-reba-cream font-semibold mb-1">
                  {item.name}
                </h3>
                <p className="text-reba-pink font-medium mb-2">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-reba-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="text-reba-pink hover:text-reba-pink-hover transition-colors font-medium"
            >
              View Full Menu &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-6">
              Our Story
            </h2>
            <p className="text-reba-soft leading-relaxed mb-4">
              From grandmother&apos;s kitchen to Food Network, Sweet Reba&apos;s
              is a story of passion, family, and the transformative power of a
              really good cake.
            </p>
            <p className="text-reba-muted leading-relaxed mb-6">
              What started as a birthday cake for her son in 2004 grew into one
              of the most beloved bakeries on the Monterey Peninsula. Reba
              brought her grandmother&apos;s recipes to life, earning
              recognition from Food Network&apos;s Cake Wars and the hearts of
              the community.
            </p>
            <Link
              href="/about"
              className="text-reba-pink hover:text-reba-pink-hover transition-colors font-medium"
            >
              Read Our Full Story &rarr;
            </Link>
          </div>
          <div className="bg-reba-card border border-reba-border rounded-2xl aspect-[4/3] flex items-center justify-center">
            <div className="text-center text-reba-muted">
              <div className="text-6xl mb-3">🍰</div>
              <p className="text-sm">Reba in her kitchen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-reba-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topReviews.map((review) => (
              <div
                key={review.id}
                className="bg-reba-card border border-reba-border rounded-2xl p-6"
              >
                <StarRating rating={review.rating} />
                <p className="text-reba-soft text-sm leading-relaxed mt-4 mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-reba-cream text-sm font-medium">
                    {review.author}
                  </p>
                  <span className="text-xs text-reba-muted bg-reba-dark px-2 py-1 rounded-full">
                    {review.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="text-reba-pink hover:text-reba-pink-hover transition-colors font-medium"
            >
              See All Reviews &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="bg-reba-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-white mb-10">
            Visit Us Today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-10">
            <div className="text-white/90">
              <h3 className="font-semibold text-white mb-2">
                Carmel Crossroads
              </h3>
              <p className="text-sm">206 Crossroads Blvd</p>
              <p className="text-sm">(831) 601-4818</p>
              <p className="text-white/70 text-xs mt-1 italic">
                Temporarily closed for repairs
              </p>
            </div>
            <div className="text-white/90">
              <h3 className="font-semibold text-white mb-2">
                Old Town Salinas
              </h3>
              <p className="text-sm">268 Main St</p>
              <p className="text-sm">(831) 676-0628</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-white text-reba-pink hover:bg-reba-cream px-8 py-3.5 rounded-full text-lg font-medium transition-colors"
            >
              View Menu
            </Link>
            <a
              href="https://maps.google.com/?q=268+Main+St+Salinas+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full text-lg font-medium transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
