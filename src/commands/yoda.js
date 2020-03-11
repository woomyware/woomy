
const request = require('request')
exports.run = async (client, message, args) => {
    const speech = args.join(' ');
    if (!args[0]) {
        return message.channel.send(`<:error:466995152976871434> Please include text for me to convert to yodish. Yes.`)
      }
    try {
    const { text } = request({ uri: `http://yoda-api.appspot.com/api/v1/yodish?text=${encodeURIComponent(speech.toLowerCase())}`, json: true }, (error, response, body) => {
    message.channel.send(JSON.parse(text).yodish)
    });
 } catch(err) {
        message.channel.send(`<:error:466995152976871434> API error: ${err}`);
        message.channel.stopTyping();
 }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yoda","yodasay"],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "yodish",
    category: "Fun",
    description: "Turns any text you input into yodish. Yes.",
    usage: "yodish <text>"
  };