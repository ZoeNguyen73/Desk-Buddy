import { events } from "../events/event.js";
import { Message, MessageWithClickEvent, Notif } from "./message.js";

export default class Config {
  #greetings = ["Hey", "Yo", "Holla", "Hi"];
  #chatComponent;

  constructor(userName, soundToggleDOM, frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM, frequencyInMs = 5000, endTime = "23:59:59") {
    this.userName = userName;
    this.buddyProfilePicUrl = "./assets/images/buddy-profile-pic-cat.png";
    this.events = events;
    this.frequencyInMs = frequencyInMs;
    this.endTime = endTime;
    this.#addConfigChangeListeners(soundToggleDOM , frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM);
    this.locale = navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
    this.dateTimeDisplayOption = { weekday: "long", day: "numeric", month: "long"};
    this.#resetAllEvents();
  }

  assignChatComponent(chatComponent) {
    this.#chatComponent = chatComponent;
  }

  #getGreeting() {
    if (Math.random() > 0.5) {
      return ""
    };
    const id = Math.floor(Math.random() * this.#greetings.length);
    return `${this.#greetings[id]} ${this.userName}!`;
  }

  getMessage(index) {
    const currentEvent = this.events[index];
    const message = new Message(`${this.#getGreeting()} ${currentEvent.message}`, this.buddyProfilePicUrl);
    return message;
  }

  getResponseMessages(index) {
    const currentEvent = this.events[index];
    const message = new MessageWithClickEvent(currentEvent.userResponses);
    return message;
  }

  getEventsLength() {
    return this.events.length;
  }

  #addConfigChangeListeners(soundToggleDOM, frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM) {
    // frequency change
    frequencyDOM.addEventListener("change", () => {
      const newFrequencyInMs = frequencyDOM.value * 1000;
      this.updateConfig("frequency", newFrequencyInMs);
    })
    // end time change
    endTimeSubmitDOM.addEventListener("click", () => {
      const endTimeInput = `${endTimeEntryDOM.value}:00`;
      this.updateConfig("endTime", endTimeInput);
    });
    // mute sound toggle
    soundToggleDOM.addEventListener("click", () => {
      const currentState = soundToggleDOM.innerText;
      if (currentState === "ON 🔉") {
        this.#chatComponent.mute();
        soundToggleDOM.innerText = "OFF 🔇";
      };
      if (currentState === "OFF 🔇") {
        this.#chatComponent.unmute();
        soundToggleDOM.innerText = "ON 🔉";
      };
    });

  }

  updateConfig(type, value) {
    switch(type) {
      case "frequency":
        this.frequencyInMs = value;
        break;
      case "endTime":
        this.endTime = value;
      default:
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

  #resetAllEvents() {
    this.events.forEach(event => {
      event.resetEvent();
    });
  }
}


