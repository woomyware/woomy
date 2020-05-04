exports.run = async (client, message) => {
  message.channel.send(
    `Use this link to invite me to your server:\n<https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2134240503&scope=bot>`
    );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "invite",
  category: "Utility",
  description: "Sends you a link so you can add Woomy to your own servers",
  usage: "invite"
};
