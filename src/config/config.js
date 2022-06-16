import { events } from "./event.js";

export default class Config {
  static BuddyProfilePicSrc = "./assets/images/buddy-profile-pic-cat.png";

  constructor(frequencyInMs = 5000, endHour = 23, endMinute = 59, userName = "buddy") {
    this.frequency = frequencyInMs;
    this.endHour = endHour;
    this.endMinute = endMinute;
    this.events = events;
    this.userName = userName;
  }

  updateEndTime(newEndHour, newEndMinute) {
    // TO ADD: if the time keyed in is before current time, reject and prompt user to input again
    this.endHour = newEndHour;
    this.endMinute = newEndMinute;
  }
}


