// Server wrapper: fetch the merged menu (Bearing catalog overlaid on the
// curated static fallback) and hand it to the client renderer. ISR keeps it
// fresh within ~a minute of a portal edit without a redeploy.

import { getMenuItems } from "@/lib/menu-catalog";
import MenuClient from "./menu-client";

export const revalidate = 60;

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuClient items={items} />;
}
