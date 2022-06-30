class RandomJokeApi {
  #name;
  #url;
  #options;

  constructor() {
    this.#name = "Random Joke";
    this.#url = "https://random-stuff-api.p.rapidapi.com/joke";
    this.#options = {
      method: "GET",
      params: {
        blacklist: "dark, sex, insults, racist, rude"
      },
      headers: {
        Authorization: "zp8cS9WMnvzU",
        "X-RapidAPI-Key": "5ff2da6b38msh35c4993553a99d2p11ec64jsn39e47a56a104",
        "X-RapidAPI-Host": "random-stuff-api.p.rapidapi.com"
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
    this.#url = "https://random-stuff-api.p.rapidapi.com/reddit/FetchSubredditPost?subreddit=memes&searchType=top";
    this.#options = {
      method: "GET",
      headers: {
        Authorization: "zp8cS9WMnvzU",
        "X-RapidAPI-Key": "5ff2da6b38msh35c4993553a99d2p11ec64jsn39e47a56a104",
        "X-RapidAPI-Host": "random-stuff-api.p.rapidapi.com"
      }
    }
  }

  async getRandomMemeUrl() {
    try {
      const response = await fetch(this.#url, this.#options);
      const data = await response.json();
      return data.image;
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