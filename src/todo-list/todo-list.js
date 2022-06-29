import { Message } from "../config/message.js";
import Config from "../config/config.js";
import { summaryComponent } from "../summary/summary.js";

export class ToDoItem {
  constructor(task, id) {
    this.task = task;
    this.isDone = false;
    this.id = id;
  }
}

export class ToDoList {
  #toDoListComponent = new ToDoListComponent();
  #chatComponent = document.querySelector(".chat-content");
  #taskArray = []
  #summaryComponent = summaryComponent;
  
  constructor() {
    this.isFullyCompleted = false;
    this.#addSubmitListener();
    this.#addToDoListComponentListener();
  }

  #addSubmitListener() {
    const submitButton = document.getElementById("submit-todo");
    submitButton.addEventListener("click", () => {
      const text = document.getElementById("new-todo-item").value;
      this.#addNewItem(text);
      document.getElementById("new-todo-item").value = "";
    });

    const submitInput = document.getElementById("new-todo-item");
    submitInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
      };
    });
  }

  #addToDoListComponentListener() {
    this.#toDoListComponent.dom.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName !== "INPUT") {
        return
      };
      const id = target.id * 1;
      this.#updateTaskStatus(id, target.checked);
    });
  }

  #addNewItem(text) {
    if (text === "") {
      return
    };
    const id = this.#taskArray.length;
    const newItem = new ToDoItem(text, id);
    this.#taskArray.push(newItem);
    const newDom = this.#createDom(newItem);
    this.#toDoListComponent.display(newDom);
  }

  #createDom(item) {
    const newTaskDom = document.createElement("li");
    newTaskDom.setAttribute("class", "todo-item");
    newTaskDom.setAttribute("id", item.id);
    newTaskDom.innerHTML = `
      <span contenteditable="true">${item.task}</span>
      <label class="switch">
          <input type="checkbox" id="${item.id}">
          <span class="slider round"></span>
      </label>
    `;
    return newTaskDom;
  }

  #updateTaskStatus(id, newStatus) {
    this.#taskArray[id].isDone = newStatus;
    this.#summaryComponent.displayCount("Task", this.#getNumberOfTasksDone());
    if (newStatus) {
      this.#completeTaskMessage();
    };
  }

  #completeTaskMessage() {
    let text = "";
    const count = this.#getNumberOfTasksDone();
    if (this.#isFullyCompleted()) {
      text = `Congrats! You've done all that you've set out to do today :D`;
    } else {
      text = `Yay, you've completed ${count} ${count > 1 ? "tasks" : "task"} so far!`;
    };
    const message = new Message(text, Config.buddyPicUrl);
    this.#chatComponent.append(message.render());
    this.#chatComponent.scrollTop = this.#chatComponent.scrollHeight;
  }

  #isFullyCompleted() {
    for (let i = 0, j = this.#taskArray.length; i < j; i++) {
      if (!this.#taskArray[i].isDone) {
        return false;
      };
    };
    return true;
  }

  #getNumberOfTasksDone() {
    let count = 0;
    for (let i = 0, j = this.#taskArray.length; i < j; i++) {
      if (this.#taskArray[i].isDone) {
        count++;
      };
    };
    return count;
  }
}

export class ToDoListComponent {
  
  constructor() {
    this.dom = document.querySelector(".list");
  }

  display(domElement) {
    this.dom.append(domElement);
  }

}