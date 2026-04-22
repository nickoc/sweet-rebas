export default function NewsBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff5f5" }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Cake Wars image on top, then heading, then text */}
          <div className="p-8 sm:p-10 flex flex-col">
            <img
              src="/cake-wars-thumbnail.png"
              alt="Food Network's Cake Wars"
              className="w-full rounded-xl mb-6 object-cover"
            />
            <h2 className="font-[family-name:var(--font-heading)] italic text-3xl sm:text-4xl text-reba-pink mb-4">
              Reba on Cake Wars
            </h2>
            <p className="text-reba-muted text-xl leading-relaxed">
              You may have seen Reba on Food Network&apos;s <em>Cake Wars</em>&ensp;(Season 3, Episode 3: &ldquo;Charlie Brown&apos;s All-Stars,&rdquo; June 2016). She brought her Carmel-born baking all the way to the final round with a showstopping 3-foot &ldquo;Peanuts&rdquo; cake, notably impressing judge Ron Ben-Israel with her apple pie cake.
            </p>
          </div>

          {/* Right: Clickable Pro v. Pro Monterey video thumbnail */}
          <a
            href="https://www.youtube.com/watch?v=AFvx6uWzDNU"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block overflow-hidden aspect-[4/3] md:aspect-auto md:h-full"
            aria-label="Watch Pro v. Pro Monterey — Andrea Lee versus Reba Wilson (opens YouTube in a new tab)"
          >
            <img
              src="https://img.youtube.com/vi/AFvx6uWzDNU/maxresdefault.jpg"
              alt="Pro v. Pro Monterey — Andrea Lee versus Reba Wilson"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Title overlay at top */}
            <div className="absolute top-0 inset-x-0 p-5 bg-gradient-to-b from-black/70 via-black/40 to-transparent text-center">
              <h3 className="font-[family-name:var(--font-heading)] italic text-3xl sm:text-4xl text-white drop-shadow-lg">
                Pro v. Pro Monterey
              </h3>
              <p className="font-[family-name:var(--font-heading)] italic text-3xl sm:text-4xl text-white mt-1 drop-shadow-md">
                Andrea Lee vs Reba Wilson
              </p>
            </div>
            {/* Play button overlay (center) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-10 h-10 ml-1 fill-reba-pink">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
