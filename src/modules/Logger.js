const chalk = require("chalk");
const moment = require("moment");

exports.log = (content, type = "log") => {
  const timestamp = chalk.grey(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`);

  let channel;

  try { channel = client.guilds.cache.get('410990517841690625').channels.cache.get('570963481189154822'); } catch(err) {}

  switch (type) {
    case "info": {
      try {
        if (client.devmode == false) {
          channel.send(`\`${timestamp}\`: ` + content);
        };
      } catch(err) {};
      return console.log(`${timestamp} ${chalk.cyanBright(`[${type.toUpperCase()}]`)} ${content} `);
    };

    case "warn": {
      try {
        if (client.devmode == false) {
          channel.send(`\`${timestamp}\`: ` + content);
        };
      } catch(err) {};
      return console.log(`${timestamp} ${chalk.yellowBright(`[${type.toUpperCase()}]`)} ${content} `);
    };

    case "error": {
      try {
        if (client.devmode == false) {
          channel.send(`\`${timestamp}\`: ` + content);
        };
      } catch(err) {}
      return console.log(`${timestamp} ${chalk.redBright(`[${type.toUpperCase()}]`)} ${content} `);
    };

    case "debug": {
      try {
        if (client.devmode == false) {
          channel.send(`\`${timestamp}\`: ` + content);
        };
      } catch(err) {};
      return console.log(`${timestamp} ${chalk.magentaBright(`[${type.toUpperCase()}]`)} ${content} `);
    };

    case "cmd": {
      try {
        if (client.devmode == false) {
          channel.send(`\`${timestamp}\` ` + content);
        };
      } catch(err) {};
      return console.log(`${timestamp} ${chalk.whiteBright(`[${type.toUpperCase()}]`)} ${content}`);
    };

    case "ready": {
      return console.log(`${timestamp} ${chalk.greenBright (`[${type.toUpperCase()}]`)} ${content}`);
    };

    default: throw new TypeError("Logger type must be either warn, debug, info, ready, cmd or error.");
  };
}; 

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.info = (...args) => this.log(...args, "info");

exports.cmd = (...args) => this.log(...args, "cmd");

exports.setClient = function(c) {
  client = c;
};
