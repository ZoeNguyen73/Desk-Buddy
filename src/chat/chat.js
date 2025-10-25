import { ChatSound } from "./sound.js";

export default class ChatComponent {
  #dom = document.querySelector(".chat-content");
  #sound = new ChatSound();

  constructor() {
    this.addClickEventListener();
  }

  displayStatic(domElement) {
    document.querySelector(".chat-content").append(domElement);
    this.#scrollToBottom();
  }

  display(domElement, eventType = null) {
    if (eventType) {
      domElement.dataset.eventType = eventType;
      domElement.dataset.timestamp = Date.now();
    }

    this.#dom.append(domElement);
    this.#scrollToBottom();
    this.#sound.playMessageNotifSound();
  }

  #scrollToBottom() {
    this.#dom.scrollTop = this.#dom.scrollHeight;
  }

  async processClassMethod(classPath, classMethod) {
    const { default: ClassInstance } = await import(`../${classPath}`);
    const classInstance = new ClassInstance();
    Reflect.getPrototypeOf(classInstance)[classMethod]?.()
  }

  addClickEventListener() {
    this.#dom.addEventListener("click", (event) => {
      const target = event.target;
      const { classPath, classMethod } = target.dataset;
      if(classPath && classMethod) {
        this.processClassMethod(classPath, classMethod);
        target.setAttribute("class", "hidden");
      };
    });
  }

  mute() {
    this.#sound.muteAll();
  }

  unmute() {
    this.#sound.unmuteAll();
  }

  markMessageReacted(eventType) {
    const messages = this.#dom.querySelectorAll(`[data-event-type="${eventType}"]`);
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    const bubble = lastMessage.querySelector(".buddy-message-content");
    if (!bubble) return;

    if (!bubble.querySelector(".reaction-emoji")) {
      const emojiSpan = document.createElement("span");
      emojiSpan.className = "reaction-emoji";
      emojiSpan.textContent =
        eventType === "Water" ? "💧" :
        eventType === "Stretch" ? "💯" :
        eventType === "Break" ? "😆" :
        "👍";
      
      bubble.appendChild(emojiSpan);
    }
  }
}