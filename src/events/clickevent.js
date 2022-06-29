import { events } from "./event.js";
import { randomJokeApi, randomMemeApi } from "../config/api.js";
import { Message } from "../config/message.js";
import { summaryComponent } from "../summary/summary.js";
import Config from "../config/config.js";

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
      const newMsg = new Message(
        `Alright, here's a little joke for you: <i>${newJoke}</i>`, 
        Config.buddyPicUrl
      );
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
      const newMsg = new Message(
        `LOL at this: <img class="meme-pic" src="${newMeme}">`, 
        Config.buddyPicUrl
      );
      ClickEvent.dom.append(newMsg.render());
      ClickEvent.dom.scrollTop = ClickEvent.dom.scrollHeight;
    } catch(error) {
      console.log(`${error}`);
    };
  }

}

export const clickEvent = new ClickEvent();