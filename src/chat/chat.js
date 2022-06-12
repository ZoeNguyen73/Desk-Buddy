import Config from "../config/config.js"

export default class Chat {
  static Events = {
      1 : {
          name: "random message",
          message: "Hang in there buddy!"
      },
      2 : {
          name: "water",
          message: "Time for a water break!",
          userInputs: {
              opt1: "Yes! I am rehydrated"
          }
      },
      3 : {
          name: "stretch",
          message: "How about a 5-min stretch?",
          userInputs: {
              opt1: "Done! Feeling much better now"
          }
      },
      4 : {
          name: "break",
          message: "Wanna see something funny?",
          userInputs: {
              opt1: "A random meme",
              opt2: "A random joke"
          }
      }
  }

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
      this.currentEvent = 1;
  }

  addChatMessage(text) {
      if (text === null) {
          return
      };

      const newMessage = document.createElement("div");
      newMessage.setAttribute("class", "buddy-message");

      // create profile pic
      const buddyProfilePic = document.createElement("img");
      Object.keys(Chat.BuddyProfilePicAttributes).forEach(attr => {
          buddyProfilePic.setAttribute(attr, Chat.BuddyProfilePicAttributes[attr]);
      });
      newMessage.append(buddyProfilePic);

      // create chat message
      const messageContent = document.createElement("p");
      messageContent.innerText = text;
      messageContent.setAttribute("class", "buddy-message-content");
      newMessage.append(messageContent);

      document.querySelector(".chat-content").append(newMessage);
      Chat.ScrollToBottom();
  }

  createNewEventMessage() {
      const newEvent = Chat.Events[this.currentEvent];
      // console.log(`Current event number is ${this.currentEvent} and the current event is ${newEvent}`);
      this.addChatMessage(newEvent.message);
      this.currentEvent === 4 ? this.currentEvent = 1 : this.currentEvent ++;

      if (newEvent.userInputs === undefined) {
          return
      };

      const newUserInput = document.createElement("div");
      newUserInput.setAttribute("class", "user-input");

      Object.keys(newEvent.userInputs).forEach(option => {
          const userOption = document.createElement("button");
          userOption.innerText = newEvent.userInputs[option];
          newUserInput.append(userOption);
      });

      document.querySelector(".chat-content").append(newUserInput);
      Chat.ScrollToBottom();
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
