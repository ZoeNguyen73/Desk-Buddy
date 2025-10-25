export async function handler(event, context) {
  const HUMOR_API_KEY = process.env.HUMOR_API_KEY;
  const url = "https://api.humorapi.com/memes/random";

  const memeAPIurl = "https://meme-api.com/gimme"; 

  try {
    const humorAPIresponse = await fetch(url, {
      headers: {
        "x-api-key": HUMOR_API_KEY,
      },
    });
    let data = await humorAPIresponse.json();
    if (data.code === 402) {
      // back up logic:
      // when daily limit of humor api is reached, use the memeAPIurl instead
      let nsfw = true;
      while (nsfw) {
        const memeAPIresponse = await fetch(memeAPIurl);
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