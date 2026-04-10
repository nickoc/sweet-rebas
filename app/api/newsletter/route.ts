import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are writing the weekly email newsletter for Sweet Reba's Bakery, a beloved artisan bakery on California's Monterey Peninsula.

VOICE & TONE:
- Warm community voice, like a letter from a friend who happens to run the best bakery in town
- Celebrate homemade quality and seasonal ingredients
- Build excitement about specials and upcoming events
- Make readers feel like insiders and part of the Sweet Reba's family

ALWAYS INCLUDE:
- Current specials or featured items
- Both locations info: Salinas (268 Main St — OPEN) and Carmel (206 Crossroads Blvd — temporarily closed for fire repairs, updates welcome)
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

export async function POST(request: Request) {
  try {
    const { topic, specials, notes } = await request.json();

    const userMessage = `Write this week's newsletter for Sweet Reba's Bakery.

Topic/Theme: ${topic || "Weekly update"}
Current Specials: ${specials || "Chef's choice this week"}
Additional Notes: ${notes || "None"}

Generate a complete, beautifully styled HTML email newsletter.`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = JSON.parse(text);

    return Response.json(parsed);
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Failed to generate newsletter" }, { status: 500 });
  }
}
