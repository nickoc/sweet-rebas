import Link from "next/link";
import { menuItems, reviews } from "@/data/sample-data";
import CountUpStats from "@/components/CountUpStats";
import ReopeningBanner from "@/components/ReopeningBanner";
import SignatureProducts from "@/components/SignatureProducts";
import HomeDailyPicks from "@/components/HomeDailyPicks";

const popularItems = menuItems.filter((item) => item.popular).slice(0, 4);
const topReviews = reviews.filter((review) => review.rating === 5).slice(0, 3);

const reviewImages = [
  "/product-chocolate-chip.jpg",
  "/product-breakfast-burrito.jpg",
  null, // Dutch apple pie — photo coming soon
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-6 h-6 ${i < rating ? "text-reba-pink" : "text-reba-border"}`}
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
      <section className="relative min-h-[100vh] overflow-hidden">
        <img src="/cookie-face-reba.jpg" alt="Reba holding up two cookies" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.3)] to-transparent" />
        <div className="relative min-h-[100vh]" />
      </section>

      {/* Title + Locations */}
      <section className="py-10 text-center">
        <p className="text-3xl sm:text-4xl font-extrabold text-reba-pink mb-2 tracking-wide">
          Artisan Bakery. Made with Love Since 2004.
        </p>
        <p className="text-xl sm:text-2xl text-reba-pink/90 font-bold mb-2">
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
      </section>

      {/* Three Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Our Story */}
          <Link href="/about" className="group block">
            <div className="rounded-2xl overflow-hidden mb-5 aspect-square">
              <img src="/slideshow-snickerdoodles.jpg" alt="Mike and Reba at Sweet Reba's" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-2 group-hover:text-reba-pink transition-colors">
              Our Story
            </h3>
            <p className="text-reba-muted text-base leading-relaxed">
              From grandmother&apos;s kitchen to Food Network — a story of passion, family, and the perfect cake.
            </p>
          </Link>

          {/* What's Baking Today */}
          <Link href="/chalkboard" className="group block">
            <div className="rounded-2xl overflow-hidden mb-5 aspect-square">
              <img src="/slideshow-baked-goods.jpg" alt="Fresh baked goods from Sweet Reba's" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-2 group-hover:text-reba-pink transition-colors">
              What&apos;s Baking Today?
            </h3>
            <p className="text-reba-muted text-base leading-relaxed">
              Fresh soups, sandwiches, cookies, and daily specials — made from scratch every morning.
            </p>
          </Link>

          {/* Bakery Pre-Orders */}
          <Link href="/cakes" className="group block">
            <div className="rounded-2xl overflow-hidden mb-5 aspect-square">
              <img src="/slideshow-lemons.jpg" alt="Fresh lemons at Sweet Reba's" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-2 group-hover:text-reba-pink transition-colors">
              Bakery Pre-Orders
            </h3>
            <p className="text-reba-muted text-base leading-relaxed">
              Place an order for pick-up and we&apos;ll do the rest to make something just for you.
            </p>
          </Link>
        </div>
      </section>

      {/* Reopening Banner */}
      <ReopeningBanner />

      {/* Sweet Reba's Today's Pick */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-cream text-center mb-4">
          Breakfast and Lunch Today in Salinas
        </h2>
        <p className="text-reba-pink text-xl sm:text-2xl font-bold text-center mb-14">
          Order for pick-up. Available until 1:00 PM or until sold out.
        </p>

        <HomeDailyPicks />
      </section>


      {/* Dynamic Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CountUpStats />
      </section>

      {/* Customer Reviews */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-cream text-center mb-14">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-white border border-reba-border rounded-2xl overflow-hidden"
              >
                {reviewImages[index] ? (
                  <div className="overflow-hidden px-6 pt-6 flex justify-center">
                    <img src={reviewImages[index]!} alt="" className="rounded-xl max-h-[220px] object-contain" />
                  </div>
                ) : (
                  <div className="h-48 bg-reba-card flex items-center justify-center">
                    <div className="text-center text-reba-muted">
                      <div className="text-5xl mb-2">{"\u{2600}\u{FE0F}"}</div>
                      <p className="text-sm">Photo coming soon</p>
                    </div>
                  </div>
                )}
                <div className="px-6 py-4">
                <StarRating rating={review.rating} />
                <p className="text-reba-soft text-base leading-relaxed mt-3 mb-3">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-reba-cream text-base font-medium">
                    {review.author}
                  </p>
                  <span className="text-base text-reba-muted bg-reba-dark px-3 py-1 rounded-full">
                    {review.platform}
                  </span>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
