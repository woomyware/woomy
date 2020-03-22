exports.run = async (client, message, args) => {

  var hearts = [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜"
  ];
  
  if(!args[0] || !args[1]) {
    return message.channel.send(`<:error:466995152976871434> Please include at least two names.`)
  }

  let names = [];
  let totalLength = 0;

  for(let i = 0; i < args.length; i++) {
    let arg = args[i];
    let name = client.getUserFromMention(arg).username;
    if(!name) {
      name = arg;
    };  
    names.push(name);
    totalLength += arg.length;
  }

  let lengthPerName = Math.floor(totalLength / names.length);

  let finalName = '';

  let last = -1;

  for(let i = 0; i < names.length; i++) {
    let name = names[i];
    let l = Math.min(lengthPerName, name.length);

    let p = name.substr(last + 1, last + l);

    console.log(p);

    finalName = finalName + p;

    last = last + l;
  };

  console.log(totalLength);
  console.log(names.length);
  console.log(lengthPerName);
  console.log(finalName);

  message.channel.send(`**Ship generator:**\n${hearts.random()} Ship name: \`${finalName}\`\n${hearts.random()} Compatibility rating:`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "ship",
  category: "Fun",
  description: "Ship two people together <3",
  usage: "ship name name2"
};

