exports.run = (client, message, args, level) => {
  if(!args[0]) {
    return message.channel.send(
      `<:error:466995152976871434> No message provided. Usage: \`${client.commands.get(`echo`).help.usage}\``
    );
  };
  if (message.content.includes("@everyone")) {
    return message.channel.send(`<@${message.author.id}>`);
  };

  message.delete().catch(O_o => {});
  message.channel.send(args.join(" "));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["echo"],
  permLevel: "User",
  requiredPerms: ["MANAGE_MESSAGES"]
};

exports.help = {
  name: "say",
  category: "Fun",
  description: "Makes Woomy copy what the user says.",
  usage: "echo  <-hide> [message]"
};
