import ChatComponent from "./chat/chat.js"
import Config from "./config/config.js";
import {Message, MessageWithClickEvent} from "./config/message.js";
import {Timer, TimeComponent} from "./config/timer.js";
import {ToDoItem, ToDoList} from "./todo-list/todo-list.js";
import Buttons from "./chat/buttons.js";
import ClickEvent from "./events/clickevent.js";

function init() {
  const userName = prompt("Hello! How should I call you?") || "buddy";
  document.getElementById("username").innerText = userName;

  const frequencyDOM = document.getElementById("config-frequency");
  const endTimeSubmitDOM = document.getElementById("submit-end-time");
  const endTimeEntryDOM = document.getElementById("end-time-input");
  const soundToggleDOM = document.getElementById("sound-toggle");

  const config = new Config(userName, soundToggleDOM, frequencyDOM, endTimeSubmitDOM, endTimeEntryDOM);
  const chatComponent = new ChatComponent();
  config.assignChatComponent(chatComponent);
  const toDoList = new ToDoList(config);
  const timer = new Timer(config, chatComponent);
  const buttons = new Buttons(config, timer);

  timer.runClock();
  timer.start();
}

const backToTopButton = document.getElementById("back-to-top-button");

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

init();
