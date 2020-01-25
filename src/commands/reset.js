const Discord = require("discord.js")
exports.run = async (client, message) => {

  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

  const response = await client.awaitReply(message, 
    "<:reboot:467216876938985482> This will clear the guild config and restore me to my default settings. Are you sure you want to do this?"
    );
  if (["y", "yes"].includes(response.toLowerCase())) {
    client.settings.set(message.guild.id, {});
    message.channel.send("<:success:466995111885144095> All settings have been restored to their default values.")
  } else {
    message.channel.send("<:success:466995111885144095> Action cancelled.")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  requiredPerms: []
};

exports.help = {
  name: "reset",
  category: "Configure",
  description: "Resets all settings to their default values.",
  usage: "reset"
};