exports.run = async (client, message, args) => {

  var name, name1;
  var rating = Math.floor(Math.random() * 100) + 1;
  var hearts = [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜"
  ];
  
  if(args.length < 2) {
    return message.channel.send(`<:error:466995152976871434> Please include two names/users.`)
  }

  if(message.guild && message.mentions.members && message.mentions.members.size > 0) {
      name = message.mentions.members.first().displayName;
  };

  if(message.guild && message.mentions.members && message.mentions.members.size > 1) {
    name1 = message.mentions.members.last().displayName;
  };

  if(!name) {
    name = args[0];
  };

  if(!name1) {
    name1 = args[1];
  };

  shipName = name.substring(0, client.intBetween(1,name.length))+name1.substring(client.intBetween(0,name1.length));

  message.channel.send(`__**Ship Generator:**__\n${hearts.random()} Ship Name: \`${shipName}\`\n${hearts.random()} Compatibility rating: \`${rating}%\``)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "ship",
  category: "Fun",
  description: "Ship two people together <3",
  usage: "ship name name2"
};

