// Owner-editable structured lists ("collections") from the Bearing portal.
// Mirrors lib/galleries.ts (same API base + ISR cache + fail-safe-to-empty).
// Each collection is a list of items the owner manages (press articles,
// testimonials, videos). The page falls back to its hardcoded content when
// this returns []. One item carries several typed `fields` plus an optional image.

const COLLECTIONS_API =
  process.env.NEXT_PUBLIC_BEARING_API_URL?.replace(
    "/api/bearing-chat",
    "/api/collections/sweet-rebas",
  ) || "https://getbearing.co/api/collections/sweet-rebas";

export type CollectionItem = {
  id: string;
  fields: Record<string, string>;
  image_url: string | null;
  sort_order: number;
};

type Row = {
  id: string;
  fields?: Record<string, unknown> | null;
  image_url?: string | null;
  sort_order?: number | null;
};

/**
 * Fetch one collection's items in sort order. Returns [] on any failure/empty so
 * the caller uses its hardcoded fallback. Preview mode fetches fresh (no cache).
 * Field values are coerced to strings for safe rendering.
 */
export async function getCollection(
  key: string,
  opts?: { preview?: boolean },
): Promise<CollectionItem[]> {
  try {
    const res = await fetch(
      COLLECTIONS_API,
      opts?.preview ? { cache: "no-store" } : { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as {
      collections?: Record<string, Row[]>;
    };
    const rows = data.collections?.[key] ?? [];
    return rows.map((r) => {
      const fields: Record<string, string> = {};
      for (const [k, v] of Object.entries(r.fields ?? {})) {
        fields[k] = v == null ? "" : String(v);
      }
      return {
        id: r.id,
        fields,
        image_url: r.image_url ?? null,
        sort_order: r.sort_order ?? 0,
      };
    });
  } catch {
    return [];
  }
}
