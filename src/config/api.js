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
      console.log(localStorage.getItem("quotes"));
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