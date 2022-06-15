export default class Event {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
}

export class ClickEvent extends Event {
  #eventListenerType = "click";
  #occurenceCount = 0;

  constructor(type, message, userOptions) {
    super(type, message);
    this.userOptions = userOptions; //array of users input
  }

  listenerEvent() {
    this.#occurenceCount++;
  }

  displayOptions(parentDom) {
    const newUserInput = document.createElement("div");
    newUserInput.setAttribute("class", "user-input");

    Object.values(this.userOptions).forEach(option => {
      const userOption = document.createElement("button");
      userOption.innerText = option;

      if(this.#eventListenerType.length > 0) {
        newUserInput.addEventListener(this.#eventListenerType, this.listenerEvent());
      };
      
      newUserInput.append(userOption);
    });

    parentDom.append(newUserInput);
  }
}

export class ChooseEvent extends ClickEvent {
  listenerEvent() {
    // trigger meme or joke
  }
}

/// create events

const RandomMessage = new Event("randomMsg", "Hang in there!");

const Water = new ClickEvent("water", "Time for a water break!",
  {
    1: "Yes, I am rehydrated!"
  }
);

const Stretch = new ClickEvent("stretch", "How about a 5-min stretch?",
  {
    1: "Done! Feeling much better now"
  }
);

const Break = new ChooseEvent("break", "Wanna see something funny?",
  {
    meme: "A random meme",
    joke: "A random joke"
  }
);

export const events = [RandomMessage, Water, Stretch, Break];