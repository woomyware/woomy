const urban = require("urban");
exports.run = (client, message) => {
  urban.random().first(json => {
    if(message.channel.nsfw === false) return message.channel.send(
      "<:error:466995152976871434> This command can only be executed in channels marked as NSFW!"
      );
    if(json.definition.length > 2000) return message.channel.send(
      `<:error:466995152976871434> Definition cannot exceed 2000 characters! Use this link instead: ${json.permalink}`
      );
    if(json.example.length > 2000) return message.channel.send(
      "<:error:466995152976871434> Example cannot exceed 2000 characters!"
      );
    
    embed = new Discord.RichEmbed()
    .setTitle(json.word)
    .setURL(json.permalink)
    .setColor("#EFFF00")
    .setDescription(json.definition || "None")
    .addField("Example", json.example || "None")
    .addField("Upvotes", json.thumbs_up, true)
    .addField("Downvotes", json.thumbs_down, true)
    .setFooter(`Submitted by ${json.author}`)
  message.channel.send(embed);

  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rurban"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "randurban",
  category: "Fun",
  description: "Grabs a random definition from the Urban Dictonary.",
  usage: "randurban"
};
