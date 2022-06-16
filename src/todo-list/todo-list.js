export class ToDoItem {
  constructor(task) {
    this.task = task;
    this.isDone = false;
  }
}

export class ToDoList {
  static ToDoListDom = document.querySelector(".list");

  constructor() {
    this.taskArray = [];
    this.isFullyCompleted = false;
  }

  addNewItem(item) {
    const newTaskDom = document.createElement("li");
    newTaskDom.setAttribute("class", "todo-item");
    newTaskDom.innerHTML = `
      <span contenteditable="true">${item.task}</span>
      <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
      </label>
    `;
    ToDoList.ToDoListDom.append(newTaskDom);
  }
}