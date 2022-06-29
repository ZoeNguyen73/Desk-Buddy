import ChatComponent from "./chat/chat.js"
import Config from "./config/config.js";
import {Message, MessageWithClickEvent} from "./config/message.js";
import {Timer, TimeComponent} from "./config/timer.js";
import {ToDoItem, ToDoList} from "./todo-list/todo-list.js";
import Buttons from "./chat/buttons.js";
import ClickEvent from "./events/clickevent.js";

function init() {
  const userName = prompt("Hello! How should I call you?") || "buddy";

  const frequencyDOM = document.getElementById("config-frequency");
  const endTimeSubmitDOM = document.getElementById("submit-end-time");
  const endTimeEntryDOM = document.getElementById("end-time-input");

  const chatComponent = new ChatComponent();
  const config = new Config(userName, chatComponent, frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM);
  const toDoList = new ToDoList();
  const timer = new Timer(config, chatComponent);
  const buttons = new Buttons(config, timer);

  timer.runClock();
  timer.start();
}

init();
