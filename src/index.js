import ChatComponent from "./chat/chat.js"
import Config from "./config/config.js";
import {Message, MessageWithClickEvent} from "./config/message.js";
import {Timer, TimeComponent} from "./config/timer.js";
import {ToDoItem, ToDoList} from "./todo-list/todo-list.js";

function init() {
  const config = new Config();
  const chatComponent = new ChatComponent();
  const messageWithClickEvent = new MessageWithClickEvent();
  const timer = new Timer(config, chatComponent);
  timer.runClock();
  timer.start();
}

init();
