export class Event {
  #eventListenerType = "click";

  constructor(message) {
    this.message = message;
    this.userResponses = {};
  }

  populateUserResponses(responses) {
    this.userResponses = responses;
  };

}

/// create events

const randomMessageEvent = new Event("Hang in there!");

const waterEvent = new Event("Time for a water break!");
waterEvent.populateUserResponses({
  "Yes, I am rehydrated!" : "waterClickEvent" 
});

const stretchEvent = new Event("How about a 5-min stretch?");
stretchEvent.populateUserResponses({ 
  "Done! Feeling much better now" : "stretchClickEvent"
});

const breakEvent = new Event("Wanna see something funny?");
breakEvent.populateUserResponses({
  "A random meme" : "memeClickEvent", 
  "A random joke" : "jokeClickEvent"
});

export const events = [randomMessageEvent, waterEvent, stretchEvent, breakEvent];