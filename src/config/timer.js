import Config from "./config.js";
import ChatComponent from "../chat/chat.js";
import { Message, MessageWithClickEvent } from "./message.js";

export class Timer {
  #config;
  #chatComponent;
  #timeComponent = new TimeComponent();
  #lastMsgTime = (new Date()).getTime();
  #currentEventIndex = 0;

  constructor(config, chatComponent) {
    this.#config = config;
    this.#chatComponent = chatComponent;
  }

  runClock() {
    const currentTime = new Date();
    let currentHour = currentTime.getHours();
    const currentMinuteInStr = currentTime.getMinutes().toString().padStart(2, "0");

    let session = "AM";

    if (currentHour >= 12) {
      session = "PM";
    };

    if (currentHour > 12) {
      currentHour -= 12;
    };

    const currentHourinStr = currentHour.toString().padStart(2, "0");

    const timeHtmlElement = `
      <p>Today's date: 
        <span class="date-display">${currentTime.toLocaleDateString(this.#config.locale, this.#config.dateTimeDisplayOption)}</span>
      </p>
      <p>Current time: 
        <span class="time-display">
          ${currentHourinStr}
          <b id="blinking">:</b>
          ${currentMinuteInStr} ${session}
        </span>
      </p>
    `;

    this.#timeComponent.display(timeHtmlElement);

    setTimeout(() => {
      this.runClock();
    }, 10000);
  }

  start() {
    const endTime = this.#config.endTime; // string "hh:mm:ss"

    if (endTime <= this.getCurrentTime()) {
      const endDayMsg = new Message(
        `Hey ${this.#config.userName}, it's the end of day. Great work - you've accomplished a lot today! Get a good rest and see ya 👋`, 
        this.#config.buddyProfilePicUrl
      );
      this.#chatComponent.display(endDayMsg.render());
      return;
    };

    const frequencyInMs = this.#config.frequencyInMs;
    const currentTimeInMs = (new Date()).getTime();
    const duration = currentTimeInMs - this.#lastMsgTime;
    if (duration >= frequencyInMs) {
      if(this.#currentEventIndex >= this.#config.getEventsLength()) {
        this.#currentEventIndex = 0;
      };
      const eventIndex = this.#currentEventIndex++;
      this.#sendMessage(eventIndex);
      this.#sendMessageWithClickEvent(eventIndex);
      this.updateEventMessage();
      this.#lastMsgTime = currentTimeInMs;
    };

    setTimeout(() => {
      this.start();
    }, 1000);
  }

  #sendMessage(index) {
    const message = this.#config.getMessage(index);
    const messageDom = message.render();
    this.#chatComponent.display(messageDom);
  }

  #sendMessageWithClickEvent(index) {
    const messageDom = (this.#config.getResponseMessages(index)).render();
    this.#chatComponent.display(messageDom);
  }
  
  getCurrentTime() {
    //get current time and return as string "hh:mm:ss"
    const currentHour = (new Date()).getHours().toString().padStart(2, "0");
    const currentMinute = (new Date()).getMinutes().toString().padStart(2, "0");
    const currentSeconds = (new Date()).getSeconds().toString().padStart(2, "0");
    return `${currentHour}:${currentMinute}:${currentSeconds}`;
  }

  updateEventMessage() {
    const currentEventType = this.#config.events[this.#currentEventIndex - 1].type;
    if (currentEventType.includes("Random")) {
      this.#config.events[this.#currentEventIndex - 1].updateMessage();
    };
  }
}

export class TimeComponent {
  #timeDom = document.getElementById("date-time-container");
  constructor() {}

  display(htmlElement) {
    this.#timeDom.innerHTML = htmlElement;
  }
}