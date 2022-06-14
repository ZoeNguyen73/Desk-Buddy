export default class Event {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
}

export class ClickEvent extends Event {
  constructor(type, message, userOptions) {
    super(type, message);
    this.userOptions = userOptions; //array of users input
    this.eventListenerType = "click";
    this.occurenceCount = 0;
  }

  listenerEvent() {
    this.occurenceCount ++;
  }

  displayOptions(parentDom) {
    const newUserInput = document.createElement("div");
    newUserInput.setAttribute("class", "user-input");

    Object.values(this.userOptions).forEach(option => {
      const userOption = document.createElement("button");
      userOption.innerText = option;

      if(this.eventListenerType.length > 0) {
        newUserInput.addEventListener(this.eventListenerType, this.listenerEvent);
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