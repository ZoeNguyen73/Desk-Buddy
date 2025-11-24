class RandomJokeApi {
  #name;
  #url;
  #options;

  constructor() {
    this.#name = "Random Joke";
    this.#url = "https://icanhazdadjoke.com/";
    this.#options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "My project (https://github.com/ZoeNguyen73/Desk-Buddy)",
      }
    }
  }

  async getRandomJoke() {
    try {
      const response = await fetch(this.#url, this.#options);
      const data = await response.json();
      return data.joke;
    } catch(error) {
      console.log(`${error}`);
    };
  }
}

class RandomMemeApi {
  #name;
  #url;
  #options;
  memes = [];

  constructor() {
    this.#name = "Random Meme";

    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

    this.#url = isLocal
      ? "http://localhost:8888/.netlify/functions/humor-api"
      : "https://desk-buddy.netlify.app/.netlify/functions/humor-api";

    this.#options = {
      method: "GET",
    };
  }

  async init() {
    try {
      const response = await fetch(this.#url);
      const data = await response.json();

      this.memes = [...data];
      localStorage.setItem("memes", JSON.stringify(this.memes));
      console.log("Memes loaded:", this.memes.length);
    } catch (error) {
      console.error("Failed to fetch memes:", error);
      this.memes = JSON.parse(localStorage.getItem("memes")) || [];
    }
  }

  async getRandomMeme() {
    try {

      // if the current memes list is empty, init first to populate new list
      if (!this.memes || this.memes.length === 0) {
        await this.init();

        // fail safe: if init fails => stop the potential infinite loop
        if (!this.memes || this.memes.length === 0) {
          throw new Error("No memes available");
        }
      } 
      
      const index = Math.floor(Math.random() * this.memes.length);
      const [meme] = this.memes.splice(index, 1);

      // keep localStorage in sync
      localStorage.setItem("memes", JSON.stringify(this.memes));

      return meme; 

    } catch(error) {
      console.log(`${error}`);
      return null;
    };
  }
}

class QuotesApi {
  #name;
  #url;
  quotes;

  constructor() {
    this.#name = "Random Quotes";
    this.#url = "https://corsproxy.io/?https://zenquotes.io/api/quotes";
    this.quotes = [];
    // this.#populateQuotes();
  }

  async init() {
    try {
      const response = await fetch(this.#url);
      const data = await response.json();

      this.quotes = data.map(q => `"${q.q}" - ${q.a}`);
      localStorage.setItem("quotes", JSON.stringify(this.quotes));
      console.log("Quotes loaded:", this.quotes.length);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
      this.quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    }
  }

  getRandomQuote() {
    if (this.quotes.length === 0) return "Loading quotes...";
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }
}

export const quotesApi = new QuotesApi();
export const randomJokeApi = new RandomJokeApi();
export const randomMemeApi = new RandomMemeApi();