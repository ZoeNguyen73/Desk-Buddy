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

export class MessageWithClickEvent {
  #clicks;
  constructor(clicks=[]) {
    this.#clicks = clicks;
  }

  render() {
    const newMessage = document.createElement("div");
    newMessage.setAttribute("class", "user-input");
    newMessage.innerHTML = `
      <button onclick="MessageWithClickEvent.onClick()">test</button>
      <button onclick="MessageWithClickEvent.onClick()">test</button>
    `;
    return newMessage;
  }

  static onClick() {
    console.log("this was clicked");
  }
}