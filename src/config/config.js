import { events } from "./event.js";
import { Message, MessageWithClickEvent } from "./message.js";

export default class Config {
  #messages = [];
  #responseMessages = [];
  #events = events;

  constructor(frequencyInMs = 5000, endTime = "23:59:59", userName = "buddy") {
    this.buddyProfilePicUrl = "./assets/images/buddy-profile-pic-cat.png";
    this.frequencyInMs = frequencyInMs;
    this.endTime = endTime;
    this.#seedAllMessages();
    this.locale = navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
    this.dateTimeDisplayOption = { weekday: "long", day: "numeric", month: "long"};
  }

  getMessage(index) {
    return this.#messages[index];
  }

  getResponseMessages(index) {
    return this.#responseMessages[index];
  }

  getMessagesLength() {
    return this.#messages.length;
  }

  #seedAllMessages() {
    // let message = new Message("haha", this.buddyProfilePicUrl);
    // this.#messages.push(message);
    let picUrl = this.buddyProfilePicUrl;
    this.#events.forEach(event => {
      const message = new Message(event.message, picUrl);
      this.#messages.push(message);
      this.#responseMessages.push(event.userResponses);  
    });
  }
}


