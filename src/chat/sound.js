export class ChatSound {
  #messageNotif = new Audio("./assets/sounds/message-notif.wav");
  constructor() {

  }
  playMessageNotifSound() {
    this.#messageNotif.play();
  }
}