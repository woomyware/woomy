const API = require('nekos.life');
const {sfw} = new API();
exports.run = async (client, message) => {
  message.channel.startTyping();
  try {
    sfw.foxGirl().then((json) => {
      message.channel.send(json.url)
      message.channel.stopTyping();
    });
  } catch (err) {
    client.logger.error("foxgirl.js: " + err);
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`)
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: false, 
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "foxgirl",
  category: "Image",
  description: "Sends you pictures of fox girls.",
  usage: "foxgirl"
};
