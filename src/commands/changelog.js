exports.run = (client, message) => {
  message.channel.send(client.version.changelog)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["updates"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "changelog",
  category: "Utility",
  description: "Gives you the changes/features introduced with the latest update",
  usage: "changelog"
};
