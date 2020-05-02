const Discord = require("discord.js");
const lyric = require('../../resources/other/lyrics.json')
exports.run = async (client, message, args, level) => {
  const lyrics = lyric.bohemian_rhapsody;
  var runtop = true;
  var runbottom = false;
  for(var br = 0; br < lyrics.length; br++) {
    {
      if (runtop === true) {
    var response = await client.awaitReply(message, lyrics[br]);
    runbottom = false;
    };

    if (runbottom === true) {
      if (response !== lyrics[br]) {
        return message.channel.send("Those aren't the lyrics!");
      }
      runtop = false
    };
  };
  if (runtop === true) {
    runtop = false
    runbottom = true
  } else if (runbottom === true) {
    runtop = true
    runbottom = false
  };
  };
  message.channel.send("What a lovely duet!");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["br"],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "bohemian_rhapsody",
  category: "Fun",
  description: "Queen karaoke",
  usage: "bohemian_rhapsody"
};
