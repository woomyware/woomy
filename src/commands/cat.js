const API = require('nekos.life');
const {sfw} = new API();
exports.run = async (client, message) => {
  message.channel.startTyping();
  try {
    sfw.meow().then((json) => {
      message.channel.send(json.url)
      message.channel.stopTyping();
    });
  } catch (err) {
    client.logger.error("cat.js: " + err);
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
  name: "cat",
  category: "Image",
  description: "Sends you cat pics.",
  usage: "cat"
};
