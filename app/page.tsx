import Link from "next/link";
import { menuItems, reviews } from "@/data/sample-data";
import CountUpStats from "@/components/CountUpStats";
import ReopeningBanner from "@/components/ReopeningBanner";

const popularItems = menuItems.filter((item) => item.popular).slice(0, 4);
const topReviews = reviews.filter((review) => review.rating === 5).slice(0, 3);

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
      <section className="relative min-h-[90vh] flex items-end justify-center overflow-hidden pb-16">
        <img src="/cookie-face-reba.jpg" alt="Reba holding up two cookies" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.85)] via-[rgba(255,248,240,0.3)_40%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-6 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Sweet Reba&apos;s
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-reba-pink mb-2 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Artisan Bakery. Made with Love Since 2004.
          </p>
          <p className="text-reba-pink/90 font-bold drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            <a
              href="https://maps.google.com/?q=Sweet+Rebas+206+Crossroads+Blvd+Carmel+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-reba-pink underline-offset-2 hover:underline transition-colors"
            >
              Carmel Crossroads
            </a>
            {" & "}
            <a
              href="https://maps.google.com/?q=Sweet+Rebas+268+Main+St+Salinas+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-reba-pink underline-offset-2 hover:underline transition-colors"
            >
              Old Town Salinas
            </a>
          </p>
        </div>
      </section>

      {/* Reopening Banner */}
      <ReopeningBanner />

      {/* Primary CTAs (moved below reopening banner) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-3.5 rounded-full text-lg font-medium transition-colors text-center"
          >
            View Menu
          </Link>
          <Link
            href="/chalkboard"
            className="bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-3.5 rounded-full text-lg font-medium transition-colors text-center"
          >
            Today&apos;s Chalkboard at Sweet Reba&apos;s
          </Link>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
          What Makes Us Special
        </h2>

        {/* Our Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            { emoji: "🌾", title: "Highest Quality", desc: "We source the finest ingredients available. No shortcuts, no compromises." },
            { emoji: "🌿", title: "Freshest Ingredients", desc: "Everything is made fresh, from scratch, every single day." },
            { emoji: "👩‍🍳", title: "Small-Batch", desc: "We bake in small batches to ensure every item meets our standards." },
            { emoji: "❤️", title: "Made with Love", desc: "The secret ingredient in everything we make. You can taste the difference." },
          ].map((value) => (
            <div key={value.title} className="border border-reba-border rounded-2xl p-6 text-center" style={{ backgroundColor: "#fff5f5" }}>
              <div className="text-3xl mb-3">{value.emoji}</div>
              <h3 className="text-reba-cream font-semibold mb-2">{value.title}</h3>
              <p className="text-reba-muted text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        <CountUpStats />
      </section>

      {/* Signature Products */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-4">
            Our Signature Products
          </h2>
          <p className="text-reba-muted text-center mb-14">
            Scratch-made favorites, baked fresh every day
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Chocolate Chip Cookie", price: "$3.50", image: "/product-chocolate-chip.jpg", desc: "Classic homemade chocolate chip \u2014 crispy edges, chewy center, loaded with chips." },
              { name: "Snickerdoodles", price: "$3.50", image: "/product-snickerdoodles.jpg", desc: "Soft cinnamon-sugar cookies with a crackled top. Warm spice, buttery dough, pure comfort." },
              { name: "Triple Chocolate Brownie", price: "$3.50", image: "/product-brownie.jpg", desc: "Dense, fudgy, three kinds of chocolate. The brownie that ruins all other brownies for you." },
              { name: "Lemon Brownie", price: "$3.50", image: "/product-lemon-brownie.jpg", desc: "Bright, tangy, and buttery \u2014 like a lemon bar and a brownie had a perfect child." },
              { name: "Breakfast Burrito", price: "$5.50", image: "/product-breakfast-burrito.jpg", desc: "Hearty, handmade, and stuffed with fresh ingredients. Served daily until 1 PM." },
            ].map((product) => (
              <Link
                key={product.name}
                href="/menu"
                className="group bg-white border border-reba-border rounded-2xl overflow-hidden hover:border-reba-pink/30 hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-reba-cream font-semibold text-sm mb-1">
                    {product.name}
                  </h3>
                  <p className="text-reba-pink font-medium text-sm mb-2">
                    {product.price}
                  </p>
                  <p className="text-reba-muted text-xs leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </Link>
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

      {/* Sweet Reba's Today's Pick */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
          Sweet Reba&apos;s Today&apos;s Pick
        </h2>

        {/* Framed "chalkboard" box */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-reba-pink/30 p-6 sm:p-10">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Soup of the Day */}
            <div className="bg-white rounded-2xl shadow-md border border-reba-border overflow-hidden">
              <div className="bg-reba-pink/10 px-5 py-3 border-b border-reba-border flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-reba-pink font-semibold">
                  Soup of the Day
                </span>
                <span className="text-2xl">{"\u{1F963}"}</span>
              </div>
              <div className="px-5 py-4">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-reba-cream mb-1">
                  Creamy Tomato Basil
                </h3>
                <p className="text-reba-muted text-xs leading-relaxed">
                  Roasted San Marzano tomatoes, fresh basil, a swirl of cream. Served with a warm house roll.
                </p>
              </div>
            </div>

            {/* Sandwich of the Day */}
            <div className="bg-white rounded-2xl shadow-md border border-reba-border overflow-hidden">
              <div className="bg-reba-pink/10 px-5 py-3 border-b border-reba-border flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-reba-pink font-semibold">
                  Sandwich of the Day
                </span>
                <span className="text-2xl">{"\u{1F96A}"}</span>
              </div>
              <div className="px-5 py-4">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-reba-cream mb-1">
                  Turkey &amp; Swiss
                </h3>
                <p className="text-reba-muted text-xs leading-relaxed">
                  Sliced turkey, Swiss cheese, lettuce, tomato, and honey mustard on fresh sourdough.
                </p>
              </div>
            </div>
          </div>

          {/* Carmel Reopening Callout */}
          <div className="bg-reba-pink rounded-2xl px-6 py-5 text-center shadow-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-1">
              {"\u{1F389}"} Carmel Reopening
            </p>
            <p className="text-white font-[family-name:var(--font-heading)] text-2xl mb-1">
              End of May 2026
            </p>
            <p className="text-white/80 text-xs leading-relaxed max-w-md mx-auto">
              We can&apos;t wait to see you back at Crossroads.
            </p>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/whats-baking"
              className="inline-block bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Sign Up for Weekly Updates
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
          <div className="rounded-2xl overflow-hidden">
            <img src="/mike-and-reba.png" alt="Reba and Michael at Sweet Reba's" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-reba-border rounded-2xl p-6"
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
        </div>
      </section>

    </div>
  );
}
