console.log("js file linked");

class Config {
    constructor(frequency = 5000, endHour = 14, endMinute = 25) {
        this.frequency = frequency;
        this.endHour = endHour;
        this.endMinute = endMinute;
    }

    updateFrequency(userInput) {
        this.frequency = userInput;
    }

    updateEndTime(newEndHour, newEndMinute) {
        // if the time keyed in is before current time, reject and prompt user to input again
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

        document.querySelector(".chat-content").scrollTop = document.querySelector(".chat-content").scrollHeight;
    }
    
    createNewEventMessage() {
        const newEvent = Chat.Events[this.currentEvent];
        // console.log(`Current event number is ${this.currentEvent} and the current event is ${newEvent}`);
        this.addChatMessage(newEvent.message);
        this.currentEvent === 4 ? this.currentEvent = 1 : this.currentEvent ++;

        // console.log(newEvent.userInputs);
        if (newEvent.userInputs === undefined) {
            return
        }

        const newUserInput = document.createElement("div");
        newUserInput.setAttribute("class", "user-input");

        Object.keys(newEvent.userInputs).forEach(option => {
            const userOption = document.createElement("button");
            userOption.innerText = newEvent.userInputs[option];
            newUserInput.append(userOption);
        });

        document.querySelector(".chat-content").append(newUserInput);

        document.querySelector(".chat-content").scrollTop = document.querySelector(".chat-content").scrollHeight;
    }   

}

function init() {
    const newChat = new Chat();

    // button to manually generate text message for testing
    document.getElementById("generate-message").addEventListener("click", function(event) {
        event.preventDefault();
        newChat.createNewEventMessage();
    });

    runClock();
    const runPrompt = setInterval(function() {newChat.createNewEventMessage()}, newChat.config.frequency);
    checkTime(runPrompt, newChat.config.endHour, newChat.config.endMinute);

    //when end time is extended, need a trigger to resume interval
}

let currentTime = undefined;

function runClock() {
    currentTime = new Date();
    let hh = currentTime.getHours();
    let mm = currentTime.getMinutes();
    let session = "";

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    session = hh > 11 ? "PM" : "AM";

    document.getElementById("clock").innerText = `${hh}:${mm} ${session}`;
    setTimeout(function(){ runClock() }, 30000);
}

function checkTime(intervalFunction, endHour, endMinute) {
    // console.log(`Current hr is ${currentTime.getHours()}, end hr is ${endHour}`);
    // console.log(`Current min is ${currentTime.getMinutes()}, end min is ${endMinute}`);
    if (endHour < currentTime.getHours() || (endHour === currentTime.getHours() && endMinute <= currentTime.getMinutes())) {
        console.log("time's up");
        clearInterval(intervalFunction);
        return
    };
    setTimeout(function(){ checkTime(intervalFunction, endHour, endMinute) }, 30000);
}

init();