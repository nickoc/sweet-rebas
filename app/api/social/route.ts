import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are the social media content creator for Sweet Reba's Bakery, a beloved artisan bakery on California's Monterey Peninsula.

BRAND VOICE:
- Warm, homemade, community-focused
- Monterey Peninsula local pride
- Like a neighbor sharing good news about fresh-baked treats
- Genuine and heartfelt, never corporate or salesy
- Celebrate the craft of scratch baking

LOCATIONS:
- Carmel Crossroads (206 Crossroads Blvd) — TEMPORARILY CLOSED for fire repairs
- Salinas (268 Main St) — OPEN, our currently operating location
- Phone: (831) 676-0628 (Salinas), (831) 601-4818 (Carmel)

HASHTAGS TO INCLUDE:
#SweetRebas #CarmelBakery #SalinasBakery #MontereyPeninsula #HomemadeWithLove #ArtisanBakery

OUTPUT FORMAT — respond with ONLY valid JSON, no markdown:
{
  "instagram": {
    "caption": "Instagram caption text with hashtags",
    "imagePrompt": "Detailed image generation prompt for a photo-realistic bakery image"
  },
  "facebook": {
    "post": "Facebook post text, slightly longer and more conversational than Instagram",
    "imagePrompt": "Detailed image generation prompt for a warm, inviting bakery image"
  }
}

GUIDELINES:
- Instagram: punchy, visual, hashtag-rich (8-12 hashtags)
- Facebook: conversational, community-oriented, can be longer
- Image prompts: describe warm lighting, rustic bakery aesthetic, close-up food photography style
- Always mention the Salinas location as the active one
- Reference seasonal ingredients and homemade quality`;

export async function POST(request: Request) {
  try {
    const { title, description, date } = await request.json();

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const userMessage = `Create social media content for this event/product:

Title: ${title}
Description: ${description || "No additional details"}
Date: ${date || "Upcoming"}`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = JSON.parse(text);

    return Response.json(parsed);
  } catch (error) {
    console.error("Social API error:", error);
    return Response.json({ error: "Failed to generate social content" }, { status: 500 });
  }
}
