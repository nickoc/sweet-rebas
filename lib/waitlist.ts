// Shared client for submitting to the Bearing waitlist API from any form
// on the Sweet Reba's site. All forms route through one endpoint with
// different `source_context` tags so each form's signups are trivially
// filterable in the backend.

export const WAITLIST_API_URL =
  process.env.NEXT_PUBLIC_BEARING_API_URL?.replace(
    /\/?bearing-chat\/?$/,
    "/sweet-rebas/waitlist",
  ) || "https://getbearing.co/api/sweet-rebas/waitlist";

export type WaitlistPayload = {
  /** Optional free-text name */
  name?: string;
  /** Optional email — one of email or phone must be present */
  email?: string;
  /** Optional phone — one of email or phone must be present */
  phone?: string;
  /** Free-text body (message, inquiry description, event details) */
  notes?: string;
  /** Tags which form the signup came from (e.g. "newsletter-footer") */
  source_context: string;
  /**
   * True only when the user explicitly opted into marketing SMS. Phone
   * numbers captured for transactional callbacks (e.g. "Request a Call
   * Back") must leave this false so the row is NOT mirrored into the
   * A2P 10DLC sms_opt_ins list.
   */
  sms_consent?: boolean;
};

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitWaitlist(
  payload: WaitlistPayload,
): Promise<WaitlistResult> {
  try {
    const res = await fetch(WAITLIST_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, consent: true }),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return { ok: false, error: data.error || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
