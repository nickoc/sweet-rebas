import { getSiteContent } from "@/lib/site-content";

/**
 * Site-wide announcement banner, owner-editable from the Bearing portal
 * (Website tab → "Announcement banner"). Hidden entirely when the message is
 * blank, so the default state shows nothing. Server component — reads the same
 * site_content overlay as the rest of the site (deduped fetch, ISR-cached).
 */
export async function AnnouncementBar() {
  const sc = await getSiteContent();
  const message = sc.get("global.announcement.message", "").trim();
  if (!message) return null;

  const rawLink = sc.get("global.announcement.link_url", "").trim();
  // Only allow http(s) or site-relative links — never javascript:/data: etc.,
  // even though the owner is trusted (defense-in-depth on stored content).
  const link = /^(https?:\/\/|\/)/i.test(rawLink) ? rawLink : "";
  const linkLabel = sc.get("global.announcement.link_label", "").trim();
  const external = link.startsWith("http");

  return (
    <div className="bg-reba-pink text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 text-center text-sm sm:text-base font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span>{message}</span>
        {link && (
          <a
            href={link}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="underline font-bold underline-offset-2 hover:opacity-90"
          >
            {linkLabel || "Learn more"}
          </a>
        )}
      </div>
    </div>
  );
}
