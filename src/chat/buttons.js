import { Message } from "../config/message.js";
import Config from "../config/config.js";

export default class Buttons {
  #config;
  #chatComponent;
  #timer;
  constructor(config, chatComponent, timer, pokeButtonDOM, endDayButtonDOM) {
    this.#config = config;
    this.#chatComponent = chatComponent;
    this.#timer = timer;
    this.#addEventListener(pokeButtonDOM, endDayButtonDOM);
  }

  #addEventListener(pokeButtonDOM, endDayButtonDOM) {
    endDayButtonDOM.addEventListener("click", () => {
      const newEndTime = this.#timer.getCurrentTime();
      this.#config.updateConfig("endTime", newEndTime);
    });

    pokeButtonDOM.addEventListener("click", () => {
      console.log("poke button clicked");
      //function to trigger meme/joke/random
    });
  }
}