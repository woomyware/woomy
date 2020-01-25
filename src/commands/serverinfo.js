exports.run = (client, message) => {

  let guild = message.guild
  
  var roleCount = 0;
  let roles = guild.roles
  roles.forEach((role) => { roleCount = roleCount + 1; });

  var chanCount = 0;
  let channels = guild.channels
  channels.forEach((channel) => { chanCount = chanCount + 1; });

  var emojiList = "";
  let emojis = guild.emojis;
  emojis.forEach((emoji) => { emojiList = emojiList + emoji; });
  eListOutput = `\n**Emojis:** ${emojiList}`;
  if(emojiList === "") eListOutput = "";

  let vlvl = guild.verificationLevel;
  if(vlvl === 0) vlvl = "None";
  if(vlvl === 1) vlvl = "Low";
  if(vlvl === 2) vlvl = "Medium";
  if(vlvl === 3) vlvl = "(╯°□°）╯︵ ┻━┻"
  if(vlvl === 4) vlvl = "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"

  content = `**ID:** ${guild.id}\n**Owner:** ${guild.owner}\n**Region:** ${guild.region}\n**Verification Level:** ${vlvl}\n**Members:** ${guild.memberCount}\n**Roles:** ${roleCount}\n**Channels:** ${chanCount}\n**Created:** ${guild.createdAt}${eListOutput}`;
  if (content.length > 2048) {
    eListOutput = "";
  }

  let embed = new Discord.RichEmbed()
  .setColor(message.guild.member(client.user).displayHexColor)
  .setAuthor(guild.name)
  .setDescription(content)
  .setThumbnail(message.guild.iconURL);

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sinfo", "guildinfo", "ginfo", "server"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "serverinfo",
  category: "Utility",
  description: "Displays some useful information about the current server.",
  usage: "serverinfo"
};
