const moment = require("moment");
module.exports = client => {

  const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
  const activityArray = client.commands.keyArray();
  
  client.lockActivity = false;

  let guild, channel, channel1;

  if(client.config.loggingServer.length > 0) {
    try {
      guild = client.guilds.cache.get(client.config.loggingServer)
    } catch(err) {
      client.logger.error("Could not find loggingServer server (is the ID valid?):\n" + err);
      process.exit(1);
    };

    if(client.config.consoleLogs.length > 0) {
      try {
        channel1 = guild.channels.cache.get(client.config.consoleLogs)
      } catch(err) {
        client.logger.error("Could not find consoleLogs channel (is the ID valid?):\n" + err);
        process.exit(1);
      };
    };

    if(client.config.startupLogs.length > 0) {
      try {
        channel = guild.channels.cache.get(client.config.startupLogs)
      } catch(err) {
        client.logger.error("Could not find startupLogs channel (is the ID valid?):\n" + err);
        process.exit(1);
      };
    };
  };

  if(client.devmode !== true) {
    client.logger.warn("Running in development mode.")
    prefix = client.config.defaultSettings.devprefix;
  } else {
    prefix = client.config.defaultSettings.prefix;
    if(channel) {
      channel.send(`Bot started at \`${timestamp}\``);
    };
  };

  let randomActivity = activityArray.random();
  
  client.user.setActivity(`${prefix + randomActivity} | v${client.version.number}`, {type: "PLAYING"});

  setInterval(() => {
    randomActivity = activityArray.random();
    if(client.lockActivity == false) {
      client.user.setActivity(`${prefix + randomActivity} | v${client.version.number}`, {type: "PLAYING"});
    };
  }, 30000);

  client.logger.log(`Connected to Discord as ${client.user.tag} | v${client.version.number}`, 'ready');
};
