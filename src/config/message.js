import Config from "./config.js";

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
  #event;
  
  constructor(event) {
    super(event.message);
    this.#event = event;
  }

  display(parentDom) {
    super.display(parentDom);

    if (!this.#event.userOptions) {
      return
    };

    this.#event.displayOptions(parentDom);
  }
}

export class NotifMessage extends Message {
  #type;
  #config;
  constructor(type, config) {
    super();
    this.#type = type;
    this.#config = config;
  }

  display(parentDom) {
    const newNotif = document.createElement("div");
    newNotif.setAttribute("class", "notif");

    switch(this.#type) {
      case "frequency":
        newNotif.innerText = this.#frequencyMsg();
        break;
      case "endTime":
        newNotif.innerText = this.#endTimeMsg();
        break;
      default:
    }

    parentDom.append(newNotif);
  }

  #frequencyMsg() {
    return `Frequency has been changed to every ${this.#config.frequency / 1000} seconds`;
  }

  #endTimeMsg() {
    let endHour = this.#config.endHour;
    const endMinute = this.#config.endMinute.toString().padStart(2, "0");
    let session = "AM";

    if (endHour > 12) {
      endHour -= 12;
      session = "PM";
    };

    endHour = endHour.toString().padStart(2, "0");
    return `End time has been changed to ${endHour}:${endMinute} ${session}`;
  }
}