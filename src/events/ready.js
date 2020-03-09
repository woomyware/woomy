const moment = require("moment");
module.exports = client => {

  const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
  const activityArray = client.commands.keyArray();
  
  client.lockActivity = false;

  client.logger.log(`Connected to Discord as ${client.user.tag} | v${client.version.number}`, 'ready');

  let channel;
  let channel1;

  try { channel = client.guilds.cache.get('410990517841690625').channels.cache.get('570963998342643732'); } catch(err) {};
  try { channel1 = client.guilds.cache.get('410990517841690625').channels.cache.get('570963481189154822'); } catch(err) {};

  if(client.devmode == true) {
    client.logger.warn("Running in development mode.")
    prefix = client.config.defaultSettings.devprefix;
  } else {
    prefix = client.config.defaultSettings.prefix;
    channel.send(`\`${timestamp}\`: Ready event fired! Connected to ${client.users.size} users in ${client.guilds.size} guilds.`);
    channel1.send(`\`${timestamp}\`: **Ready event fired**`);
  }

  let randomActivity = activityArray.random();
  
  client.user.setActivity(`${prefix + randomActivity} | v${client.version.number}`, {type: "PLAYING"});
  setInterval(() => {
    randomActivity = activityArray.random();
    if(client.lockActivity == false) client.user.setActivity(`${prefix + randomActivity} | v${client.version.number}`, {type: "PLAYING"});
  }, 30000);
};
