const url = "https://demirramon.com/gen/undertale_text_box.png";
exports.run = (client, message, args) => {
	let text = args.join(" ");
	
  if (!text) {
    return message.channel.send(
      `<:error:466995152976871434> No message provided. Usage: \`${client.commands.get(`sans`).help.usage}\``
    );
  }
  
	let params = "box=undertale&boxcolor=white&character=undertale-sans&expression=default&charcolor=white&font=determination&asterisk=true&mode=regular&text=" + encodeURIComponent(text);
  
	message.channel.send({files: [new Discord.Attachment(url + "?" + params, "undertale.png")]});	
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["undertale"],
  permLevel: "User",
  requiredPerms: ["ATTACH_FILES"]
};

exports.help = {
  name: "sans",
  category: "Fun",
  description: "Generates a sans text box",
  usage: "sans [message]"
};