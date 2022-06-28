import { quotesApi } from "../config/api.js";

export class Event {
  #eventListenerType = "click";

  constructor(type, message) {
    this.type = type;
    this.message = message;
    this.userResponses = {};
    this.occurrenceCount = 0;
  }

  populateUserResponses(responses) {
    this.userResponses = responses;
  };

  resetEvent() {
    this.occurrenceCount = 0;
  }
}

export class QuoteEvent extends Event {
  #quotesApi = quotesApi;
  constructor(type, message) {
    super(type, message);
    this.updateMessage();
  }

  updateMessage() {
    const newMsg = this.#quotesApi.getRandomQuote();
    this.message = newMsg;
  }
}

/// create events

const randomMessageEvent = new Event("Random message", "Hang in there!");

const randomQuoteEvent = new QuoteEvent("Random quote", "");

const waterEvent = new Event("Water", "Time for a water break!");
waterEvent.populateUserResponses({
  "Yes, I am rehydrated!": "waterClickEvent" 
});

const stretchEvent = new Event("Stretch", "How about a 5-min stretch?");
stretchEvent.populateUserResponses({ 
  "Done! Feeling much better now": "stretchClickEvent"
});

const breakEvent = new Event("Break", "Wanna see something funny?");
breakEvent.populateUserResponses({
  "A random meme": "memeClickEvent", 
  "A random joke": "jokeClickEvent"
});

export const events = [randomMessageEvent, randomQuoteEvent, waterEvent, stretchEvent, breakEvent];