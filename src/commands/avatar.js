exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  let users;
  if (!args[0] || !message.guild) {
    user = message.author;
  };

  if (!user && message.guild) {
    users = client.searchForMembers(message.guild, args[0]);
    if (users.length > 1) {
      return message.channel.send(
        "<:error:466995152976871434> Found multiple users, please be more specific or mention the user instead."
      );
    } else if (users.length == 0) {
      return message.channel.send(
        "<:error:466995152976871434> That user doesn't seem to exist, try again!"
      );
    };
    user = users[0];
    user = user.user;
  }
  message.channel.send(`**${user.tag}'s** avatar is: ${user.avatarURL({format: "png", dynamic: true, size: 2048})}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "avatar",
  category: "Utility",
  description: "Gives you the specified users avatar.",
  usage: "avatar <user>"
};
