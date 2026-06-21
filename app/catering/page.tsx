// Server wrapper: resolve owner-editable copy from the site_content overlay
// (Bearing portal) with the current strings as fallbacks, then render the
// interactive client form. ?preview=1 fetches fresh for the editor iframe.

import { getSiteContent } from "@/lib/site-content";
import { getContactInfo } from "@/lib/contact-info";
import { getGallery } from "@/lib/galleries";
import CateringPageClient from "./catering-client";

export default async function CateringPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const sc = await getSiteContent({ preview: isPreview });
  const contact = await getContactInfo({ preview: isPreview });
  const gallery = await getGallery("catering.gallery", { preview: isPreview });
  return (
    <CateringPageClient
      contact={contact}
      gallery={gallery}
      copy={{
        heading: sc.get("catering.main.heading", "Feeding a Crowd?"),
        callHeading: sc.get("catering.main.call_heading", "Call Us"),
        callBody: sc.get(
          "catering.main.call_body",
          "Interested in catering for your next event? Give us a call and we'll put something special together for you.",
        ),
        formPrompt: sc.get(
          "catering.main.form_prompt",
          "Or tell us about your event and we'll reach out",
        ),
      }}
    />
  );
}
