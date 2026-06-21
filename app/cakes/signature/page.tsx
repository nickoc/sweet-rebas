// Server wrapper: resolve owner-editable copy from the site_content overlay
// (Bearing portal) with the current strings as fallbacks, then render the
// interactive client page. ?preview=1 fetches fresh for the editor iframe.

import { getSiteContent } from "@/lib/site-content";
import { getContactInfo } from "@/lib/contact-info";
import SignatureCakesPageClient from "./signature-client";

export default async function SignatureCakesPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const sc = await getSiteContent({ preview: isPreview });
  const contact = await getContactInfo({ preview: isPreview });
  return (
    <SignatureCakesPageClient
      contact={contact}
      copy={{
        heroHeading: sc.get("signature.hero.heading", "Signature Cakes"),
        heroSub: sc.get("signature.hero.sub", "Our most loved cakes, baked fresh for you."),
        callHeading: sc.get("signature.calltoorder.heading", "Call to Order Your Cake"),
        callLeadtime: sc.get(
          "signature.calltoorder.leadtime",
          "Please allow 48 hours for Signature Cake orders, or call to check availability in our store.",
        ),
        callDelivery: sc.get("signature.calltoorder.delivery", "We also deliver."),
        planOccasion: sc.get("signature.planning.occasion", "Planning for a Special Occasion?"),
        planWedding: sc.get("signature.planning.wedding", "Planning a Wedding?"),
        planEvent: sc.get("signature.planning.event", "Planning an Event?"),
      }}
    />
  );
}
