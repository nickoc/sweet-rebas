import { getSiteContent } from "@/lib/site-content";

/**
 * Owner-editable contact details, shared across the footer, contact page, and
 * the cake/wedding/catering call-to-order blocks. Each field is a plain string
 * so a portal edit (an arbitrary string) is assignable — do not narrow these to
 * literal types.
 */
export type ContactInfo = {
  carmelAddress: string;
  carmelPhone: string;
  carmelStatus: string;
  carmelReopeningNote: string;
  salinasAddress: string;
  salinasPhone: string;
  instagram: string;
  doordash: string;
  email: string;
};

export const CONTACT_FALLBACK: ContactInfo = {
  carmelAddress: "206 Crossroads Blvd",
  carmelPhone: "(831) 601-4818",
  carmelStatus: "Re-opening late June 2026",
  carmelReopeningNote:
    "Reopening in late June 2026. We can't wait to see you back at Crossroads!",
  salinasAddress: "268 S Main St",
  salinasPhone: "(831) 676-0628",
  instagram: "sweetrebas",
  doordash:
    "https://www.doordash.com/store/sweet-rebas-salinas-40954727/97268547/?srsltid=AfmBOopv3nAXQdH-_n6RfHiBu3WfDdYdxUyIU3WBPPv_7o5U_C8PecyU",
  email: "reba@sweetrebas.com",
};

export async function getContactInfo(opts?: {
  preview?: boolean;
}): Promise<ContactInfo> {
  const sc = await getSiteContent(opts);
  return {
    carmelAddress: sc.get(
      "contact.carmel.address",
      CONTACT_FALLBACK.carmelAddress,
    ),
    carmelPhone: sc.get("contact.carmel.phone", CONTACT_FALLBACK.carmelPhone),
    carmelStatus: sc.get(
      "contact.carmel.status",
      CONTACT_FALLBACK.carmelStatus,
    ),
    carmelReopeningNote: sc.get(
      "contact.carmel.reopening_note",
      CONTACT_FALLBACK.carmelReopeningNote,
    ),
    salinasAddress: sc.get(
      "contact.salinas.address",
      CONTACT_FALLBACK.salinasAddress,
    ),
    salinasPhone: sc.get(
      "contact.salinas.phone",
      CONTACT_FALLBACK.salinasPhone,
    ),
    instagram: sc.get("contact.social.instagram", CONTACT_FALLBACK.instagram),
    doordash: sc.get("contact.links.doordash", CONTACT_FALLBACK.doordash),
    email: sc.get("contact.general.email", CONTACT_FALLBACK.email),
  };
}
