// Same-origin endpoint so the (client-rendered) wedding-cakes page can read the
// wedding starting price from the Bearing catalog without a cross-origin fetch.
// The page renders "$150" first as a fallback, then overlays this.
import { getWeddingStartPrice } from "@/lib/menu-catalog";

export const revalidate = 60;

export async function GET() {
  return Response.json({ price: await getWeddingStartPrice() });
}
