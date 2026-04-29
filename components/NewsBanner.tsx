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

        {/* In the Press — verified third-party coverage of Reba & Sweet Reba's */}
        <div className="border-t border-reba-pink/20 px-8 sm:px-10 py-8 sm:py-10">
          <h3 className="font-[family-name:var(--font-heading)] italic text-3xl sm:text-4xl text-reba-pink mb-5">
            In the Press
          </h3>
          <ul className="divide-y divide-reba-pink/15">
            {pressItems.map((item) => (
              <li key={item.url} className="py-3 first:pt-0 first:pb-8 last:pb-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-x-4 gap-y-1 items-baseline group"
                >
                  <span className="text-reba-pink font-semibold text-base sm:text-[15px] uppercase tracking-wide">
                    {item.outlet}
                  </span>
                  <span className="text-reba-muted text-lg sm:text-base group-hover:text-reba-cream group-hover:underline transition-colors">
                    {item.title}
                  </span>
                  <span className="text-reba-muted/70 text-sm whitespace-nowrap">
                    {item.date}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const pressItems: { outlet: string; title: string; date: string; url: string }[] = [
  {
    outlet: "SFGate",
    title: "Calif. bakery serves killer $5 breakfast burritos from Food Network finalist",
    date: "Apr 2026",
    url: "https://www.sfgate.com/food/article/sweet-rebas-salinas-22223188.php",
  },
  {
    outlet: "Edible Monterey Bay",
    title: "Sweet Reba's #2 Now Open in Salinas",
    date: "Dec 2025",
    url: "https://ediblemontereybay.com/blog/sweet-rebas-2-now-open-in-salinas/",
  },
  {
    outlet: "Monterey County Weekly",
    title: "Sweet City Woman — Sweet Reba's Opening in Salinas",
    date: "Mar 2025",
    url: "https://www.montereycountynow.com/eat_drink/morsels/sweet-city-woman/article_d7bc951f-b82f-4ca5-b895-ab08e79226ea.html",
  },
  {
    outlet: "The Sandpiper",
    title: "Owner of Sweet Reba's bakery prepares to open Salinas location",
    date: "Dec 2024",
    url: "https://thesandpiper.org/owner-of-sweet-rebas-bakery-prepares-to-open-salinas-location-next-year/",
  },
  {
    outlet: "Edible Monterey Bay",
    title: "Sweet Reba's Goes Big With Second Location",
    date: "Jul 2023",
    url: "https://www.ediblemontereybay.com/blog/sweet-rebas-goes-big-with-second-location/",
  },
  {
    outlet: "See Monterey",
    title: "Monterey Pro v Pro: Golf Pro v Local Baking Legend",
    date: "2023",
    url: "https://www.seemonterey.com/monterey-pro-v-pro-golf-v-baking/",
  },
  {
    outlet: "Edible Monterey Bay",
    title: "Found Treasure: Sweet Reba's and the “Jelly D”",
    date: "May 2022",
    url: "https://ediblemontereybay.com/blog/found-treasure-sweet-rebas-and-the-jelly-d/",
  },
  {
    outlet: "The Carmel Pine Cone",
    title: "Golden Pine Cones — Best Desserts winner",
    date: "2022",
    url: "https://www.carmelpinecone.com/gpc2022.html",
  },
  {
    outlet: "The Carmel Pine Cone",
    title: "Golden Pine Cones — Best Desserts",
    date: "2021",
    url: "https://www.carmelpinecone.com/gpc2021.html",
  },
  {
    outlet: "The Crossroads Carmel",
    title: "Meet Reba — owner of Sweet Reba's (video)",
    date: "Aug 2022",
    url: "https://www.youtube.com/watch?v=LTOa4Y2ayAc",
  },
];
