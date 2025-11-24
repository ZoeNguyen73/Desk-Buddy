import { randomJokeApi, randomMemeApi } from "../config/api.js";
import { Message } from "../config/message.js";
import { summaryComponent } from "../summary/summary.js";
import Config from "../config/config.js";

export default class ClickEvent {
  static events = [];
  static randomJokeApi = randomJokeApi;
  static dom = document.querySelector(".chat-content");
  static summaryComponent = summaryComponent;
  static buddyProfilePicUrl = "./assets/images/buddy-profile-pic-cat.png";

  constructor() {
  }

  setChatComponent(chatComponent) {
    ClickEvent.chatComponent = chatComponent;
  }

  setEvents(events) {
    ClickEvent.events = events;
  }

  waterClickEvent() {
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Water") {
        currentEvent.occurrenceCount++;
        ClickEvent.summaryComponent.displayCount(currentEvent.type, currentEvent.occurrenceCount);
        ClickEvent.chatComponent.markMessageReacted("Water");
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
        ClickEvent.chatComponent.markMessageReacted("Stretch");
        break;
      }; 
    };
  }

  async jokeClickEvent() {
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Break") {
        currentEvent.occurrenceCount++;
        ClickEvent.summaryComponent.displayCount(currentEvent.type, currentEvent.occurrenceCount);
        ClickEvent.chatComponent.markMessageReacted("Break");
        break;
      }; 
    };
    await this.displayJoke();
  }

  async displayJoke() {
    try {
      const newJoke = await randomJokeApi.getRandomJoke();
      const newMsg = new Message(
        `Alright, here's a little joke for you: <i>${newJoke}</i>`, 
        ClickEvent.buddyProfilePicUrl
      );
      ClickEvent.dom.append(newMsg.render());
      ClickEvent.dom.scrollTop = ClickEvent.dom.scrollHeight;
    } catch(error) {
      console.log(`${error}`);
    };
  }

  async memeClickEvent() {
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Break") {
        currentEvent.occurrenceCount++;
        ClickEvent.summaryComponent.displayCount(currentEvent.type, currentEvent.occurrenceCount);
        ClickEvent.chatComponent.markMessageReacted("Break");
        break;
      }; 
    };
    await this.displayMeme();
  }

  async displayMeme() {
    try {
      const newMeme = await randomMemeApi.getRandomMeme();
      const newMsg = new Message(
        `LOL checkout this ${newMeme.source} 🤣🤣🤣 <img class="meme-pic" src="${newMeme.url}">`, 
        ClickEvent.buddyProfilePicUrl
      );
      ClickEvent.dom.append(newMsg.render());
      ClickEvent.dom.scrollTop = ClickEvent.dom.scrollHeight;
    } catch(error) {
      console.log(`${error}`);
    };
  }
}

export const clickEvent = new ClickEvent();