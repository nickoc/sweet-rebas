import { reviews } from "@/data/sample-data";

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

const avgRating = (
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
).toFixed(1);

export default function ReviewsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-reba-card to-reba-dark py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl text-reba-cream mb-4">
            Reviews
          </h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl sm:text-5xl font-bold text-reba-pink">
              {avgRating}
            </span>
            <div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(Number(avgRating)) ? "text-reba-pink" : "text-reba-border"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-reba-muted text-sm mt-0.5">average rating</p>
            </div>
          </div>
          <p className="text-reba-muted text-lg">
            191 reviews across Google &amp; Yelp
          </p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-reba-card border border-reba-border rounded-2xl p-6 hover:border-reba-pink/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} />
                <span className="text-xs text-reba-muted bg-reba-dark px-2.5 py-1 rounded-full border border-reba-border">
                  {review.platform}
                </span>
              </div>
              <p className="text-reba-soft text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-reba-border pt-3">
                <p className="text-reba-cream text-sm font-medium">
                  {review.author}
                </p>
                <p className="text-reba-muted text-xs">
                  {review.date ? new Date(review.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  }) : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
