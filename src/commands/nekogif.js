const API = require('nekos.life');
const {sfw} = new API();
exports.run = async (client, message) => {
  message.channel.startTyping();
  try {
    sfw.nekoGif().then((json) => {
      message.channel.send(json.url);
      message.channel.stopTyping();
    });
  } catch (err) {
    client.logger.error("nekogif.js: " + err);
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`)
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: false, 
  guildOnly: false,
  aliases: ["catgirlgif"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "nekogif",
  category: "Image",
  description: "Sends you gifs of catgirls.",
  usage: "nekogif"
};
