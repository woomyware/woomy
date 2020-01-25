exports.run = async (client, message, args) => {
  const settings = (message.settings = client.getSettings(message.guild.id));

  if(!args[0]) {
    return message.channel.send(
      `<:error:466995152976871434> No user ID provided. Usage: \`${client.commands.get(`hackban`).help.usage}\``
      );
  };

  user = client.users.get(args[0])
  if(!user) {
    return message.channel.send("<:error:466995152976871434> Invalid ID")
  }

  if(message.guild.member(args[0])) {
    if(!message.guild.member(args[0]).bannable) {
      return message.channel.send("<:error:466995152976871434> User is not bannable.")
    }
  }

  let reason = args.slice(1).join(" ");
  if (!reason) reason = `Banned by ${message.author.tag}`;
  await message.guild.ban(args[0], reason).catch(console.error);
  message.channel.send(`<:success:466995111885144095> Hackbanned \`${user.tag}\``);
  
  if (settings.modlogsChannel !== "off") {
    const channel = message.guild.channels.find(
      channel => channel.name === settings.modlogsChannel
    );
  
    if (channel) {
    let embed = new Discord.RichEmbed();
      embed.setColor("#7c0136");
      embed.setAuthor("User preemptively banned!", user.avatarURL);
      embed.setDescription(`❯ User: ${user.tag} (${user.id})\n❯ Mod: ${message.author} (${message.author.id})\n❯ Reason: ${reason}`)
      try {
        channel.send({ embed });
      } catch (err) {
        // probably no permissions to send messages/embeds there
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
  name: "hackban",
  category: "Moderation",
  description: "Ban users who are not in the server.",
  usage: "ban [userID] <reason>"
};
