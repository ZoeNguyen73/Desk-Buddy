import { clickEvent } from "../events/clickevent.js";

export default class Buttons {
  #config;
  #doms = {
    pokeButton: document.getElementById("poke-me"),
    endDayButton: document.getElementById("end-the-day")
  };
  #timer;
  
  constructor(config, timer) {
    this.#config = config;
    this.#timer = timer;
    this.#addEventListener();
  }

  #addEventListener() {
    this.#doms.endDayButton.addEventListener("click", () => {
      const newEndTime = this.#timer.getCurrentTime();
      this.#config.updateConfig("endTime", newEndTime);
    });

    this.#doms.pokeButton.addEventListener("click", async() => {
      const btn = this.#doms.pokeButton;
      btn.disabled = true;
      btn.style.cursor = "wait";

      try {
        if (Math.random() > 0.5) {
          await clickEvent.jokeClickEvent();
        } else {
          await clickEvent.memeClickEvent();
        }
      } finally {
        btn.disabled = false;
        btn.style.cursor = "pointer";
      }
      
    });
  }
}