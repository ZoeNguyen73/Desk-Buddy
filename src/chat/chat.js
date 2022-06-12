import Config from "../config/config.js"

export default class Chat {
  static Events = [
    {
        name: "random message",
        message: "Hang in there buddy!"
    },
    {
        name: "water",
        message: "Time for a water break!",
        userInputs: {
            opt1: "Yes! I am rehydrated"
        }
    },
    {
        name: "stretch",
        message: "How about a 5-min stretch?",
        userInputs: {
            opt1: "Done! Feeling much better now"
        }
    },
    {
        name: "break",
        message: "Wanna see something funny?",
        userInputs: {
            buttons: ["A random meme", "A random joke"]
        }
    }
  ]

  static BuddyProfilePicAttributes = {
      src: "./assets/images/buddy-profile-pic-cat.png",
      class: "buddy-chat-profile-pic",
      alt: "buddy-profile-pic"
  }

  static ScrollToBottom() {
      document.querySelector(".chat-content").scrollTop = document.querySelector(".chat-content").scrollHeight;
  }

  constructor(username = "Buddy") {
      this.username = username;
      this.config = new Config();
      this.#currentEvent = 0;
  }

  addChatMessage(text) {
      if (text === null) {
          return
      };

      const message = new Message(text)
      message.display()
  }

  createNewEventMessage() {
      (this.#currentEvent === this.#currentEvent.length - 1) ? this.#currentEvent = 0 : this.#currentEvent++;
      const newEvent = Chat.Events[this.#currentEvent];
      if (!newEvent.userInputs) {
          return
      };
      const chatContainerDom = document.querySelector(".chat-content")
      newEvent.render(chatContainerDom)
  }

  createNotif(type) {
      const newNotif = document.createElement("div");
      newNotif.setAttribute("class", "notif");
      if (type === "frequency") {
          newNotif.innerText =`Frequency has been changed to every ${this.config.frequency / 1000} seconds`;
      }
      if (type === "endTime") {
          let endHour = this.config.endHour;
          let session = "AM";

          if (endHour > 12) {
              endHour -= 12;
              session = "PM";
          } 
          newNotif.innerText =`End time has been changed to ${endHour}:${this.config.endMinute} ${session}`;
      }
      document.querySelector(".chat-content").append(newNotif);
  }
}
