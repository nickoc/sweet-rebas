// Owner-editable photo galleries from the Bearing portal. Mirrors lib/site-content.ts
// (same API base + ISR cache + fail-safe-to-empty). Each gallery is a list the
// owner manages; the page falls back to its hardcoded images when this returns [].

const GALLERIES_API =
  process.env.NEXT_PUBLIC_BEARING_API_URL?.replace(
    "/api/bearing-chat",
    "/api/galleries/sweet-rebas",
  ) || "https://getbearing.co/api/galleries/sweet-rebas";

export type GalleryImage = { src: string; alt: string };

type Row = { image_url: string; caption: string | null };

/**
 * Fetch one gallery's photos as {src, alt}. Returns [] on any failure/empty so
 * the caller uses its hardcoded fallback. Preview mode fetches fresh (no cache).
 */
export async function getGallery(
  key: string,
  opts?: { preview?: boolean },
): Promise<GalleryImage[]> {
  try {
    const res = await fetch(
      GALLERIES_API,
      opts?.preview ? { cache: "no-store" } : { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { galleries?: Record<string, Row[]> };
    const rows = data.galleries?.[key] ?? [];
    return rows
      .filter((r) => r.image_url)
      .map((r) => ({ src: r.image_url, alt: r.caption ?? "" }));
  } catch {
    return [];
  }
}
