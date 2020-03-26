const API = require('nekos.life');
const {sfw} = new API();
exports.run = async (client, message) => {
  message.channel.startTyping();
  try {
    sfw.smug().then((json) => {
      embed = new Discord.MessageEmbed();
      embed.setImage(json.url)
      embed.setColor(client.embedColour(message));
      message.channel.send(embed)
      message.channel.stopTyping();
    });
  } catch (err) {
    client.logger.error("smug.js: " + err);
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`)
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "smug",
  category: "Action",
  description: "Sends a smug gif.",
  usage: "smug"
};
