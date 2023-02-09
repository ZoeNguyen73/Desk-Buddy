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
    this.#url = "https://api.quotable.io/quotes?limit=150"
    this.quotes = [];
    this.#populateQuotes();
  }
  
  async #storeQuotesInLocalStorage() {
    try {
      const response = await fetch(this.#url);
      const data = await response.json();
      localStorage.setItem("quotes", JSON.stringify(data));
    } catch(error) {
      console.log(`${error}`);
    };
  }

  #populateQuotes() {
    if (!localStorage.getItem("quotes")) {
      this.#storeQuotesInLocalStorage();
    }
    const data = JSON.parse(localStorage.getItem("quotes")).results;
    data.forEach(quote => {
      const str = `
        "${quote.content}" - ${quote.author}
      `;
      this.quotes.push(str);
    });
  }

  getRandomQuote() {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }
}

export const quotesApi = new QuotesApi();
export const randomJokeApi = new RandomJokeApi();
export const randomMemeApi = new RandomMemeApi();