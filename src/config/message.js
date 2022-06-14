import Event from "./event.js";
import { ClickEvent, ChooseEvent } from "./event.js";
import Config from "../config/config.js";

export default class Message {
  constructor(message) {
    this.msg = message;
  }

  display(parentDom) {
    const newMessage = document.createElement("div");
    newMessage.setAttribute("class", "buddy-message");
    newMessage.innerHTML = `
      <img src="${Config.BuddyProfilePicSrc}" class="buddy-chat-profile-pic" alt="buddy profile pic">
      <p class="buddy-message-content">${this.msg}</p>
    `;
    parentDom.append(newMessage);
  }

  scrollToBottom() {
    const chatContainerDom = document.querySelector(".chat-content");
    chatContainerDom.scrollTop = chatContainerDom.scrollHeight;
  }
}

export class EventMessage extends Message {
  constructor(event) {
    super();
    this.msg = event.message;
    this.event = event;
  }

  display(parentDom) {
    const newMessage = document.createElement("div");
    newMessage.setAttribute("class", "buddy-message");
    newMessage.innerHTML = `
      <img src="${Config.BuddyProfilePicSrc}" class="buddy-chat-profile-pic" alt="buddy profile pic">
      <p class="buddy-message-content">${this.msg}</p>
    `;
    parentDom.append(newMessage);

    if (!this.event.userOptions) {
      return
    };

    this.event.displayOptions(parentDom);
  }
}

export class NotifMessage extends Message{
  constructor(type, config) {
    super();
    this.type = type;
    this.config = config;
  }

  display(parentDom) {
    const newNotif = document.createElement("div");
    newNotif.setAttribute("class", "notif");

    if (this.type === "frequency") {
      newNotif.innerText =`Frequency has been changed to every ${this.config.frequency / 1000} seconds`;
    };

    if (this.type === "endTime") {
      let endHour = this.config.endHour;
      let session = "AM";

      if (endHour > 12) {
        endHour -= 12;
      };

      if (endHour >= 12) {
        session = "PM";
      };

      endHour = endHour < 10 ? `0${endHour}` : endHour;
      const endMinute = this.config.endMinute < 10 ? `0${this.config.endMinute}` : this.config.endMinute;

      newNotif.innerText =`End time has been changed to ${endHour}:${endMinute} ${session}`;
    }

    parentDom.append(newNotif);
  }
}