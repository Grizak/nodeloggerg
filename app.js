const path = require("path");
const fs = require("fs");

class LogManager {
  constructor(options = {}) {
    this.logFile = options.logFile || path.join(__dirname, "logs.txt");
    this.levels = options.levels || ["info", "warn", "error", "debug"];
    this.consoleOutput = options.consoleOutput !== false; // Default true
  }

  formatTimestamp() {
    const isoString = new Date().toISOString(); // e.g., 2024-12-21T11:10:23.061Z
    const [date, time] = isoString.split("T"); // Split into date and time
    const formattedTime = time.slice(0, 8); // Remove milliseconds and 'Z'

    return `${date} ${formattedTime}`; // e.g., 2024-12-21 11:10:23
  }

  log(level, message) {
    if (!this.levels.includes(level)) {
      throw new Error(`Invalid log level: ${level}`);
    }

    const timestamp = this.formatTimestamp();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

    // Write to console
    if (this.consoleOutput) {
      console.log(formattedMessage);
    }

    // Write to file
    fs.appendFileSync(this.logFile, formattedMessage + "\n", "utf8");
  }

  info(message) {
    this.log("info", message);
  }

  warn(message) {
    this.log("warn", message);
  }

  error(message) {
    this.log("error", message);
  }

  debug(message) {
    this.log("debug", message);
  }
}

module.exports = LogManager;