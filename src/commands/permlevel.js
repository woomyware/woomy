exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["plevel"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "permlevel",
  category: "Utility",
  description: "Tells you your permission level for that server.",
  usage: "permlevel"
};
