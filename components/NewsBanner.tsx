import { getSiteContent } from "@/lib/site-content";
import { getCollection } from "@/lib/collections";

// "Reba in the News" — owner-editable via the Bearing portal:
//   • Cake Wars photo + heading + blurb  → site_content (home.news.*)
//   • video(s)                           → home.media collection
//   • press articles                     → home.press collection
// Each falls back to the current hardcoded content when the CMS has nothing,
// so the live site is unchanged until Mike & Reba edit.

type PressItem = { outlet: string; title: string; date: string; url: string };
type Video = { title: string; subtitle: string; youtube_url: string };

const FALLBACK_PRESS: PressItem[] = [
  { outlet: "SFGate", title: "Calif. bakery serves killer $5 breakfast burritos from Food Network finalist", date: "Apr 2026", url: "https://www.sfgate.com/food/article/sweet-rebas-salinas-22223188.php" },
  { outlet: "Edible Monterey Bay", title: "Sweet Reba's #2 Now Open in Salinas", date: "Dec 2025", url: "https://ediblemontereybay.com/blog/sweet-rebas-2-now-open-in-salinas/" },
  { outlet: "Monterey County Weekly", title: "Sweet City Woman — Sweet Reba's Opening in Salinas", date: "Mar 2025", url: "https://www.montereycountynow.com/eat_drink/morsels/sweet-city-woman/article_d7bc951f-b82f-4ca5-b895-ab08e79226ea.html" },
  { outlet: "The Sandpiper", title: "Owner of Sweet Reba's bakery prepares to open Salinas location", date: "Dec 2024", url: "https://thesandpiper.org/owner-of-sweet-rebas-bakery-prepares-to-open-salinas-location-next-year/" },
  { outlet: "Edible Monterey Bay", title: "Sweet Reba's Goes Big With Second Location", date: "Jul 2023", url: "https://www.ediblemontereybay.com/blog/sweet-rebas-goes-big-with-second-location/" },
  { outlet: "See Monterey", title: "Monterey Pro v Pro: Golf Pro v Local Baking Legend", date: "2023", url: "https://www.seemonterey.com/monterey-pro-v-pro-golf-v-baking/" },
  { outlet: "Edible Monterey Bay", title: "Found Treasure: Sweet Reba's and the “Jelly D”", date: "May 2022", url: "https://ediblemontereybay.com/blog/found-treasure-sweet-rebas-and-the-jelly-d/" },
  { outlet: "The Carmel Pine Cone", title: "Golden Pine Cones — Best Desserts winner", date: "2022", url: "https://www.carmelpinecone.com/gpc2022.html" },
  { outlet: "The Carmel Pine Cone", title: "Golden Pine Cones — Best Desserts", date: "2021", url: "https://www.carmelpinecone.com/gpc2021.html" },
  { outlet: "The Crossroads Carmel", title: "Meet Reba — owner of Sweet Reba's (video)", date: "Aug 2022", url: "https://www.youtube.com/watch?v=LTOa4Y2ayAc" },
];

const FALLBACK_VIDEOS: Video[] = [
  { title: "Pro v. Pro Monterey", subtitle: "Andrea Lee vs Reba Wilson", youtube_url: "https://www.youtube.com/watch?v=AFvx6uWzDNU" },
];

const DEFAULT_BLURB =
  "You may have seen Reba on Food Network's Cake Wars (Season 3, Episode 3: “Charlie Brown's All-Stars,” June 2016). She brought her Carmel-born baking all the way to the final round with a showstopping 3-foot “Peanuts” cake, notably impressing judge Ron Ben-Israel with her apple pie cake.";

// Extract a YouTube id from watch / youtu.be / embed URLs. Returns null if not YouTube.
function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return m ? m[1]! : null;
}

