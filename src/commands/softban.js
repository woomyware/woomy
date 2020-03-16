exports.run = async (client, message, args) => {
  const settings = (message.settings = client.getSettings(message.guild.id));
  
  if(!args[0]) {
    return message.channel.send(
      `<:error:466995152976871434> No username provided. Usage: \`${client.commands.get(`ban`).help.usage}\``
      );
  };
  
  let user = message.mentions.members.first();
    
  if (!user) {
    let users;
    users = client.searchForMembers(message.guild, args[0]);
    if (users.length > 1)
      return message.channel.send(
        "<:error:466995152976871434> Found multiple users! Please be more specific or mention the user instead."
      );
    else if (users.length == 0)
      return message.channel.send(
        "<:error:466995152976871434> That user doesn't seem to exist. Try again!"
      );
    user = users[0];
  };

  if(!user.bannable) {
    return message.channel.send(`<:error:466995152976871434> Specified user is not bannable.`)
  };

  let mod = message.guild.member(message.author);
  let bot = message.guild.member(client.user);

  if (user.roles.highest.position >= mod.roles.highest.position) {
    return message.channel.send(
      `<:error:466995152976871434> You can't softban people who are higher ranked than you are!`
    );
  };

  if (user.roles.highest.position >= bot.roles.highest.position) {
    return message.channel.send(
      `<:error:466995152976871434> I can't softban people who are higher ranked than you myself!`
    );
  };

  if(!user.bannable) {
    return message.channel.send(`<:error:466995152976871434> Specified user is not bannable.`)
  };

  var days = args[args.length - 1]
  try {
    days = Number(days);
  } catch(err) {};

  console.log(typeof days)
  console.log(days)

  if(isNaN(days)) {
    return message.channel.send(`<:error:466995152976871434> Invalid number. Did you forget to specify how many days worth of messages to clear? Usage: \`${client.commands.get(`softban`).help.usage}\``)
  } else if (days < 1 || days > 7) {
    return message.channel.send(`<:error:466995152976871434> Number too large/small. The max amount of days I can clear is 7.`)
  } else {
    await message.guild.members.ban(user, {reason: `Softbanned by ${message.author.tag}`, days: days});
    await message.guild.members.unban(user);
    message.channel.send(`<:success:466995111885144095> Softbanned \`${user.user.tag}\``);

    if (settings.modlogsChannel !== "off") {
      const channel = message.guild.channels.cache.find(
        channel => channel.name === settings.modlogsChannel
      );
    
      if (channel) {
      let embed = new Discord.MessageEmbed();
        embed.setColor("#F38159");
        embed.setAuthor("User softbanned!", user.user.avatarURL({format: "png", dynamic: true, size: 2048}));
        embed.setDescription(
          `• User: ${user.user.tag} (${user.user.id})\n• Mod: ${message.author} (${message.author.id})\n• Days cleared: ${days}`
        );
        try {
          channel.send(embed);
        } catch (err) {};
      };
    };
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: ["BAN_MEMBERS"]
};

exports.help = {
  name: "softban",
  category: "Moderation",
  description: "Bans then unbans a user, clearing their messages.",
  usage: "softban [user] [days]"
};
