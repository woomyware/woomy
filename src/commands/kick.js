exports.run = async (client, message, args) => {
  const settings = client.getSettings(message.guild.id);

  if(!args[0]) {
    return message.channel.send("<:error:466995152976871434> Who am I meant to kick?")
  }

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
  }
if (user.user.id === client.user.id) {
  return message.channel.send("lol no")
}
if (user.user.id === message.guild.owner.id) {
  return message.channel.send("<:error:466995152976871434> You can't kick the owner!")
}
let moderator = message.guild.member(message.author)
if (user.roles.highest.position >= moderator.roles.highest.position && moderator.user.id !== message.guild.ownerID) {
  return message.channel.send(
    `<:error:466995152976871434> You can't kick people higher ranked than yourself!`
  );
}

let bot = message.guild.member(client.user)
if (user.roles.highest.position >= bot.roles.highest.position) {
  return message.channel.send(
    `<:error:466995152976871434> I can't kick people who are higher ranked than me!`
  );
}

if (!user.bannable)
  return message.channel.send(
    "<:error:466995152976871434> Specified user is not bannable."
  );

let reason = args.slice(1).join(" ");
if (!reason) reason = `Kicked by ${message.author.tag}`;
await user.kick(reason).catch(console.error);
message.channel.send(`<:success:466995111885144095> Kicked \`${user.user.tag}\``);

if (settings.modlogsChannel !== "off") {
  const channel = message.guild.channels.cache.find(
    channel => channel.name === settings.modlogsChannel
  );

    if (channel) {
    let embed = new Discord.MessageEmbed();
    embed.setColor("#fd0061");
    embed.setAuthor("User kicked!", user.user.avatarURL({format: "png", dynamic: true, size: 2048}));
    embed.setDescription(
      `• User: ${user.user.tag} (${user.user.id})\n• Mod: ${message.author} (${message.author.id})\n• Reason: ${reason}`
      );
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
  requiredPerms: ["KICK_MEMBERS"]
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kicks specified user.",
  usage: "kick [user] <reason>"
};
