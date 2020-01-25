exports.run = async (client, message, args) => {
  if (!args[0])
    return message.channel.send(
      `<:error:466995152976871434> You did not ask me a question. Usage: \`${client.commands.get(`8ball`).help.usage}\``
    );

  var ball = [
    "No darndested clue.",
    "Stupid question. You should be ashamed of yourself for even asking.",
    "Yes!",
    "Not in your wildest dreams!",
    "No chance.",
    "Never.",
    "Just Google it.",
    "¯\\_(ツ)_/¯",
    "Possibly.",
    "There's a high chance.",
    "I'd rather not say."
  ];

  let mess = ball.random();
  var msg = message.content.toLowerCase();

  if (msg.includes("is donald trump a good president".toLowerCase())) {
    return message.channel.send(
      ":8ball: Stupid question. You should be ashamed of yourself for even asking."
    );
  };
  message.channel.send(":8ball: " + mess);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "Consult the 8ball for advice.",
  usage: "8ball [question]"
};
