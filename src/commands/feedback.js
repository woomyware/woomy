exports.run = (client, message, args, level) => {
  if(!args[0]) return message.channel.send(`<:error:466995152976871434> You didn't give me any feedback! Usage: \`${client.commands.get(`feedback`).help.usage}\``)
  const feedback = args.join(" ")
  let guild = client.guilds.cache.get("410990517841690625")
  let channel = guild.channels.cache.get("438825830949453824")
  let embed = new Discord.MessageEmbed()
      .setTitle(`Feedback:`)
      .setColor(client.embedColour(message))
      .addField("User:",message.author.tag)
      .addField("Feedback: ", feedback)
  channel.send({embed: embed})
  message.channel.send("<:success:466995111885144095> Your feedback has been sent to my developer. Thank you!")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["suggest"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "feedback",
  category: "Miscellaneous",
  description: "Send feedback to my developer.",
  usage: "feedback [message]"
};
