
const fetch = require("node-fetch")
exports.run = async (client, message, args) => {
  const speech = args.join(' ');
  if (!speech) {
    return message.channel.send(`<:error:466995152976871434> Please include text for me to convert to yodish. Yes.`)
  };
  message.channel.startTyping();
  try{
    fetch(`http://yoda-api.appspot.com/api/v1/yodish?text=${encodeURIComponent(speech.toLowerCase())}`)
      .then(res => res.json())
      .then(json => message.channel.send(json.yodish));
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
  requiredPerms: []
};

  exports.help = {
  name: "yoda",
  category: "Fun",
  description: "Turns any text you input into yodish. Yes.",
  usage: "yoda <text>"
};