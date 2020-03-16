
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message) => {
  const duration = moment
    .duration(client.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");
  
  var mud = client.users.cache.get(client.config.owners[0]).tag;
  var flgx = client.users.cache.get(client.config.owners[1]).tag;
  var build;
  var prefix;

  if(message.guild) {
    prefix = message.settings.prefix;
  } else {
    prefix = client.config.defaultSettings.prefix;
  };

  if(client.devmode == true) {
    build = "development"
  } else {
    build = "production"
  }

  embed = new Discord.MessageEmbed();
    embed.setTitle(`Woomy`);
    embed.setColor(client.embedColour(message));
    embed.setThumbnail(client.user.avatarURL({format: "png", dynamic: true, size: 2048}))
    embed.addField(
      "General:", `• users: \`${client.users.cache.size}\`\n• channels: \`${client.channels.cache.size}\`\n• servers: \`${client.guilds.cache.size}\`\n• commands: \`${client.commands.size}\`\n• uptime: \`${duration}\``,true
      );
    embed.addField(
      `Technical:`, `• RAM Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\n• OS: \`${require("os").type}\`\n• bot version: \`${client.version.number} (${build})\`\n• discord.js version: \`v${version}\`\n• node.js version: \`${process.version}\``,true
      );
    embed.addField(
      "Links:", "[Support](https://discord.gg/HCF8mdv) | [GitHub](https://github.com/mudkipscience/woomy) | [db.org](https://discordbots.org/bot/435961704145485835/vote) | [BFD](https://botsfordiscord.com/bots/435961704145485835/vote) | [top.gg](https://discordbotlist.com/bots/435961704145485835) | [discord.js](https://discord.js.org/#/) | [guidebot](https://github.com/AnIdiotsGuide/guidebot/)"
      );
      
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["stats", "botinfo"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "about",
  category: "Utility",
  description: "Information about the bot, as well as a couple of helpful links",
  usage: "about"
};
