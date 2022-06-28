import { Message } from "../config/message.js";
import Config from "../config/config.js";

export class ToDoItem {
  constructor(task, id) {
    this.task = task;
    this.isDone = false;
    this.id = id;
  }

}

export class ToDoList {
  #toDoListComponent = new ToDoListComponent();
  static chatComponent = document.querySelector(".chat-content");
  static taskArray =[]
  
  constructor() {
    this.isFullyCompleted = false;
    this.#addSubmitListener();
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

  #addNewItem(text) {
    if (text === "") {
      return
    };
    const id = ToDoList.taskArray.length;
    const newItem = new ToDoItem(text, id);
    ToDoList.taskArray.push(newItem);
    this.#toDoListComponent.display(newItem);
  }

  static updateTaskStatus(id, newStatus) {
    ToDoList.taskArray[id].isDone = newStatus;
    console.log(JSON.stringify(ToDoList.taskArray));
    if (newStatus) {
      ToDoList.completeTaskMessage();
    };
  }

  static completeTaskMessage() {
    let text = "";
    const count = ToDoList.getNumberOfTasksDone();
    if (ToDoList.isFullyCompleted()) {
      text = `Congrats! You've done all that you've set out to do today :D`;
    } else {
      text = `Yay, you've completed ${count} ${count > 1 ? "tasks" : "task"} so far!`;
    };
    const message = new Message(text, Config.buddyPicUrl);
    ToDoList.chatComponent.append(message.render());
    ToDoList.chatComponent.scrollTop = ToDoList.chatComponent.scrollHeight;
  }

  static isFullyCompleted() {
    for (let i = 0, j = ToDoList.taskArray.length; i < j; i++) {
      if (!ToDoList.taskArray[i].isDone) {
        return false;
      };
    };
    return true;
  }

  static getNumberOfTasksDone() {
    let count = 0;
    for (let i = 0, j = ToDoList.taskArray.length; i < j; i++) {
      if (ToDoList.taskArray[i].isDone) {
        count++;
      };
    };
    return count;
  }
}

export class ToDoListComponent {
  #dom = document.querySelector(".list");
  constructor() {
  }

  display(item) {
    const newTaskDom = document.createElement("li");
    newTaskDom.setAttribute("class", "todo-item");
    newTaskDom.setAttribute("id", item.id);
    newTaskDom.innerHTML = `
      <span contenteditable="true">${item.task}</span>
      <label class="switch">
          <input type="checkbox" id>
          <span class="slider round" id="${item.id}"></span>
      </label>
    `;
    this.#addEventListener(newTaskDom);
    this.#dom.append(newTaskDom);
  }

  #addEventListener(dom) {
    dom.addEventListener("click", (event) => {
      if (event.target.tagName !== "INPUT") {
        return
      };
      const target = event.currentTarget;
      const id = target.id * 1;
      const checkBox = target.querySelector("input");
      ToDoList.updateTaskStatus(id, checkBox.checked);
    });
  }
}