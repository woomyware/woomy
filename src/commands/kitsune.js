const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
  message.channel.startTyping();
  try{
    fetch(`https://purrbot.site/api/img/sfw/kitsune/img/`)
      .then(res => res.json())
      .then(json => message.channel.send(json.link));
      message.channel.stopTyping();
  } catch(err) {
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ['foxgirl'],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "kitsune",
  category: "Image",
  description: "Sends you cute wholesome pictures of foxgirls.",
  usage: "kitsune"
};
