export async function handler(event, context) {
  const HUMOR_API_KEY = process.env.HUMOR_API_KEY;
  const url = "https://api.humorapi.com/memes/random";

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": HUMOR_API_KEY,
      },
    });
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error("Error fetching meme:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Failed to fetch meme" }),
    };
  }
}