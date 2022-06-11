console.log("js file linked");

class Config {
    constructor(frequency = 30, endTime = "6pm") {
        this.frequency = frequency;
        this.endTime = endTime;
    }

    updateFrequency(userInput) {
        this.frequency = userInput;
    }

    updateEndTime(userInput) {
        this.endTime = userInput;
    }
}

class ToDoList {
    //
}

class Chat {
    static Events = {
        1 : "random message",
        2 : "water",
        3 : "stretch",
        4 : "break"
    }

    constructor(username = "Buddy") {
        this.username = username;
        this.config = undefined;
        this.toDoList = undefined;
        this.timer = 0;
        this.currentEvent = 1;
    }

    initialise() {
        this.config = new Config();
        this.toDoList = new ToDoList();
        // get current time, reset timer, etc
    }

    // method to trigger an event when timer meets config frequency
    // event triggered is based on this.currentEvent map against Events
    // once event is triggered, update this.currentEvent value

    //Random Message event
    //

}

function init() {
    //initialise everything here
    //prompt user name
    //create new Chat object
    //initialise the Chat object
}

init();