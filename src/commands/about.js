
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message) => {
  const duration = moment
    .duration(client.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");
  
  var mud = client.users.get(client.config.owners[0]).tag;
  var flgx = client.users.get(client.config.owners[1]).tag;
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

  embed = new Discord.RichEmbed();
    embed.setTitle(`Woomy`);
    embed.setColor(client.embedColour(message));
    embed.setDescription(
      `Woomy is a multipurpose bot developed by ${mud} and ${flgx}. You can suggest new features by joining my support server, 
      or using \`${prefix}feedback\``
      );
    embed.addField(
      "General", `users: \`${client.users.size}\`\nchannels: \`${client.channels.size}\`\nservers: \`${client.guilds.size}\`\ncommands: \`${client.commands.size}\`\nuptime: \`${duration}\``,true
      );
    embed.addField(
      `Technical`, `RAM Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\nOS: \`${require("os").type}\`\nbot version: \`${client.update.version} (${build})\`\ndiscord.js version: \`v${version}\`\nnode.js version: \`${process.version}\``,true
      );
    embed.addField(
      "Links", "[Support](https://discord.gg/HCF8mdv) | [GitHub](https://github.com/mudkipscience/woomy) | [db.org](https://discordbots.org/bot/435961704145485835/vote) | [BFD](https://botsfordiscord.com/bots/435961704145485835/vote) | [top.gg](https://discordbotlist.com/bots/435961704145485835) | [discord.js](https://discord.js.org/#/) | [guidebot](https://github.com/AnIdiotsGuide/guidebot/)"
      );
      
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["stats"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "about",
  category: "Utility",
  description: "Information about the bot, as well as a couple of helpful links",
  usage: "about"
};
