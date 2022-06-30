export class ChatSound {
  #messageNotif = new Audio("./assets/sounds/message-notif.wav");
  #sounds = [this.#messageNotif];

  constructor() {
    this.muteAll();
  }

  playMessageNotifSound() {
    this.#messageNotif.play();
  }

  muteAll() {
    this.#sounds.forEach(audio => {
      audio.muted = true;
    });
  }

  unmuteAll() {
    this.#sounds.forEach(audio => {
      audio.muted = false;
    });
  }
}