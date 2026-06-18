// Same-origin endpoint so the (client-rendered) cakes pages can read cake
// sizes/prices from the Bearing catalog without a cross-origin fetch. The page
// renders its static defaults first, then overlays this — identical values
// today, so no visual change; editable from the portal going forward.
import { getCakeSizes } from "@/lib/menu-catalog";

export const revalidate = 60;

export async function GET() {
  const sizes = await getCakeSizes();
  return Response.json({ sizes });
}
