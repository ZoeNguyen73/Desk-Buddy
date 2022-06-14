// import Message from "./message.js";
// import Event from "./event.js";
import { eventsArray } from "./event.js";

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


