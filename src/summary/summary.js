export class SummaryComponent {
  #water = document.getElementById("water-event-count");
  #stretch = document.getElementById("stretch-event-count");
  #break = document.getElementById("break-event-count");
  #task = document.getElementById("tasks-done-count");
  constructor() {
  }

  displayCount(type, number) {
    if (!type) {
      return
    };
    switch(type) {
      case "Water":
        this.#water.innerText = number;
        break;
      case "Stretch":
        this.#stretch.innerText = number;
        break;
      case "Break":
        this.#break.innerText = number;
        break;
      case "Tasks":
        this.#task.innerText = number;
      default:
        break;
    };
  }

}

export const summaryComponent = new SummaryComponent();