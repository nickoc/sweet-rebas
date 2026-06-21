import Image from "next/image";
import Link from "next/link";
import { menuItems, reviews } from "@/data/sample-data";
import { Hero } from "@/components/Hero";
import CountUpStats from "@/components/CountUpStats";
import ReopeningBanner from "@/components/ReopeningBanner";
import NewsBanner from "@/components/NewsBanner";
import SignatureProducts from "@/components/SignatureProducts";
import HomeDailyPicks from "@/components/HomeDailyPicks";
import { getSiteContent } from "@/lib/site-content";
import { getCollection } from "@/lib/collections";

const popularItems = menuItems.filter((item) => item.popular).slice(0, 4);

// Fallback testimonials (the current 5-star picks) when the owner hasn't added any.
const fallbackTestimonials = reviews
  .filter((review) => review.rating === 5)
  .slice(0, 3)
  .map((r) => ({ rating: r.rating, text: r.text, author: r.author, platform: r.platform }));

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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const sc = await getSiteContent({ preview: isPreview });

  const reviewImages = [
    sc.img("home.reviews.img1", "/product-chocolate-chip.jpg"),
    sc.img("home.reviews.img2", "/product-breakfast-burrito.jpg"),
    sc.img("home.reviews.img3", "/product-dutch-apple-pie.jpg"),
  ];

  const testimonialRows = await getCollection("home.testimonials", {
    preview: isPreview,
  });
  const testimonials = testimonialRows.length
    ? testimonialRows.slice(0, 3).map((r) => ({
        rating: Number(r.fields.rating) || 5,
        text: r.fields.text ?? "",
        author: r.fields.author ?? "",
        platform: r.fields.platform ?? "",
      }))
    : fallbackTestimonials;
  return (
    <div>
      {/* Hero Section */}
      <Hero
        src={sc.img("home.hero.image", "/cookie-face-reba.jpg")}
        alt="Reba holding up two cookies"
        height="full"
        position="center 30%"
      />

      {/* Title + Locations */}
      <section className="py-10 sm:py-14 text-center">
        <p className="text-3xl sm:text-4xl font-extrabold text-reba-pink mb-4 tracking-wide">
          {sc.get("home.hero.tagline", "Small-Batch Bakery. Made with Love.")}
        </p>
        <p className="text-xl sm:text-2xl text-reba-pink/90 font-bold">
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
            href="https://maps.google.com/?q=Sweet+Rebas+268+S+Main+St+Salinas+CA+93901"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-reba-pink underline-offset-2 hover:underline transition-colors"
          >
            Old Town Salinas
          </a>
        </p>
      </section>

      {/* Three Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 md:mx-0 px-[5vw] md:px-0 pb-2 md:pb-0 scrollbar-hide">
          {/* What's Baking Today */}
          <Link href="/chalkboard" className="group block shrink-0 snap-center w-[90vw] sm:w-[65vw] md:w-auto">
            <div className="relative rounded-2xl overflow-hidden mb-5 aspect-square">
              <Image
                src={sc.img("home.cards.baking_image", "/slideshow-baked-goods.jpg")}
                alt="Fresh baked goods from Sweet Reba's"
                fill
                sizes="(max-width: 768px) 90vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-ink mb-2 group-hover:text-reba-pink transition-colors">
              {sc.get("home.cards.baking_title", "What's Baking Today?")}
            </h3>
            <p className="text-reba-muted text-xl leading-relaxed">
              {sc.get(
                "home.cards.baking_body",
                "Fresh soups, sandwiches, cookies, and daily specials — made from scratch every morning.",
              )}
            </p>
          </Link>

          {/* Bakery Pre-Orders */}
          <Link href="/cakes" className="group block shrink-0 snap-center w-[90vw] sm:w-[65vw] md:w-auto">
            <div className="relative rounded-2xl overflow-hidden mb-5 aspect-square">
              <Image
                src={sc.img("home.cards.preorders_image", "/slideshow-lemons.jpg")}
                alt="Fresh lemons at Sweet Reba's"
                fill
                sizes="(max-width: 768px) 90vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-ink mb-2 group-hover:text-reba-pink transition-colors">
              {sc.get("home.cards.preorders_title", "Bakery Pre-Orders")}
            </h3>
            <p className="text-reba-muted text-xl leading-relaxed">
              {sc.get(
                "home.cards.preorders_body",
                "Place an order for pick-up and we'll do the rest to make something just for you.",
              )}
            </p>
          </Link>

          {/* Our Story */}
          <Link href="/about" className="group block shrink-0 snap-center w-[90vw] sm:w-[65vw] md:w-auto">
            <div className="relative rounded-2xl overflow-hidden mb-5 aspect-square">
              <Image
                src={sc.img("home.cards.story_image", "/slideshow-snickerdoodles.jpg")}
                alt="Mike and Reba at Sweet Reba's"
                fill
                sizes="(max-width: 768px) 90vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-ink mb-2 group-hover:text-reba-pink transition-colors">
              {sc.get("home.cards.story_title", "Our Story")}
            </h3>
            <p className="text-reba-muted text-xl leading-relaxed">
              {sc.get(
                "home.cards.story_body",
                "From grandmother's kitchen to Food Network — a story of passion, family, and the perfect cake.",
              )}
            </p>
          </Link>
        </div>
      </section>

      {/* Reopening Banner */}
      <ReopeningBanner
        heading={sc.get("contact.reopening.heading", "Exciting News!")}
        salinasLine={sc.get("contact.reopening.salinas_line", "Our Salinas store is now open!")}
        carmelLine={sc.get("contact.reopening.carmel_line", "Our Carmel store is reopening in late June.")}
        prompt={sc.get("contact.reopening.prompt", "Be the first to know when Carmel reopens:")}
      />


      {/* Dynamic Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <CountUpStats
          stats={[
            { value: Number(sc.get("home.stats.s1_value", "10")), label: sc.get("home.stats.s1_label", "Years of Love") },
            { value: Number(sc.get("home.stats.s2_value", "4.8")), label: sc.get("home.stats.s2_label", "Star Rating"), decimals: 1 },
            { value: Number(sc.get("home.stats.s3_value", "10")), label: sc.get("home.stats.s3_label", "Nextdoor Neighborhoods") },
            { value: Number(sc.get("home.stats.s4_value", "2")), label: sc.get("home.stats.s4_label", "Locations") },
          ]}
        />
      </section>

      {/* ReBA in the News */}
      <NewsBanner preview={isPreview} />

      {/* Customer Reviews */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <h2 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl text-reba-ink text-center mb-14">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review, index) => (
              <div
                key={`${review.author}-${index}`}
                className="bg-white border border-reba-border rounded-2xl overflow-hidden"
              >
                {reviewImages[index] ? (
                  <div className="overflow-hidden px-6 pt-6 flex justify-center">
                    <Image
                      src={reviewImages[index]!}
                      alt=""
                      width={300}
                      height={220}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-xl max-h-[220px] w-auto object-contain"
                    />
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
                  <p className="text-reba-ink text-base font-medium">
                    {review.author}
                  </p>
                  <span className="text-base text-reba-muted bg-reba-bg px-3 py-1 rounded-full">
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
