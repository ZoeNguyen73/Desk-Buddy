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

  constructor() {
    this.#name = "Random Meme";
    this.#url = "https://meme-api.com/gimme";
    this.#options = {
      method: "GET",
    }
  }

  async getRandomMemeUrl() {
    try {
      let nsfw = true;
      let data = null;
      while (nsfw) {
        const response = await fetch(this.#url, this.#options);
        data = await response.json()
        nsfw = data.nsfw;
      }
      return data.url;
    } catch(error) {
      console.log(`${error}`);
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
  
  // async #storeQuotesInLocalStorage() {
  //   try {
  //     const response = await fetch(this.#url);
  //     const data = await response.json();
  //     localStorage.setItem("quotes", JSON.stringify(data));
  //   } catch(error) {
  //     console.log(`${error}`);
  //   };
  // }

  // #populateQuotes() {
  //   const stored = localStorage.getItem("quotes");
  //   if (!stored) {
  //     this.#storeQuotesInLocalStorage()
  //       .then(() => this.#populateQuotes()); // retry once loaded
  //     return;
  //   }
  //   const data = JSON.parse(stored);
  //   data.forEach(quote => {
  //     const str = `"${quote.q}" - ${quote.a}`;
  //     this.quotes.push(str);
  //   });
  // }

  getRandomQuote() {
    if (this.quotes.length === 0) return "Loading quotes...";
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }
}

export const quotesApi = new QuotesApi();
export const randomJokeApi = new RandomJokeApi();
export const randomMemeApi = new RandomMemeApi();