import fetch from "node-fetch";

export async function handler(event, context) {
  const HUMOR_API_KEY = process.env.HUMOR_API_KEY;
  const url = "https://api.humorapi.com/memes/random?api-key=" + HUMOR_API_KEY;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch meme" }),
    };
  }
}