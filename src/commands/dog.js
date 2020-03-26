const API = require('nekos.life');
const {sfw} = new API();
exports.run = async (client, message) => {
  message.channel.startTyping();
  try {
    sfw.woof().then((json) => {
      message.channel.send(json.url)
      message.channel.stopTyping();
    });
  } catch (err) {
    client.logger.error("dog.js: " + err);
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`)
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "dog",
  category: "Image",
  description: "Sends you dog pics.",
  usage: "dog"
};
