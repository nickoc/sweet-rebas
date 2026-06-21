// Server wrapper: resolve owner-editable copy from the site_content overlay
// (Bearing portal) with the current strings as fallbacks, then render the
// interactive client page. ?preview=1 fetches fresh for the editor iframe.

import { getSiteContent } from "@/lib/site-content";
import { getContactInfo } from "@/lib/contact-info";
import WeddingCakesPageClient from "./wedding-client";

export default async function WeddingCakesPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const sc = await getSiteContent({ preview: isPreview });
  const contact = await getContactInfo({ preview: isPreview });
  return (
    <WeddingCakesPageClient
      contact={contact}
      copy={{
        heroHeading: sc.get("wedding.hero.heading", "Wedding Cakes"),
        heroSub: sc.get("wedding.hero.sub", "Your love story, beautifully told in cake"),
        detailHeading: sc.get("wedding.detail.heading", "Reba's Attention to Detail"),
        detailSub: sc.get("wedding.detail.sub", "A few of our favorite creations"),
        galleryHeading: sc.get("wedding.gallery.heading", "Wedding Cakes"),
        gallerySub: sc.get("wedding.gallery.sub", "Timeless elegance in every tier"),
        introLine1: sc.get(
          "wedding.intro.line1",
          "Your wedding cake should be as extraordinary as your love story.",
        ),
        introLine2: sc.get(
          "wedding.intro.line2",
          "Reba works personally with every couple to design a centerpiece that's as beautiful as it is delicious. Multi-tier designs, custom flavors, tasting sessions — every detail is crafted just for you.",
        ),
        consultHeading: sc.get("wedding.consult.heading", "Schedule Your Consultation with Reba"),
        pricingHeading: sc.get("wedding.pricing.heading", "Wedding Cake Pricing"),
        pricingLine1: sc.get(
          "wedding.pricing.line1",
          "Custom consultation required for all wedding cakes.",
        ),
        pricingLine3: sc.get("wedding.pricing.line3", "Tasting sessions available."),
      }}
    />
  );
}
