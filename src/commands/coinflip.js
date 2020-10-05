exports.run = (client, message, args) => {
  if(!args[0]) {
    return message.channel.send(
      `<:error:466995152976871434> Invalid choice. Usage: \`${client.commands.get(`flip`).help.usage}\``
    );
  };

  if(args[0].toLowerCase() != "heads" && args[0].toLowerCase() != "tails") {
    return message.channel.send(
      `<:error:466995152976871434> Invalid choice. Usage: \`${client.commands.get(`coinflip`).help.usage}\``
    );
  };
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
  usage: "coinflip [heads/tails]"
};
