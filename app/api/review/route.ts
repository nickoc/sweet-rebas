const BEARING_API_URL = process.env.BEARING_API_URL || "https://lighthouseos.xyz";
const BEARING_API_KEY = process.env.BEARING_API_KEY || "";
const CLIENT_ID = "sweet-rebas";

export async function POST(request: Request) {
  try {
    const { reviewerName, rating, reviewText, platform } = await request.json();

    if (!reviewText) {
      return Response.json({ error: "Review text is required" }, { status: 400 });
    }

    const res = await fetch(`${BEARING_API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": BEARING_API_KEY,
      },
      body: JSON.stringify({ reviewerName, rating, reviewText, platform, clientId: CLIENT_ID }),
    });

    const data = await res.json();
    return Response.json({ response: data.response || data.error || "Sorry, please try again." });
  } catch (error) {
    console.error("Review API error:", error);
    return Response.json({ error: "Failed to generate review response" }, { status: 500 });
  }
}
