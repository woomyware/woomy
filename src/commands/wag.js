const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
  message.channel.startTyping();
  try{
    fetch(`https://purrbot.site/api/img/sfw/tail/gif/`)
      .then(res => res.json())
      .then(json => message.channel.send(json.link))
      .catch(err => {
        message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
      });
      message.channel.stopTyping();
  } catch(err) {
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
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
  name: "wag",
  category: "Image",
  description: "Wag the tail :3",
  usage: "wag"
};
