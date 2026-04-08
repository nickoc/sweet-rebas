const BEARING_API_URL = process.env.BEARING_API_URL || "https://lighthouseos.xyz";
const BEARING_API_KEY = process.env.BEARING_API_KEY || "";
const CLIENT_ID = "sweet-rebas";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages array required" }, { status: 400 });
    }

    const res = await fetch(`${BEARING_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": BEARING_API_KEY,
      },
      body: JSON.stringify({ messages, clientId: CLIENT_ID }),
    });

    const data = await res.json();

    return Response.json({ reply: data.message || data.error || "Sorry, please try again." });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Something went wrong. Please call us at (831) 676-0628!" },
      { status: 500 }
    );
  }
}
