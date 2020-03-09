Discord = require("discord.js");

const url = "https://www.minecraftskinstealer.com/achievement/a.php";

exports.run = (client, message, args) => {
  let text = args.join(" ");

  if (!text) {
    return message.channel.send(
      `<:error:466995152976871434> No text provided to turn into an achievement. Usage: \`${client.commands.get(`achievement`).help.usage}\``
    );
  };
  message.channel.startTyping();
  let params = "h=Achievement+Get%21&i=1&t=" + encodeURIComponent(text);

  try {
    message.channel.stopTyping();
    message.channel.send({
      files: [new Discord.MessageAttachment(url + "?" + params, "achievement.png")]
    });

  } catch(err) {
    message.channel.stopTyping();
    message.channel.send(`<:error:466995152976871434> Error when generating image: \`${err}\``)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: ["ATTACH_FILES"]
};

exports.help = {
  name: "achievement",
  category: "Fun",
  description: "Generates an minecraft achievement.",
  usage: "achievement [text]"
};
