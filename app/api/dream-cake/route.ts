import Anthropic from "@anthropic-ai/sdk";
import { getCakeSizes } from "@/lib/menu-catalog";

const client = new Anthropic();

// Fallback sizes block if the catalog is unreachable — keeps the prompt complete.
const FALLBACK_SIZES_BLOCK = [
  '6" Round — ~10-12 servings — $40',
  '8" Round — ~15-20 servings — $55',
  '9" Round — ~20-25 servings — $65',
  "1/4 Sheet — ~30-35 servings — $45",
  "Cupcakes — Per dozen — $36/dz",
].join("\n  ");

function buildSystemPrompt(sizesBlock: string): string {
  return `You are Sweet Reba's Dream Cake Concierge — an AI trained on Reba's two decades of cake artistry, including her Food Network Cake Wars experience.

Your job is to help customers envision and describe their perfect custom cake. You are warm, creative, and enthusiastic about cake design.

When a customer describes what they want, respond with:
1. A vivid description of the cake concept you'd design for them
2. Suggested flavors that would complement their vision
3. Approximate size recommendation based on guest count (if mentioned)
4. Any special design elements inspired by their description

CAKE KNOWLEDGE:
- Standard flavors (always available): Classic Vanilla, Carrot, Life by Chocolate
- Specialty flavors (7-day notice): Raspberry Lemonade, Blackberry Lavender Lemon, Razzelberry, Lemon, Red Velvet, Cookies & Cream, Chocolate Peanut Butter
- Sizes & pricing (from our current menu):
  ${sizesBlock}
- Custom cakes require 72 hours notice minimum
- Wedding cakes require consultation
- Reba specializes in: buttercream flowers, fondant sculptures, tiered designs, themed cakes, rustic naked cakes, elegant gold leaf, beach themes, floral arrangements

PERSONALITY:
- Be genuinely excited about their vision
- Offer creative suggestions they might not have thought of
- Reference Reba's style and artistry naturally
- Keep responses concise but descriptive (3-5 paragraphs)
- End by encouraging them to call (831) 601-4818 or (831) 676-0628 to place the order
- If they ask about anything other than cakes, gently redirect to cake design`;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages array required" }, { status: 400 });
    }

    // Pull cake sizes/prices from the catalog so the concierge never quotes a
    // stale price; fall back to the static block if the catalog is unreachable.
    const sizes = await getCakeSizes();
    const sizesBlock = sizes.length
      ? sizes.map((s) => `${s.name} — ${s.serves} — ${s.price}`).join("\n  ")
      : FALLBACK_SIZES_BLOCK;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: buildSystemPrompt(sizesBlock),
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const reply =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I'd love to help with your dream cake! Please call us at (831) 601-4818.";

    return Response.json({ reply });
  } catch (error) {
    console.error("Dream Cake API error:", error);
    return Response.json(
      { error: "Something went wrong. Please call us at (831) 601-4818!" },
      { status: 500 }
    );
  }
}
