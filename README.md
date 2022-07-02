# Desk Buddy

## About **Desk Buddy**

**Note** 
* _There is currently a small bug that may cause the program to not work the first time you open it 😭. Do not fret and just reload the page - it should work afterwards!_
* I tried to blacklist certain types of jokes from being displayed. However, there is something wrong with the API and the results are not as expected. Apologies in advance if the program display any offensive jokes or memes...

### Project description
As more people work from home or remotely, **Desk Buddy** means to be a virtual "companion" to "work" alongside the user. The virtual buddy will provide **encouragements** and **timely reminders to take breaks** - similar to how a real life co-worker may do.

### Key functionalities
* At a set frequency (configurable by the user), send a message in the chat box. The message can be a random message, or an interactive reminder/prompt for break.
* Store user's to-do list and allow users to add/edit/complete tasks
* Capture a snapshot summary of the day
* Automatically ends the program at a set end time
* Note: for this demo version, frequency is set in _seconds_. For real-life usage, frequency will be set in _minutes_ instead.

### Link
[https://zoenguyen73.github.io/Desk-Buddy/src/index.html](https://zoenguyen73.github.io/Desk-Buddy/src/index.html)

### Instructions
* Simply load the page on a browser to get started
* Refresh the page to start a new session

### Technologies
* HTML
* CSS
* Javascript

### APIs used
* [Random Stuff Api](https://api-info.pgamerx.com/) - to randomly generate jokes and memes
* [Quotable API by Luke Peavey](https://github.com/lukePeavey/quotable) - to randomly generate quote

### Additional features for future development
* Music player (through Spotify API)
* AI message functionality to allow user to converse with buddy
* Configurable settings for buddy (name, profile pic, personality)
* Scheduling functionality to auto start and end session on a fixed schedule
* Theme/styling customisation
* Notepad functionality

---

## About my process

### Approach
* As **Desk Buddy** was my first project, my main objective was to apply the following key concepts I have learnt at the start of my coding journey:
  1. OOP paradigm
  2. CSS - Flex display and Responsive web design
  3. APIs

* Along the way, I also got to explore some new concepts and techniques (conventional commits, data flow, separating script to multiple js files, etc), which I managed to utilise in this project, albeit in still a relatively limited capacity.

### Accomplishments
* **Timer implementation**:
  * Date and time details are displayed in real time, based on user's current location
  * Events are triggered as a set frequency, and are stopped once end time has elasped

* **User interactions**:
  * Program is able to accept users' configurations (frequency and end time) and adjust the logic accordingly
  * User can interact with the program through clicks (Poke, End Day, Meme, etc)

* **To do list**:
  * Simple to do list functionalities, which allow users to add / edit / complete tasks
  
* **APIs**:
  * 2 different APIs are used in this program
  * Local storage is used to reduce API calls for random quotes

### Challenges
* While I was able to get the skeletonal program up and running quickly, I had a lot of issues with **data flow**. Visualising the program as separate components, and understanding how data flows between them were really challenging. There are definitely still room for improvements even at the end
* Despite having a plan at the start, things start to "mutate" as I learn **the "right ways" to do things**. Because of this, the project gets more complicated despite no change to the original scope.
* Admittedly, it did take me a while to grasp the differences between "private", "public" and "static" properties/methods. Happy to report that my understanding is much strengthened now.

### Credits
* Buddy Profile Pic from [Freepik](<https://www.flaticon.com/free-icons/cat" title="cat icons">)
