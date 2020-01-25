exports.run = (client, message) => {
  message.channel.send(`**${message.guild}'s** icon is:\n${message.guild.iconURL}`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sicon", "guildicon"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "servericon",
  category: "Utility",
  description: "Displays the icon for the server.",
  usage: "servericon"
};
