exports.run = async (client, message) => {// eslint-disable-line no-unused-vars

  // This actually shuts down the bot, you'll need to use something like pm2 to get it to restart

  await message.channel.send("<:reboot:467216876938985482> Restarting...");

  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });

  process.exit();
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
