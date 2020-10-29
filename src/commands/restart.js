const fetch = require('node-fetch');

exports.run = (client, message) => {// eslint-disable-line no-unused-vars

  // This actually shuts down the bot, you'll need to use something like pm2 to get it to restart

  message.channel.send("<:reboot:467216876938985482> Restarting...");
  
  client.destroy();
  require("util").promisify(setTimeout);

  fetch('https://gamecp.apex.to/api/client/servers/1fc76afa-9a4d-497b-983a-a898795ab5b5/power', {
    method: 'post',
    body: JSON.stringify({ 'signal': 'restart' }),
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${client.config.server}` }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Developer",
  requiredPerms: []
};

exports.help = {
  name: "restart",
  category: "Owner",
  description: "Restarts the bot.",
  usage: "restart"
};
