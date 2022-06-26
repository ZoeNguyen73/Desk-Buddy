export class Message {
  constructor(text, picUrl) {
    this.text = text;
    this.picUrl = picUrl;
  }

  render() {
    const newMessage = document.createElement("div");
    newMessage.setAttribute("class", "buddy-message");
    newMessage.innerHTML = `
      <img src="${this.picUrl}" class="buddy-chat-profile-pic" alt="buddy profile pic">
      <p class="buddy-message-content">${this.text}</p>
    `;
    return newMessage;
  }
}

export class Notif {
  constructor() {
  }

  render(msg) {
    const newNotif = document.createElement("div");
    newNotif.setAttribute("class", "notif");
    newNotif.innerHTML = msg;
    return newNotif;
  }
}

export class MessageWithClickEvent {
  #clicks;
  constructor(messages, clicks=[]) {
    this.messages = messages;
    this.#clicks = clicks;
  }

  static onClick() {
    console.log("this was clicked");
  }

  render() {
    const newMessage = document.createElement("div");
    newMessage.setAttribute("class", "user-input");
    let str = "";
    this.messages.forEach(message => {
      str += `<button onclick="eval('MessageWithClickEvent.onClick()')">${message}</button>`;
    });
    newMessage.innerHTML = str;
    return newMessage;
  }

}