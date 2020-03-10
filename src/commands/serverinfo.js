exports.run = (client, message) => {

  var guild = message.guild
  var badges = "";
  var members = `${guild.memberCount} (${guild.memberCount-guild.members.cache.filter(member => member.user.bot).size} users | ${guild.members.cache.filter(member => member.user.bot).size} bots)`;

  var roles = 0;
  guild.roles.cache.forEach((role) => {
    roles = roles + 1; 
  });

  var channels = 0;
  var categories = 0;
  var text = 0;
  var voice = 0;

  guild.channels.cache.forEach((channel) => {
    if(channel.type == "category") {
      categories = categories + 1;
    } else {
      if(channel.type == "text") {
        text = text + 1;
      };

      if(channel.type == "voice") {
        voice = voice + 1;
      };

      channels = channels + 1;
    };
  });

  var channelString = `${channels} (${text} text | ${voice} voice | ${categories} categories)`

  if(guild.premiumTier > 0) {
    badges = badges += "<:boosted:685704824175853624> "
  }

  if(guild.partnered == true) {
    badges = badges += "<:partnered:685704834779054107> "
  }

  if(guild.verified == true) {
    badges = badges += "<:verified:685704812435734569>"
  }

  if(badges.length > 0) {
    badges = badges += "\n"
  }

  var boosts;
  if(guild.premiumTier == 1) {
    boosts = `${guild.premiumSubscriptionCount} (level 1)`
  } else if(guild.premiumTier == 2) {
    boosts = `${guild.premiumSubscriptionCount} (level 2)`
  } else if(guild.premiumTier == 3) {
    boosts = `${guild.premiumSubscriptionCount} (level 3)`
  } else {
    boosts = guild.premiumSubscriptionCount;
  };

  var emojis = 0;
  var static = 0;
  var animated = 0;

  guild.emojis.cache.forEach((emoji) => {
    if(emoji.animated == true) {
      animated = animated + 1;
    } else {
      static = static + 1;
    };
    emojis = emojis + 1;
  });

  emojiString = `${emojis} (${static} static | ${animated} animated)`

  let embed = new Discord.MessageEmbed()
  .setColor(message.guild.member(client.user).displayHexColor)
  .setTitle(guild.name)
  .setDescription(`${badges}• **ID:** ${guild.id}\n• **Owner:** ${guild.owner}\n• **Region:** ${guild.region.toProperCase()}\n• **Boosts:** ${boosts}\n• **Members:** ${members}\n• **Channels:** ${channelString}\n• **Roles:** ${roles}\n• **Emojis:** ${emojiString}\n• **Creation date:** ${guild.createdAt}`)
  .setThumbnail(message.guild.iconURL({format: "png", dynamic: true, size: 2048}));

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
