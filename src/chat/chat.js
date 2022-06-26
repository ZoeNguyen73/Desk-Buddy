export default class ChatComponent {
  #dom = document.querySelector(".chat-content");

  constructor() {
    this.addClickEventListener();
  }

  display(domElement) {
    this.#dom.append(domElement);
    this.#scrollToBottom();
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
    this.#dom.addEventListener("click", (evnt) => {
      const { classPath, classMethod } = evnt.target.dataset;
      console.log(classPath);
      console.log(classMethod);
      if(classPath && classMethod) {
        this.processClassMethod(classPath, classMethod)
      }
    });
  }

}