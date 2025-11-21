export async function handler(event, context) {
  const HUMOR_API_KEY = process.env.HUMOR_API_KEY;
  const url = "https://api.humorapi.com/memes/random?min-rating=7";

  const memeAPIurl = "https://meme-api.com/gimme/";
  const memeAPIsubs = [
    "wholesomememes",
    "MadeMeSmile",
    "AnimalsBeingBros",
    "aww",
    " wholesomecartoons",
  ]; 

  try {
    const humorAPIresponse = await fetch(url, {
      headers: {
        "x-api-key": HUMOR_API_KEY,
      },
    });
    let data = await humorAPIresponse.json();
    console.log("fetching meme from humorAPI");
    if (data.code === 402) {
      // back up logic:
      // when daily limit of humor api is reached, use the memeAPIurl instead
      const sub = memeAPIsubs[Math.floor(Math.random() * memeAPIsubs.length)];
      const url = memeAPIurl + sub;
      let nsfw = true;
      while (nsfw) {
        console.log("fetching meme from memeAPI at subreddit: " + sub);
        const memeAPIresponse = await fetch(url);
        data = await memeAPIresponse.json();
        nsfw = data.nsfw;
      }

      return {
        statusCode: 200,
        source: "memeAPI",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(data),
      };
      
    } else {
      return {
        statusCode: 200,
        source: "humorAPI",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(data),
      };
    }

    

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