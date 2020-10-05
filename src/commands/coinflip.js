exports.run = (client, message, args) => {
  var coin = [
    "Heads!",
    "Tails!"
  ];

  let mess = coin.random();
  message.channel.send(mess);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["flip"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "coinflip",
  category: "Fun",
  description: "Flips a coin!",
  usage: "coinflip"
};
