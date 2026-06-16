// Merge layer: the Bearing catalog is the source of truth for the menu, but the
// curated static data (data/sample-data.ts) is the fallback so the site never
// regresses. Per item, the portal wins where it has a value; otherwise the
// static value stays. Static-only items (e.g. salads not yet in the catalog)
// survive untouched, and portal-only NEW items get appended as their own card.
//
// Why a merge and not a cutover: the static menu carries curated structure the
// catalog doesn't model — soup/loaf SIZES, long-form descriptions, category
// ordering. A blind cutover would wipe those. As Reba fills the catalog in the
// portal, the merged menu improves automatically.
//
// HOW ITEMS ARE LINKED (the important part):
// We link each catalog item to its static counterpart by the catalog item's
// STABLE UUID (CATALOG_ID_TO_SLUG below), falling back to an exact normalized
// name match. Keying on the UUID — not the display name — means Reba can rename
// or pluralize an item in the portal ("Morning Muffin" → "Morning Muffins")
// without ever breaking the link. The previous version matched on name only, so
// a one-character difference (a trailing "s", a "& " vs "and") silently dropped
// the portal's description/photo edit AND rendered a duplicate card. That is the
// bug this file exists to kill.

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

// Durable links from a catalog item's STABLE UUID to its static menu slug.
// Only the genuine renames need an entry here — items whose portal name already
// matches the static name are linked automatically by name. Brand-new catalog
// items (e.g. extra burrito/sandwich varieties Reba added) intentionally have NO
// entry: they render as their own card. When you confirm a new rename pairing,
// add its UUID here so the link survives any future name change.
const CATALOG_ID_TO_SLUG: Record<string, string> = {
  // catalog "Cinnamon Donut Muffins" → static "Cinnamon Donut Muffin" (plural)
  "0cf18d08-8890-4e93-b18f-9361ce6d570b": "cinnamon-donut-muffins",
  // catalog "Morning Muffins" → static "Morning Muffin or Buckle"
  "b2a92b87-3ba1-4c6f-a4c9-bf70b5364835": "morning-glory-muffins",
  // catalog "Tuna Salad Sandwich" → static "Albacore Tuna Sandwich"
  "d6a6bc48-ebb0-4ad1-a8f5-d2df7cc9cc1e": "albacore-tuna",
};

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isSoup(c: CatalogItem): boolean {
  return c.category === "soup" || norm(c.name).startsWith("soup");
}

const EMOJI_BY_CATEGORY: Record<string, string> = {
  cookies: "🍪", bars: "🍫", breakfast: "🧁", burritos: "🌯",
  sandwiches: "🥪", salads: "🥗", soup: "🥣", pies: "🥧",
};

/**
 * Overlay the catalog onto the static menu. Pure + deterministic so it can be
 * unit-tested without a network call.
 */
