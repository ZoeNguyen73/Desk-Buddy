import ChatComponent from "./chat/chat.js"
import Config from "./config/config.js";
import {Message, MessageWithClickEvent} from "./config/message.js";
import {Timer, TimeComponent} from "./config/timer.js";
import {ToDoItem, ToDoList} from "./todo-list/todo-list.js";
import Buttons from "./chat/buttons.js";
import ClickEvent from "./events/clickevent.js";
import Modal from "./config/modal.js";

function init(userName) {
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

const welcomeBackModal = new Modal(document.getElementById("welcome-back-modal"));

const getNameModal = new Modal(document.getElementById("get-name-modal"));

function getUserName(getNameModal, welcomeBackModal) {
  let userName = localStorage.getItem("username");

  document.getElementById("submit-username").addEventListener("click", () => {
    const name = document.getElementById("new-username").value;
    if (!name || name === "") {
      getNameModal.display();
      document.getElementById("new-username").setAttribute("placeholder", "please enter a valid name");
      return
    };
    localStorage.setItem("username", name);
    getNameModal.close();
    userName = name;
    getNameModal.close();
    init(userName);
  });

  document.getElementById("skip").addEventListener("click", () => {
    userName = "buddy";
    localStorage.setItem("username", userName);
    getNameModal.close();
    init(userName);
  });

  document.getElementById("change-username").addEventListener("click", () => {
    welcomeBackModal.close();
    getNameModal.display();
  });

  document.querySelector("#start-the-day").addEventListener("click", () => {
    welcomeBackModal.close();
    init(userName);
  });

  // if no valid username in local storage
  if (!userName || userName === "" || userName === "buddy") {
    getNameModal.display();
    return
  };

  // if there is valid username in local storage
  document.getElementById("current-username").innerHTML = `<b>${userName}</b>`;
  welcomeBackModal.display();
}

getUserName(getNameModal, welcomeBackModal);
