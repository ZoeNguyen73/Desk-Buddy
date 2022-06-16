import Config from "../config/config.js"
import { NotifMessage, EventMessage } from "../config/message.js";

export default class Chat {
  static DOM = document.querySelector(".chat-content");

  constructor() {
    this.config = new Config();
    this.currentEvent = 0;
  }

  triggerEvent() {
    (this.currentEvent === this.config.events.length - 1) ? this.currentEvent = 0 : this.currentEvent++;
    const newMessage = new EventMessage(this.config.events[this.currentEvent]);
    newMessage.display(Chat.DOM);
    newMessage.scrollToBottom();
  }

  triggerNotif(type) {
    const newNotif = new NotifMessage(type, this.config);
    newNotif.display(Chat.DOM);
    newNotif.scrollToBottom();
  }

}