function VideoCard({ video, big }: { video: Video; big?: boolean }) {
  const id = youtubeId(video.youtube_url);
  const thumb = id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
  return (
    <a
      href={video.youtube_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group block overflow-hidden ${
        big ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-video rounded-xl"
      }`}
      aria-label={`Watch ${video.title} — ${video.subtitle} (opens in a new tab)`}
    >
      {thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt={`${video.title} — ${video.subtitle}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full bg-reba-pink/15" />
      )}
      <div className="absolute top-0 inset-x-0 p-5 bg-gradient-to-b from-black/70 via-black/40 to-transparent text-center">
        <h3 className={`font-[family-name:var(--font-heading)] italic text-white drop-shadow-lg ${big ? "text-3xl sm:text-4xl" : "text-xl"}`}>
          {video.title}
        </h3>
        {video.subtitle && (
          <p className={`font-[family-name:var(--font-heading)] italic text-white mt-1 drop-shadow-md ${big ? "text-3xl sm:text-4xl" : "text-base"}`}>
            {video.subtitle}
          </p>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${big ? "w-20 h-20" : "w-12 h-12"}`}>
          <svg viewBox="0 0 24 24" className={`ml-1 fill-reba-pink ${big ? "w-10 h-10" : "w-6 h-6"}`}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default async function NewsBanner({ preview = false }: { preview?: boolean }) {
  const sc = await getSiteContent({ preview });
  const cwImage = sc.img("home.news.cakewars_image", "/cake-wars-thumbnail.png");
  const cwHeading = sc.get("home.news.cakewars_heading", "Reba on Cake Wars");
  const cwBlurb = sc.get("home.news.cakewars_blurb", DEFAULT_BLURB);

  const pressRows = await getCollection("home.press", { preview });
  const press: PressItem[] = pressRows.length
    ? pressRows.map((r) => ({
        outlet: r.fields.outlet ?? "",
        title: r.fields.title ?? "",
        date: r.fields.date ?? "",
        url: r.fields.url ?? "#",
      }))
    : FALLBACK_PRESS;

  const videoRows = await getCollection("home.media", { preview });
  const videos: Video[] = videoRows.length
    ? videoRows.map((r) => ({
        title: r.fields.title ?? "",
        subtitle: r.fields.subtitle ?? "",
        youtube_url: r.fields.youtube_url ?? "#",
      }))
    : FALLBACK_VIDEOS;
  const [firstVideo, ...moreVideos] = videos;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff5f5" }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Cake Wars image on top, then heading, then text */}
          <div className="p-8 sm:p-10 flex flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cwImage}
              alt="Food Network's Cake Wars"
              className="w-full rounded-xl mb-6 object-cover"
            />
            <h2 className="font-[family-name:var(--font-heading)] italic text-3xl sm:text-4xl text-reba-pink mb-4">
              {cwHeading}
            </h2>
            <p className="text-reba-muted text-xl leading-relaxed">{cwBlurb}</p>
          </div>

          {/* Right: primary video */}
          {firstVideo && <VideoCard video={firstVideo} big />}
        </div>

        {/* Additional videos, if the owner added more */}
        {moreVideos.length > 0 && (
          <div className="px-8 sm:px-10 pb-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {moreVideos.map((v, i) => (
              <VideoCard key={`${v.youtube_url}-${i}`} video={v} />
            ))}
          </div>
        )}

        {/* In the Press */}
        <div className="border-t border-reba-pink/20 px-8 sm:px-10 py-8 sm:py-10">
          <h3 className="font-[family-name:var(--font-heading)] italic text-3xl sm:text-4xl text-reba-pink mb-5">
            In the Press
          </h3>
          <ul className="divide-y divide-reba-pink/15">
            {press.map((item, i) => (
              <li key={`${item.url}-${i}`} className="py-3 first:pt-0 first:pb-8 last:pb-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-x-4 gap-y-1 items-baseline group"
                >
                  <span className="text-reba-pink font-semibold text-base sm:text-[15px] uppercase tracking-wide">
                    {item.outlet}
                  </span>
                  <span className="text-reba-muted text-lg sm:text-base group-hover:text-reba-ink group-hover:underline transition-colors">
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
