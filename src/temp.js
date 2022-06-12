class Message {
  constructor(msg) {
    this.msg = msg
  }

  display() {
    const newMessage = document.createElement("div");
    newMessage.setAttribute("class", "buddy-message");
    newMessage.innerHTML = `
      <img src="./assets/images/buddy-profile-pic-cat.png" class="buddy-chat-profile-pic" alt="buddy profile pic">
      <p class="buddy-message-content">${text}</p>
    `
    document.querySelector(".chat-content").append(newMessage);
  }

  scrollToBottom() {
    const chatContainerDom = document.querySelector(".chat-content")
    chatContainerDom.scrollTop = chatContainerDom.scrollHeight;
  }
}

class EventMessage extends Message {
  constructor() {
    this.eventListerType = ''
  }
}

class Event {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }

  render(parentDom) {
    const newUserInput = document.createElement("div");
    if(this.eventListerType.length === 0) {
      newUserInput.addEventListener(this.eventListerType, this.listener)
    }
    parentDom.append(newUserInput);
  }

  listener() {
    throw new Error('Not implemented yet')
  }
}

class MessageEvent extends Event {
  constructor() {
    super()
  }
}

class ClickEvent extends Event {
  constructor() {
    super()
    this.eventListerType = 'click'
  }

  listener() {
    console.log('I am clicked')
  }
}
