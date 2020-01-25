Discord = require("discord.js");
urban = require("relevant-urban");
exports.run = async (client, message, args) => {
  if (message.channel.nsfw === false) return message.channel.send(
    "<:error:466995152976871434> This command can only be executed in channels marked as NSFW!"
    );
  if (args < 1) return message.channel.send(
    `<:error:466995152976871434> You did not tell me what to search for! Usage: \`${client.commands.get(`urban`).help.usage}\`
    `);
    let phrase = args.join(" ");
    let output = await urban(args.join(' ')).catch(e => {
      return message.channel.send("<:error:466995152976871434> No results found for `" + phrase + "`")
    });

  if(output.definition.length > 2000) return message.channel.send(
    `<:error:466995152976871434> Definition cannot exceed 2000 characters! Use this link instead: ${output.urbanURL}`
  );
  if(output.example.length > 2000) return message.channel.send(
    "<:error:466995152976871434> Example cannot exceed 2000 characters!"
  );

  embed = new Discord.RichEmbed()
    .setTitle(output.word)
    .setURL(output.urbanURL)
    .setColor("#EFFF00")
    .setDescription(output.definition || "None")
    .addField("Example", output.example || "None")
    .addField("Upvotes", output.thumbsUp, true)
    .addField("Downvotes", output.thumbsDown, true)
    .setFooter(`Submitted by ${output.author}`)
  message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "urban",
  category: "Fun",
  description: "Grabs a definition from the urban dictonary.",
  usage: "urban [word]"
};
