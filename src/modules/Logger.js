const chalk = require("chalk");
const moment = require("moment");

exports.log = (content, type = "log") => {
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`;
  const timestamp1 = `\`${moment().format("YYYY-MM-DD HH:mm:ss")}\`:`;

  let channel;

  try { channel = client.guilds.get('410990517841690625').channels.get('570963481189154822'); } catch(err) {}

  switch (type) {
    case "log": {
      try { if (client.user.id === "435961704145485835") {
        channel.send(`${timestamp1} ` + content);
      };
    } catch(err) {};
      return console.log(`${timestamp} ${chalk.cyanBright(`[${type.toUpperCase()}] -`)} ${content} `);
    };
    case "warn": {
      try { if (client.user.id === "435961704145485835") {
        channel.send(`${timestamp1} ` + content);
      };
    } catch(err) {};
      return console.log(`${timestamp} ${chalk.yellowBright(`[${type.toUpperCase()}]`)} ${content} `);
    };
    case "error": {
      try { if (client.user.id === "439594675230212096") {
        channel.send(`${timestamp1} ` + content);
      };
    } catch(err) {}
      return console.log(`${timestamp} ${chalk.redBright(`[${type.toUpperCase()}]`)} ${content} `);
    };
    case "debug": {
      try { if (client.user.id === "435961704145485835") {
        channel.send(`${timestamp1} ` + content);
      };
    } catch(err) {};
      return console.log(`${timestamp} ${chalk.magentaBright(`[${type.toUpperCase()}]`)} ${content} `);
    };
    case "cmd": {
      try { if (client.user.id === "435961704145485835") {
        channel.send(`${timestamp1} ` + content);
      };
    } catch(err) {};
      return console.log(`${timestamp} ${chalk.whiteBright(`[${type.toUpperCase()}]`)} ${content}`);
    };
    case "ready": {
      return console.log(`${timestamp} ${chalk.greenBright (`[${type.toUpperCase()}]`)} ${content}`);
    };
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  };
}; 

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");

exports.setClient = function(c)
{
  client = c;
};
