console.log("js file linked");

class Config {
    constructor(frequency = 5000, endHour = 23, endMinute = 55) {
        this.frequency = frequency;
        this.endHour = endHour;
        this.endMinute = endMinute;
    }

    updateFrequency(userInput) {
        this.frequency = userInput;
    }

    updateEndTime(newEndHour, newEndMinute) {
        // TO ADD: if the time keyed in is before current time, reject and prompt user to input again
        this.endHour = newEndHour;
        this.endMinute = newEndMinute;
    }
}

class ToDoList {
    //
}

class Chat {
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
        src: "./images/buddy-profile-pic-cat.png",
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

    createEndDayMessage() {
        this.addChatMessage(`It's the end of day~ Good bye!`);
        Chat.ScrollToBottom();
    }

}

let currentTime = undefined;

function runClock() {
    currentTime = new Date();
    let hh = currentTime.getHours();
    let mm = currentTime.getMinutes();
    let session = hh > 12 ? "PM" : "AM";

    hh = (hh < 10) ? "0" + hh : hh;
    hh = (hh > 12) ? hh - 12 : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    

    document.getElementById("clock").innerText = `${hh}:${mm} ${session}`;
    setTimeout(function(){ runClock() }, 1000);
}

function runChatInterval(chat, lastMsgTime) {
    const interval = chat.config.frequency;
    console.log(`Current frequency is ${interval}`);
    console.log(`Last msg time is ${lastMsgTime}`);
    console.log(`Current time is ${currentTime.getTime()}`);
    console.log(`The gap is ${currentTime.getTime() - lastMsgTime}`);

    //if toStop = true, return
    if (toStop(chat.config)) { 
        console.log("Time's up");
        chat.createEndDayMessage();
        return 
    };

    //if interval frequency has laspsed, send new msg
    if (currentTime.getTime() - lastMsgTime >= interval) {
        chat.createNewEventMessage();
        lastMsgTime = currentTime.getTime();
    };

    setTimeout(function(){ runChatInterval(chat, lastMsgTime) }, 1000);
}

function toStop(config) {
    const endHour = config.endHour;
    const endMinute = config.endMinute;
    return (endHour < currentTime.getHours() || (endHour === currentTime.getHours() && endMinute <= currentTime.getMinutes()))
}

function addConfigListeners(chat) {
    //frequency change
    document.getElementById("config-frequency").addEventListener("change", function() {
        const newFrequency = document.getElementById("config-frequency").value * 1000;
        chat.config.updateFrequency(newFrequency);
        chat.createNotif("frequency");
        Chat.ScrollToBottom();
    })

    //end time change
    document.getElementById("config-end-time").addEventListener("change", function() {
        let newEndHour = document.getElementById("config-end-hour").value * 1;
        const newEndMinute = document.getElementById("config-end-minute").value * 1;

        if (document.getElementById("config-end-session").value === "PM" && newEndHour < 12) {
            newEndHour += 12;
        };

        if (document.getElementById("config-end-session").value === "AM" && newEndHour === 12) {
            newEndHour = 0;
        };

        chat.config.updateEndTime(newEndHour, newEndMinute);
        chat.createNotif("endTime");
        Chat.ScrollToBottom();
    })
}

function addGenerateMsgListener(chat) {
    // button to manually generate text message for testing
    document.getElementById("generate-message").addEventListener("click", function(event) {
        event.preventDefault();
        chat.createNewEventMessage();
    });
}

function addEndDayListener(chat) {
    // button to manually generate text message for testing
    document.getElementById("end-the-day").addEventListener("click", function(event) {
        event.preventDefault();
        chat.config.updateEndTime(currentTime.getHours(), currentTime.getMinutes());
        // chat.createEndDayMessage();
    });
}

function init() {

    // TO ADD: Prompt user for name

    const newChat = new Chat();
    let lastMsgTime = new Date().getTime();
    
    addConfigListeners(newChat);
    addGenerateMsgListener(newChat);
    addEndDayListener(newChat);
    runClock();
    runChatInterval(newChat, lastMsgTime);
}

init();