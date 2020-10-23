const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js')
exports.run = async (client, message) => {  
  message.channel.startTyping();
  try {
    fetch('https://garfield-comics.glitch.me/~SRoMG/?date=xxxx')
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setTitle(`${json.data.name} (No. ${json.data.number})`)
          .setColor(client.embedColour(message))
          .setURL('https://www.mezzacotta.net/garfield/?comic=' + json.data.number)
          .setImage(json.data.image.src);
          message.channel.send(embed)
      });
    message.channel.stopTyping();
  } catch (err) {
    message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`)
    message.channel.stopTyping();
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: ["ATTACH_FILES"]
};

exports.help = {
  name: "garfield",
  category: "Fun",
  description: "Sends you a random garfield comic",
  usage: "garfield"
};
