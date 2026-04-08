const BEARING_API_URL = process.env.BEARING_API_URL || "https://lighthouseos.xyz";
const BEARING_API_KEY = process.env.BEARING_API_KEY || "";
const CLIENT_ID = "sweet-rebas";

export async function POST(request: Request) {
  try {
    const { topic, specials, notes } = await request.json();

    const res = await fetch(`${BEARING_API_URL}/api/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": BEARING_API_KEY,
      },
      body: JSON.stringify({
        weekOf: topic || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        specialNotes: [specials, notes].filter(Boolean).join(". "),
        clientId: CLIENT_ID,
      }),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Failed to generate newsletter" }, { status: 500 });
  }
}
