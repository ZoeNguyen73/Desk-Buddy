import { ChatSound } from "./sound.js";

export default class ChatComponent {
  #dom = document.querySelector(".chat-content");
  #sound = new ChatSound();

  constructor() {
    this.addClickEventListener();
  }

  static displayStatic(domElement) {
    document.querySelector(".chat-content").append(domElement);
    this.#scrollToBottom();
  }

  display(domElement) {
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
}