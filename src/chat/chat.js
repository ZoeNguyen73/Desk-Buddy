import Config from "../config/config.js"
import Message, { NotifMessage, EventMessage } from "../config/message.js";

export default class Chat {
  static ChatBoxDom = document.querySelector(".chat-content");

  constructor(username = "Buddy") {
    this.username = username;
    this.config = new Config();
    this.currentEvent = 0;
  }

  triggerEvent() {
    (this.currentEvent === this.config.eventsArray.length - 1) ? this.currentEvent = 0 : this.currentEvent++;
    const newMessage = new EventMessage(this.config.eventsArray[this.currentEvent]);
    // console.log(`The current event is ${this.currentEvent} and ${this.config.eventsArray[this.currentEvent]}`);
    newMessage.display(Chat.ChatBoxDom);
    newMessage.scrollToBottom();
  }

  triggerNotif(type) {
    const newNotif = new NotifMessage(type, this.config);
    newNotif.display(Chat.ChatBoxDom);
    newNotif.scrollToBottom();
  }

}
