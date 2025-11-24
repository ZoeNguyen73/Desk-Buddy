exports.handler = async (event, context) => {

  const memeAPIurl = "https://meme-api.com/gimme/";
  const memeAPIsubs = [
    "wholesomememes",
    "Funnymemes",
    "dechonkers",
    "scrungycats",
    "Catswithjobs",
    "DisneyEyes",
    "FunnyAnimals",
  ];

  try {

    const fetchPromises = memeAPIsubs.map(async (sub) => {
      const url = `${memeAPIurl}${sub}/30`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();

        // fail-safe
        if (!data || !Array.isArray(data.memes)) {
          console.warn(`Skipping ${sub}: invalid response`);
          return []; // return empty list
        }

        return data.memes
          .filter((m) => !m.nsfw)
          .map((m) => ({
            source: `meme from r/${sub}`,
            url: m.url,
          }));

      } catch (error) {
        console.error(`Failed fetching subreddit ${sub}:`, error);
        return []; // return empty list to prevent Promise.all from rejecting
      }
    });

    const allResults = await Promise.all(fetchPromises);
    const memeList = allResults.flat();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(memeList),
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
};