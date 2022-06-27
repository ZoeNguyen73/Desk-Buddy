import { events } from "./event.js";
import { randomJokeApi, randomMemeApi } from "../config/api.js";
import { Message } from "../config/message.js";
import { summaryComponent } from "../summary/summary.js";

export default class ClickEvent {
  static events = events;
  static randomJokeApi = randomJokeApi;
  static dom = document.querySelector(".chat-content");
  static summaryComponent = summaryComponent;

  constructor() {
  }

  waterClickEvent() {
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Water") {
        currentEvent.occurrenceCount++;
        ClickEvent.summaryComponent.displayCount(currentEvent.type, currentEvent.occurrenceCount);
        break;
      };
    };
  }

  stretchClickEvent() {
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Stretch") {
        currentEvent.occurrenceCount++;
        ClickEvent.summaryComponent.displayCount(currentEvent.type, currentEvent.occurrenceCount);
        break;
      }; 
    };
  }

  jokeClickEvent() {
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Break") {
        currentEvent.occurrenceCount++;
        ClickEvent.summaryComponent.displayCount(currentEvent.type, currentEvent.occurrenceCount);
        break;
      }; 
    };
    this.displayJoke();
  }

  async displayJoke() {
    try {
      const newJoke = await randomJokeApi.getRandomJoke();
      const newMsg = new Message(newJoke, "./assets/images/buddy-profile-pic-cat.png");
      ClickEvent.dom.append(newMsg.render());
      ClickEvent.dom.scrollTop = ClickEvent.dom.scrollHeight;
    } catch(error) {
      console.log(`${error}`);
    };
  }

  memeClickEvent() {
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Break") {
        currentEvent.occurrenceCount++;
        ClickEvent.summaryComponent.displayCount(currentEvent.type, currentEvent.occurrenceCount);
        break;
      }; 
    };
    this.displayMeme();
  }

  async displayMeme() {
    try {
      const newMeme = await randomMemeApi.getRandomMemeUrl();
      const newMsg = new Message(`<img class="meme-pic" src="${newMeme}">`, "./assets/images/buddy-profile-pic-cat.png");
      ClickEvent.dom.append(newMsg.render());
      ClickEvent.dom.scrollTop = ClickEvent.dom.scrollHeight;
    } catch(error) {
      console.log(`${error}`);
    };
  }

}