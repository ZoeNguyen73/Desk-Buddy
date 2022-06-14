import Message from "./message.js";
import Event from "./event.js";
import { ClickEvent, ChooseEvent } from "./event.js";

export default class Config {
  static BuddyProfilePicSrc = "./assets/images/buddy-profile-pic-cat.png";

  constructor(frequency = 5000, endHour = 23, endMinute = 55) {
    this.frequency = frequency;
    this.endHour = endHour;
    this.endMinute = endMinute;
    this.eventsArray = eventsArray;
  }

  setFrequency(userInput) {
    this.frequency = userInput;
  }

  getFrequency() {
    return this.frequency;
  }

  updateEndTime(newEndHour, newEndMinute) {
    // TO ADD: if the time keyed in is before current time, reject and prompt user to input again
    this.endHour = newEndHour;
    this.endMinute = newEndMinute;
  }
}

/// create events

const RandomMessage = new Event("randomMsg", "Hang in there!");

const Water = new ClickEvent("water", "Time for a water break!",
  {
    1: "Yes, I am rehydrated!"
  }
);

const Stretch = new ClickEvent("stretch", "How about a 5-min stretch?",
  {
    1: "Done! Feeling much better now"
  }
);

const Break = new ChooseEvent("break", "Wanna see something funny?",
  {
    meme: "A randome meme",
    joke: "A random joke"
  }
);

const eventsArray = [RandomMessage, Water, Stretch, Break];
