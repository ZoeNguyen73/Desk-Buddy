import Config from "./config.js";
import ChatComponent from "../chat/chat.js";
import { Message, MessageWithClickEvent } from "./message.js";

export class Timer {
  #config;
  #chatComponent;
	#timeComponent = new TimeComponent();
	#lastMsgTime = (new Date()).getTime();
  #currentMessageIndex = 0;

  constructor(config, chatComponent) {
    this.#config = config;
    this.#chatComponent = chatComponent;
  }

	runClock() {
		const currentTime = new Date();
		let currentHour = currentTime.getHours();
		const currentMinute = currentTime.getMinutes().toString().padStart(2, "0");

		let session = "AM";

		if (currentHour >= 12) {
			session = "PM";
		};

		if (currentHour > 12) {
			currentHour -= 12;
		};

		currentHour = currentHour.toString().padStart(2, "0");

		const timeHtmlElement = `
			<p>Today's date: 
			${currentTime.toLocaleDateString(this.#config.locale, this.#config.dateTimeDisplayOption)}</p>
			<p>Current time: ${currentHour}:${currentMinute} ${session}</p>
		`;

		this.#timeComponent.display(timeHtmlElement);

		setTimeout(() => {
			this.runClock();
		}, 10000);
	}

	start() {
		const endTime = this.#config.endTime; // string "hh:mm:ss"
		// this.#updateTimeComponent();

		if (endTime <= this.#getCurrentTime()) {
			const endDayMsg = new Message("It's the end of day~ goodbye!", this.#config.buddyProfilePicUrl);
			this.#chatComponent.display(endDayMsg.render());
			return;
		};

		const frequencyInMs = this.#config.frequencyInMs;
		const currentTimeInMs = (new Date()).getTime();
		const duration = currentTimeInMs - this.#lastMsgTime;
		if (duration >= frequencyInMs) {
			this.#sendMessage();
			this.#sendMessageWithClickEvent();
			this.#lastMsgTime = currentTimeInMs;
		};

		setTimeout(() => {
			this.start();
		}, 1000);
	}

	#sendMessage() {
		if(this.#currentMessageIndex >= this.#config.getMessagesLength()) {
      this.#currentMessageIndex = 0;
    }
    const msgIndex = this.#currentMessageIndex++;
    const message = this.#config.getMessage(msgIndex);
    const messageDom = message.render();
    this.#chatComponent.display(messageDom);
  }

	#sendMessageWithClickEvent() {
		const messageDom = (new MessageWithClickEvent()).render();
		this.#chatComponent.display(messageDom);
	}
	
	#getCurrentTime() {
		//get current time and return as string "hh:mm:ss"
		const currentHour = (new Date()).getHours().toString().padStart(2, "0");
		const currentMinute = (new Date()).getMinutes().toString().padStart(2, "0");
		return `${currentHour}:${currentMinute}:59`;
	}
}

export class TimeComponent {
	#timeDom = document.getElementById("date-time-container");
	constructor() {}

	display(htmlElement) {
		this.#timeDom.innerHTML = htmlElement;
	}
}