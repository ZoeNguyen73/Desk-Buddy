import { events } from "./event.js";

export default class ClickEvent {
  static events = events;
  constructor() {
  }

  waterClickEvent() {
    console.log("haha");
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Water") {
        currentEvent.occurrenceCount++;
        console.log(`Current event is ${currentEvent.type} and occurence count is ${currentEvent.occurrenceCount}`);
        break;
      };
    };
  }

  stretchClickEvent() {
    console.log("haha");
    for (let i = 0, j = ClickEvent.events.length; i < j; i++) {
      const currentEvent = ClickEvent.events[i];
      if (currentEvent.type === "Stretch") {
        currentEvent.occurrenceCount++;
        console.log(`Current event is ${currentEvent.type} and occurence count is ${currentEvent.occurrenceCount}`);
        break;
      }; 
    };
  }

  test() {
    console.log("haha");
  }
}