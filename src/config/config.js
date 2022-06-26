import { events } from "../events/event.js";
import { Message, MessageWithClickEvent, Notif } from "./message.js";

export default class Config {
  #messages = [];
  #responseMessages = [];
  #events = events;
  #chatComponent;

  constructor(chatComponent, frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM, frequencyInMs = 5000, endTime = "23:59:59", userName = "buddy") {
    this.buddyProfilePicUrl = "./assets/images/buddy-profile-pic-cat.png";
    this.frequencyInMs = frequencyInMs;
    this.endTime = endTime;
    this.#seedAllMessages();
    this.#addConfigChangeListeners(frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM);
    this.locale = navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
    this.dateTimeDisplayOption = { weekday: "long", day: "numeric", month: "long"};
    this.#chatComponent = chatComponent;
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
      const responseMessage = new MessageWithClickEvent(event.userResponses);
      this.#responseMessages.push(responseMessage);  
    });
  }

  #addConfigChangeListeners(frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM) {
    // frequency change
    frequencyDOM.addEventListener("change", () => {
      const newFrequencyInMs = frequencyDOM.value * 1000;
      this.updateConfig("frequency", newFrequencyInMs);
    })
    // end time change
    endTimeSubmitDOM.addEventListener("click", () => {
      const endTimeInput = `${endTimeEntryDOM.value}:59`;
      this.updateConfig("endTime", endTimeInput);
    });
  }

  updateConfig(type, value) {
    switch(type) {
      case "frequency" :
        this.frequencyInMs = value;
        break;
      case "endTime" :
        this.endTime = value;
      default :
        break;
    }
    this.#renderConfigChange(type);
  }

  #renderConfigChange(type) {
    let notifDOM = undefined;
    switch(type) {
      case "frequency" :
        notifDOM = (new Notif()).render(
          `Frequency has been changed to every ${this.frequencyInMs / 1000} seconds`
        );
        break;
      case "endTime" :
        notifDOM = (new Notif()).render(
          `End time has been changed to ${this.getEndTime()}`
        );
        break;
      default:
    }
    this.#chatComponent.display(notifDOM);
  }

  getEndTime() {
    let endHour = this.endTime.slice(0, 2) * 1;
    let endMinute = this.endTime.slice(3,5);
    let session = "AM";

    if (endHour > 12) {
      endHour -= 12;
      session = "PM";
    };

    endHour = endHour.toString().padStart(2, "0");

    return `${endHour}:${endMinute} ${session}`;
  }
}


