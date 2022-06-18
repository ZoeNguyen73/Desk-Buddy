export default class ChatComponent {
  #dom = document.querySelector(".chat-content");

  constructor() {
  }

  display(domElement) {
    this.#dom.append(domElement);
    this.#scrollToBottom();
  }

  #scrollToBottom() {
    this.#dom.scrollTop = this.#dom.scrollHeight;
  }

}