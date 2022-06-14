console.log("js file linked");

import Chat from "./chat/chat.js"
import Message from "./config/message.js";

class ToDoList {
    //
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
    // console.log(`Current frequency is ${interval}`);
    // console.log(`Last msg time is ${lastMsgTime}`);
    // console.log(`Current time is ${currentTime.getTime()}`);
    // console.log(`The gap is ${currentTime.getTime() - lastMsgTime}`);

    //if toStop = true, return
    if (toStop(chat.config)) {
        console.log("Time's up");
        const endMessage = new Message(`It's the end of day~ Good bye!`);
        endMessage.display(Chat.ChatBoxDom);
        endMessage.scrollToBottom();
        return
    };

    //if interval frequency has laspsed, send new msg
    if (currentTime.getTime() - lastMsgTime >= interval) {
        chat.triggerEvent();
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
        chat.config.setFrequency(newFrequency);
        chat.triggerNotif("frequency");
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
        chat.triggerNotif("endTime");
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
    });
}

function init() {

    // TO ADD: Prompt user for name

    const newChat = new Chat();
    const lastMsgTime = new Date().getTime();

    addConfigListeners(newChat);
    addGenerateMsgListener(newChat);
    addEndDayListener(newChat);
    runClock();
    runChatInterval(newChat, lastMsgTime);
}

init();
