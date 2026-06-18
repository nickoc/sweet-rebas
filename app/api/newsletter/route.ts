import Anthropic from "@anthropic-ai/sdk";

import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are writing the email newsletter for Sweet Reba's Bakery, a beloved bakery on California's Monterey Peninsula.

VOICE & TONE:
- Warm community voice, like a letter from a friend who happens to run the best bakery in town
- Celebrate homemade quality and seasonal ingredients
- Build excitement about specials and upcoming events
- Make readers feel like insiders and part of the Sweet Reba's family

ALWAYS INCLUDE:
- Current specials or featured items
- Both locations info: Salinas (268 S Main St — OPEN) and Carmel (206 Crossroads Blvd — temporarily closed for renovations, updates welcome)
- Pre-order reminders for pies (7-day advance, call 831-676-0628)
- A personal touch — reference the season, local events, or community connection

OUTPUT FORMAT — respond with ONLY valid JSON, no markdown:
{
  "subject": "Email subject line (compelling, 40-60 chars)",
  "html": "Complete inline-styled HTML email"
}

HTML EMAIL STYLING:
- Background: #1a1015
- Card backgrounds: #251a1f
- Accent/buttons: #cb3d81
- Text color: #fef7f0
- Muted text: #9a8a80
- Font: Arial, sans-serif
- Max width: 600px, centered
- Use inline styles only (email client compatibility)
- Include a header with bakery name, sections for specials/news/locations, and a footer
- Make it beautiful and on-brand`;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function isStringUnder500(value: unknown): value is string {
  return typeof value === "string" && value.length <= 500;
}

export async function POST(request: Request) {
  try {
    // Body-size cap. Reject on missing/unparseable Content-Length too — an
    // attacker controls whether to send the header, and a permissive fallback
    // would let chunked / header-stripped requests bypass the cap entirely.
    const contentLengthHeader = request.headers.get("content-length");
    const contentLength = Number.parseInt(contentLengthHeader ?? "", 10);
    if (!Number.isFinite(contentLength) || contentLength < 0) {
      return Response.json(
        { error: "Length required" },
        { status: 411 },
      );
    }
    if (contentLength > 10_000) {
      return new Response(null, { status: 413 });
    }

    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`newsletter:${ip}`, {
      maxRequests: 5,
      windowMs: 60_000,
    });

    if (!allowed) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }

    // Only enforce bearer auth when the shared secret is configured.
    if (process.env.NEWSLETTER_API_KEY) {
      const authorization = request.headers.get("authorization");

      if (authorization !== `Bearer ${process.env.NEWSLETTER_API_KEY}`) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body: unknown = await request.json();

    if (!isPlainObject(body)) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { topic, specials, notes } = body;

    if (
      (topic !== undefined && !isStringUnder500(topic)) ||
      (specials !== undefined && !isStringUnder500(specials)) ||
      (notes !== undefined && !isStringUnder500(notes))
    ) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const userMessage = `Write the next newsletter for Sweet Reba's Bakery.

Topic/Theme: ${topic || "Update"}
Current Specials: ${specials || "Chef's choice"}
Additional Notes: ${notes || "None"}

Generate a complete, beautifully styled HTML email newsletter.`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Return 502 for invalid model JSON so it is distinguishable from runtime failures.
    try {
      const parsed = JSON.parse(text);
      return Response.json(parsed);
    } catch {
      return Response.json({ error: "Upstream generation invalid" }, { status: 502 });
    }
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Failed to generate newsletter" }, { status: 500 });
  }
}
