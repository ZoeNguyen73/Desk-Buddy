// export default class Event {
//   constructor(type, message) {
//     this.type = type;
//     this.message = message;
//   }
// }

export class Event {
  #eventListenerType = "click";

  constructor(message) {
    this.message = message;
    this.userResponses = [];
  }

  populateUserResponses(responses) {
    responses.forEach(response => {
      this.userResponses.push(response);
    })
  };

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

  getEventListenerType() {
    return this.#eventListenerType;
  }

  // displayOptions(parentDom) {
  //   const newUserInput = document.createElement("div");
  //   newUserInput.setAttribute("class", "user-input");

  //   Object.values(this.userOptions).forEach(option => {
  //     const userOption = document.createElement("button");
  //     userOption.innerText = option;

  //     if(this.#eventListenerType.length > 0) {
  //       newUserInput.addEventListener(this.#eventListenerType, this.listenerEvent());
  //     };
      
  //     newUserInput.append(userOption);
  //   });

  //   parentDom.append(newUserInput);
  // }
}


/// create events

const randomMessageEvent = new Event("Hang in there!");

const waterEvent = new Event("Time for a water break!");
waterEvent.populateUserResponses(["Yes, I am rehydrated!"]);

const stretchEvent = new Event("How about a 5-min stretch?");
stretchEvent.populateUserResponses(["Done! Feeling much better now"]);

const breakEvent = new Event("Wanna see something funny?");
breakEvent.populateUserResponses(["A random meme", "A random joke"]);

export const events = [randomMessageEvent, waterEvent, stretchEvent, breakEvent];