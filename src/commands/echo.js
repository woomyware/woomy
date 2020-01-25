exports.run = (client, message, args, level) => {
  if(!args[0]) {
    return message.channel.send(
      `<:error:466995152976871434> No message provided. 
    Usage: \`${client.commands.get(`echo`).help.usage}\``
    );
  };
  if (message.content.includes("@everyone")) return message.channel.send(message.author);
  const sayMessage = args.join(" ");
  message.delete().catch(O_o => {});
  message.channel.send(sayMessage);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "echo",
  category: "Fun",
  description: "Makes Woomy copy what the user says.",
  usage: "echo [message]"
};