export function mergeMenu(
  catalog: CatalogItem[],
  staticItems: MenuItem[] = STATIC_MENU,
): MergedMenuItem[] {
  const staticBySlug = new Map<string, MenuItem>();
  const slugByName = new Map<string, string>();
  for (const s of staticItems) {
    staticBySlug.set(s.id, s);
    slugByName.set(norm(s.name), s.id);
  }

  // Link each non-soup catalog item to a static slug. Two ordered passes so the
  // UUID alias is AUTHORITATIVE — independent of catalog arrival order:
  //   Pass A: lock every valid UUID alias to its slug first.
  //   Pass B: name-match the rest, over slugs not already claimed.
  // A single pass with `alias ?? name` would (1) let a name-match beat the
  // canonical aliased row if it arrived first, and (2) let a stale alias (one
  // pointing at a non-existent slug) swallow the name fallback entirely — both
  // re-introduce the silent-drop + duplicate-card bug. Splitting the passes and
  // treating the alias as a hint (fall through to name when it doesn't resolve)
  // closes both.
  const catalogForSlug = new Map<string, CatalogItem>();
  const usedCatalogIds = new Set<string>();
  let soupPhoto: string | null = null;

  const nonSoup: CatalogItem[] = [];
  for (const c of catalog) {
    if (isSoup(c)) {
      // Don't adopt a hidden soup item's photo onto the static soup card.
      if (!soupPhoto && c.image_url && c.available !== false) {
        soupPhoto = c.image_url;
      }
      continue;
    }
    nonSoup.push(c);
  }

  // Pass A — UUID aliases (authoritative, locked first).
  for (const c of nonSoup) {
    const slug = CATALOG_ID_TO_SLUG[c.id];
    if (slug && staticBySlug.has(slug) && !catalogForSlug.has(slug)) {
      catalogForSlug.set(slug, c);
      usedCatalogIds.add(c.id);
    }
  }

  // Pass B — exact normalized-name match for whatever the aliases didn't claim.
  for (const c of nonSoup) {
    if (usedCatalogIds.has(c.id)) continue;
    const slug = slugByName.get(norm(c.name));
    if (slug && staticBySlug.has(slug) && !catalogForSlug.has(slug)) {
      catalogForSlug.set(slug, c);
      usedCatalogIds.add(c.id);
    }
  }

  const merged: MergedMenuItem[] = [];

  // Pass 1: every static item in curated order, with the linked portal content
  // overlaid where present. Soup keeps its static size-rows and adopts a portal
  // photo if one was uploaded.
  for (const s of staticItems) {
    if (s.category === "soup") {
      merged.push(soupPhoto ? { ...s, imageUrl: soupPhoto } : { ...s });
      continue;
    }
    const c = catalogForSlug.get(s.id);
    if (c && c.available === false) {
      // Owner hid this item in the portal → drop its menu card entirely.
      // (Only present here when the API is fetched with ?visibility=all; without
      // it, hidden items are absent and this branch never fires.)
      continue;
    }
    if (c) {
      merged.push({
        ...s,
        description: c.description ?? s.description,
        price: c.price_cents != null ? c.price_cents / 100 : s.price,
        emoji: c.emoji ?? s.emoji,
        popular: c.popular ?? s.popular,
        imageUrl: c.image_url ?? undefined,
      });
    } else {
      // Static-only item (e.g. a salad not yet in the catalog) — keep as-is.
      merged.push({ ...s });
    }
  }

  // Pass 2: portal-only NEW items the static menu doesn't have (e.g. extra
  // burrito/sandwich varieties), in categories the page can render. These are
  // real items Reba added — render them visibly, not as sold-out phantoms.
  for (const c of catalog) {
    if (isSoup(c) || usedCatalogIds.has(c.id)) continue;
    if (c.available === false) continue; // owner hid it → don't add as a new card
    const category = c.category as MenuItem["category"];
    if (!KNOWN_CATEGORIES.has(category)) continue;
    merged.push({
      id: c.id,
      name: c.name,
      description: c.description ?? "",
      price: c.price_cents != null ? c.price_cents / 100 : 0,
      category,
      emoji: c.emoji ?? EMOJI_BY_CATEGORY[category] ?? "⭐",
      available: 1,
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
    // ?visibility=all returns items the owner hid (tagged available:false) so the
    // merge can drop their menu cards; without it the API omits them and hidden
    // items would still render via the static fallback.
    const url = `${CATALOG_API}${CATALOG_API.includes("?") ? "&" : "?"}visibility=all`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return STATIC_MENU.map((s) => ({ ...s }));
    const data = (await res.json()) as { items?: CatalogItem[] };
    const menuSection = (data.items ?? []).filter((i) => i.section === "menu");
    if (menuSection.length === 0) return STATIC_MENU.map((s) => ({ ...s }));
    return mergeMenu(menuSection);
  } catch {
    return STATIC_MENU.map((s) => ({ ...s }));
  }
}
