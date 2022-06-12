export default class Config {
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
