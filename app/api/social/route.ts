const BEARING_API_URL = process.env.BEARING_API_URL || "https://lighthouseos.xyz";
const BEARING_API_KEY = process.env.BEARING_API_KEY || "";
const CLIENT_ID = "sweet-rebas";

export async function POST(request: Request) {
  try {
    const { title, description, date, time } = await request.json();

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const res = await fetch(`${BEARING_API_URL}/api/social`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": BEARING_API_KEY,
      },
      body: JSON.stringify({
        eventTitle: title,
        eventDescription: description,
        eventDate: date,
        eventTime: time,
        clientId: CLIENT_ID,
      }),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Social API error:", error);
    return Response.json({ error: "Failed to generate social content" }, { status: 500 });
  }
}
