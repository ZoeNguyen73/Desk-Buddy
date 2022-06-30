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
    this.message = `Here's a quote for you: <i>${newMsg}</i>`;
  }
}

export class RandomMessageEvent extends Event {
  #messages = [
    "Hang in there! 😄🤗",
    "Great work so far~ Keep going 👍",
    "Psst, here's a reminder to stop slouching and sit up straight 😉",
    "Doesn't it feel like a good time for a coffee break? ☕🍪",
    "You are doing awesome 🤩",
    "This is tough, but you're tougher 😎👉👉",
    "Sending over some good vibes~~",
    "Don't stress. You got this!",
    "You're killing it!!! 💯🔥",
    "Wow you're on a roll! Keep it up 💪",
    "Work sucks, but at least you don't 😝",
    "Hey busy bee~ remember to take a breather every now and then",
    "You got it! Ganbatte!!!",
    "I've always wondered... how do you make work look so easy? 🤔",
    "Don't mind me - just looking up when is the next public holiday hehehe...",
    "Is it too early to think about my next meal? 🤭🍣🥧🍜",
    "👋👋👋👋 nothing~ just wanna say hi! hehe",
    "Hope it's going fine over there my friend 😊",
    "LFGGGGGGGG 🚀🚀🚀🚀"
  ];

  constructor(type, message) {
    super(type, message);
    this.updateMessage();
  }

  updateMessage() {
    const id = Math.floor(Math.random() * this.#messages.length);
    this.message = this.#messages[id];
  }
}

/// create events

const randomMessageEvent = new RandomMessageEvent("Random message", "");

const randomQuoteEvent = new QuoteEvent("Random quote", "");

const waterEvent = new Event("Water", "Time for a water break 💦💦🥤");
waterEvent.populateUserResponses({
  "Yes, I am rehydrated!": "waterClickEvent" 
});

const stretchEvent = new Event("Stretch", "How about a 5-min stretch? 🤸");
stretchEvent.populateUserResponses({ 
  "Done! Feeling much better now": "stretchClickEvent"
});

const breakEvent = new Event("Break", "Wanna see something funny? 😜");
breakEvent.populateUserResponses({
  "A random meme": "memeClickEvent", 
  "A random joke": "jokeClickEvent"
});

export const events = [randomMessageEvent, randomQuoteEvent, waterEvent, stretchEvent, breakEvent];