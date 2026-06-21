// Server wrapper: resolve owner-editable copy from the site_content overlay
// (Bearing portal) with the current strings as fallbacks, then render the
// interactive client page. ?preview=1 fetches fresh for the editor iframe.

import { getSiteContent } from "@/lib/site-content";
import { getContactInfo } from "@/lib/contact-info";
import { getGallery } from "@/lib/galleries";
import CakesPageClient from "./cakes-client";

export default async function CakesPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const sc = await getSiteContent({ preview: isPreview });
  const contact = await getContactInfo({ preview: isPreview });
  const favoriteGallery = await getGallery("cakes.favorites", {
    preview: isPreview,
  });
  return (
    <CakesPageClient
      contact={contact}
      favoriteGallery={favoriteGallery}
      copy={{
        heroHeading: sc.get("cakes.hero.heading", "Custom Cakes"),
        heroSub1: sc.get("cakes.hero.sub1", "As seen on Food Network's Cake Wars."),
        heroSub2: sc.get(
          "cakes.hero.sub2",
          "Every cake is a custom work of art, designed and baked with love.",
        ),
        favoriteHeading: sc.get("cakes.favorite.heading", "Favorite Thing"),
        favoriteSub: sc.get("cakes.favorite.sub", "The ones everyone asks about"),
        specialHeading: sc.get("cakes.special.heading", "Special Occasion"),
        specialSub: sc.get(
          "cakes.special.sub",
          "Weddings, milestones, and celebrations worth remembering",
        ),
        orderHeading: sc.get("cakes.order.heading", "Start Your Order"),
        orderSub: sc.get(
          "cakes.order.sub",
          "Order online below, give us a call, or chat with us — whatever's easiest for you.",
        ),
        callLine1: sc.get("cakes.calltoorder.line1", "Call to Order"),
        callLine2: sc.get("cakes.calltoorder.line2", "Your Custom Cake"),
        callLeadtime: sc.get(
          "cakes.calltoorder.leadtime",
          "Please allow 7 days for custom cake orders.",
        ),
        planFast: sc.get("cakes.planning.fast", "Need a Cake Fast?"),
        planWedding: sc.get("cakes.planning.wedding", "Planning a Wedding?"),
        planEvent: sc.get("cakes.planning.event", "Planning an Event?"),
      }}
    />
  );
}
