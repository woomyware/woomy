const identities = require ("../../resources/other/identities.json");
exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send("Missing arguments, please provide me with a query!")
  }

  const query = args.join("+")

  let link = ("https://lmgtfy.com/?q=" + query)

  if (message.flags.includes('d')) {
    link = "https://lmgtfy.com/?q=" + query + "&pp=1&s=d"
  }

  message.channel.send(link)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
}; 

exports.help = {
  name: "lmgtfy",
  category: "Fun",
  description: "For when you need to remind someone search engines exist..",
  usage: "lmgtfy <question>"
};
