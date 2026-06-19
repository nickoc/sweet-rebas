// Overlay layer for owner-editable website content. The Bearing portal is the
// source of truth for page copy + images (site_content table); this site keeps
// its current hardcoded strings as fallbacks. Per field, the portal value wins
// where it has one; otherwise the hardcoded default stays. On ANY failure the
// whole map is empty, so every field falls back — the page never blanks.
//
// Mirrors lib/menu-catalog.ts (same Bearing API base derivation + ISR cache).

const SITE_CONTENT_API =
  process.env.NEXT_PUBLIC_BEARING_API_URL?.replace(
    "/api/bearing-chat",
    "/api/site-content/sweet-rebas",
  ) || "https://getbearing.co/api/site-content/sweet-rebas";

type ContentRow = {
  page: string;
  section_key: string;
  field_key: string;
  kind: string;
  value: string | null;
  image_url: string | null;
};

export type SiteContent = {
  /** Text value for `page.section.field`, or the fallback when empty/missing. */
  get(key: string, fallback: string): string;
  /** Image URL for `page.section.field`, or the fallback when empty/missing. */
  img(key: string, fallback: string): string;
};

function build(rows: ContentRow[]): SiteContent {
  const map = new Map<string, { value: string | null; image_url: string | null }>();
  for (const r of rows) {
    map.set(`${r.page}.${r.section_key}.${r.field_key}`, {
      value: r.value,
      image_url: r.image_url,
    });
  }
  return {
    get(key, fallback) {
      const v = map.get(key)?.value;
      return v && v.trim() ? v : fallback;
    },
    img(key, fallback) {
      const u = map.get(key)?.image_url;
      return u && u.trim() ? u : fallback;
    },
  };
}

/**
 * Fetch the editable website content. Always resolves — on any fetch/parse
 * failure it returns an empty overlay so every field uses its hardcoded default.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const res = await fetch(SITE_CONTENT_API, { next: { revalidate: 60 } });
    if (!res.ok) return build([]);
    const data = (await res.json()) as { content?: ContentRow[] };
    return build(Array.isArray(data.content) ? data.content : []);
  } catch {
    return build([]);
  }
}
