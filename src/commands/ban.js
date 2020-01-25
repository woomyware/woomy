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
  if (user.user.id === client.user.id) {
    return message.channel.send("lol no")
  };
  if (user.user.id === message.guild.owner.id) {
    return message.channel.send("<:error:466995152976871434> You can't ban the owner!")
  };
  let moderator = message.guild.member(message.author)
  if (user.highestRole.position >= moderator.highestRole.position && moderator.user.id !== message.guild.ownerID) {
    return message.channel.send(
      `<:error:466995152976871434> You can't ban people higher ranked than yourself!`
    );
  };

  let bot = message.guild.member(client.user)
  if (user.highestRole.position >= bot.highestRole.position) {
    return message.channel.send(
      `<:error:466995152976871434> I can't ban people who are higher ranked than me!`
    );
  };

  if (!user.bannable)
    return message.channel.send(
      "<:error:466995152976871434> Specified user is not bannable."
    );

  let reason = args.slice(1).join(" ");
  if (!reason) reason = `Banned by ${message.author.tag}`;
  await user.ban(reason).catch(console.error);
  message.channel.send(`<:success:466995111885144095> Banned \`${user.user.tag}\``);
  
  if (settings.modlogsChannel !== "off") {
    const channel = message.guild.channels.find(
      channel => channel.name === settings.modlogsChannel
    );
  
    if (channel) {
    let embed = new Discord.RichEmbed();
      embed.setColor("#BC0057");
      embed.setAuthor("User banned!", user.user.avatarURL);
      embed.setDescription(`❯ User: ${user.user.tag} (${user.user.id})\n❯ Mod: ${message.author} (${message.author.id})\n
      ❯ Reason: ${reason}`)
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
  name: "ban",
  category: "Moderation",
  description: "Bans specified user.",
  usage: "ban [user] <reason>"
};
