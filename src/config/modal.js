export default class Modal {
  constructor(modalDom) {
    this.dom = modalDom;
  }

  display() {
    this.dom.style.display = "block";
  }

  close() {
    this.dom.style.display = "none";
  }
}