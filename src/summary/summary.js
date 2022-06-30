export class SummaryComponent {
  #doms = {
    Water: document.getElementById("water-event-count"),
    Stretch: document.getElementById("stretch-event-count"),
    Break: document.getElementById("break-event-count"),
    Task: document.getElementById("tasks-done-count")
  }
  
  constructor() {
  }

  displayCount(type, number) {
    if (!type) {
      return
    };
    this.#doms[type].innerText = number;
  }
}

export const summaryComponent = new SummaryComponent();