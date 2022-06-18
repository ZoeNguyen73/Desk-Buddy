import { events } from "./event.js";
import { Message } from "./message.js";

export default class Config {
#messages =[];

  constructor(frequencyInMs = 5000, endTime = "23:59:59", userName = "buddy") {
    this.buddyProfilePicUrl = "./assets/images/buddy-profile-pic-cat.png";
    this.frequencyInMs = frequencyInMs;
    this.endTime = endTime;
    this.#seedMessages();
    this.locale = navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
    this.dateTimeDisplayOption = { weekday: "long", day: "numeric", month: "long"};
  }

  getMessage(index) {
    return this.#messages[index];
  }

  getMessagesLength() {
    return this.#messages.length;
  }

  #seedMessages() {
    let message = new Message("haha", this.buddyProfilePicUrl);
    this.#messages.push(message);
  }

}


