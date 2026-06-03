// Merge layer: the Bearing catalog is the source of truth for the menu, but the
// curated static data (data/sample-data.ts) is the fallback so the site never
// regresses. Per item, the portal wins where it has a value; otherwise the
// static value stays. Static-only items (e.g. salads, not yet in the catalog)
// survive untouched, and portal-only new items get appended.
//
// Why a merge and not a cutover: today the catalog is missing salads, has no
// photo on ~97% of items, and models soup as three size-rows. A blind cutover
// would wipe those from the live menu. As Reba fills the catalog in the portal,
// the merged menu improves automatically.

import { menuItems as STATIC_MENU, type MenuItem } from "@/data/sample-data";

// MenuItem plus an optional catalog-hosted photo URL (absolute Supabase URL).
// The page prefers this over its local productImages map.
export type MergedMenuItem = MenuItem & { imageUrl?: string };

const CATALOG_API =
  process.env.NEXT_PUBLIC_BEARING_API_URL?.replace(
    "/api/bearing-chat",
    "/api/catalog/sweet-rebas",
  ) || "https://getbearing.co/api/catalog/sweet-rebas";

type CatalogItem = {
  id: string;
  section: string;
  category: string;
  name: string;
  description: string | null;
  price_cents: number | null;
  price_label: string | null;
  available: boolean;
  popular: boolean;
  sort_order: number;
  emoji: string | null;
  image_url: string | null;
};

const KNOWN_CATEGORIES: ReadonlySet<MenuItem["category"]> = new Set([
  "cookies", "bars", "breakfast", "burritos", "sandwiches", "salads", "soup", "pies",
]);

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isSoup(c: CatalogItem): boolean {
  return c.category === "soup" || norm(c.name).startsWith("soup");
}

/**
 * Overlay the catalog onto the static menu. Pure + deterministic so it can be
 * unit-tested without a network call.
 */
export function mergeMenu(
  catalog: CatalogItem[],
  staticItems: MenuItem[] = STATIC_MENU,
): MergedMenuItem[] {
  // Index non-soup catalog items by normalized name; capture the first soup
  // photo to attach to the canonical static soup item.
  const catByName = new Map<string, CatalogItem>();
  let soupPhoto: string | null = null;
  for (const c of catalog) {
    if (isSoup(c)) {
      if (!soupPhoto && c.image_url) soupPhoto = c.image_url;
      continue;
    }
    catByName.set(norm(c.name), c);
  }

  const usedKeys = new Set<string>();
  const merged: MergedMenuItem[] = [];

  for (const s of staticItems) {
    // Soup: keep the static item-with-sizes; adopt the portal photo if uploaded.
    if (s.category === "soup") {
      merged.push(soupPhoto ? { ...s, imageUrl: soupPhoto } : { ...s });
      continue;
    }
    const key = norm(s.name);
    const c = catByName.get(key);
    if (c) {
      usedKeys.add(key);
      merged.push({
        ...s,
        description: c.description ?? s.description,
        price: c.price_cents != null ? c.price_cents / 100 : s.price,
        emoji: c.emoji ?? s.emoji,
        popular: c.popular ?? s.popular,
        imageUrl: c.image_url ?? undefined,
      });
    } else {
      // Static-only item (e.g. the salads, not yet in the catalog) — keep as-is.
      merged.push({ ...s });
    }
  }

  // Portal-only NEW items the static menu doesn't have, in categories the page
  // can render. (The public API already filters to available=true.)
  for (const c of catalog) {
    if (isSoup(c)) continue;
    const key = norm(c.name);
    if (usedKeys.has(key)) continue;
    const category = c.category as MenuItem["category"];
    if (!KNOWN_CATEGORIES.has(category)) continue;
    merged.push({
      id: c.id,
      name: c.name,
      description: c.description ?? "",
      price: c.price_cents != null ? c.price_cents / 100 : 0,
      category,
      emoji: c.emoji ?? "⭐",
      available: 0,
      popular: c.popular ?? false,
      imageUrl: c.image_url ?? undefined,
    });
  }

  return merged;
}

/**
 * Fetch the catalog and return the merged menu. On ANY failure, fall back to
 * the full static menu — the page must never crash or render empty.
 */
export async function getMenuItems(): Promise<MergedMenuItem[]> {
  try {
    const res = await fetch(CATALOG_API, { next: { revalidate: 60 } });
    if (!res.ok) return STATIC_MENU.map((s) => ({ ...s }));
    const data = (await res.json()) as { items?: CatalogItem[] };
    const menuSection = (data.items ?? []).filter((i) => i.section === "menu");
    if (menuSection.length === 0) return STATIC_MENU.map((s) => ({ ...s }));
    return mergeMenu(menuSection);
  } catch {
    return STATIC_MENU.map((s) => ({ ...s }));
  }
}
