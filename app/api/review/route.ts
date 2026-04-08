import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are drafting review responses for Sweet Reba's Bakery, a beloved artisan bakery on California's Monterey Peninsula.

RESPONSE GUIDELINES:
- Respond as the owner/team of Sweet Reba's — warm, genuine, and personal
- Reference specific items the reviewer mentioned
- Express authentic gratitude
- For positive reviews: thank them warmly, mention what makes that item special
- For constructive reviews: acknowledge the feedback graciously, explain what you're doing about it
- Invite them back — mention a specific item they might enjoy next time
- If relevant, mention the other location (Carmel temporarily closed, Salinas open)
- Keep responses 2-4 sentences, conversational

SIGN OFF: End with either "— The Sweet Reba's Family" or "— Reba & Michael"

LOCATIONS:
- Carmel Crossroads (206 Crossroads Blvd) — TEMPORARILY CLOSED for fire repairs
- Salinas (268 Main St) — OPEN
- DoorDash available at Salinas

TONE: Like writing a thank-you note to a neighbor, not a corporate template response.`;

export async function POST(request: Request) {
  try {
    const { reviewerName, rating, reviewText, platform } = await request.json();

    if (!reviewText) {
      return Response.json({ error: "Review text is required" }, { status: 400 });
    }

    const userMessage = `Draft a response to this ${platform || "online"} review:

Reviewer: ${reviewerName || "A customer"}
Rating: ${rating || "N/A"}/5
Review: "${reviewText}"`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ response: reply });
  } catch (error) {
    console.error("Review API error:", error);
    return Response.json({ error: "Failed to generate review response" }, { status: 500 });
  }
}
