const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  const lyrics = [
    "Is this the real life?",
    "i this just fantasy?",
    "Caught in a landslide, no escape from reality",
    "open your eyes, look up to the skies and see",
    "I'm just a poor boy, I need no sympathy",
    "because I'm easy come, easy go, little high, little low",
    "Any way the wind blows doesn't really matter to me, to me",
    "mama, just killed a man",
    "Put a gun against his head, pulled my trigger, now he's dead",
    "mama, life had just begun",
    "But now I've gone and thrown it all away",
    "mama, ooh, didn't mean to make you cry",
    "If I'm not back again this time tomorrow",
    "carry on, carry on as if nothing really matters",
    "Too late, my time has come",
    "sends shivers down my spine, body's aching all the time",
    "Goodbye, everybody, I've got to go",
    "gotta leave you all behind and face the truth",
    "Mama, ooh, (Anyway the wind blows)",
    "i don't wanna die",
    "I sometimes wish I'd never been born at all",
    "i see a little silhouetto of a man",
    "Scaramouche! Scaramouche! will you do the Fandango?",
    "thunderbolt and lightning, very, very fright'ning me",
    "(Galileo) Galileo, (Galileo) Galileo, Galileo Figaro magnifico",
    "i'm just a poor boy, nobody loves me",
    "He's just a poor boy from a poor family",
    "spare him his life from this monstrosity",
    "Easy come, easy go, will you not let me go?",
    "bismillah! No, we will not let you go",
    "(Let him go!) Bismillah! We will not let you go",
    "(let him go!) Bismillah! We will not let you go",
    "(Let me go) Will not let you go",
    "(let me go) Will not let you go",
    "(Let me go) Ah",
    "no, no, no, no, no, no, no",
    "(Oh mamma mia, mamma mia) Mamma mia, let me go",
    "beelzebub has the devil put aside for me, for me, for me!",
    "So you think you can stone me and spit in my eye?",
    "so you think you can love me and leave me to die?",
    "Oh baby, can't do this to me, baby!",
    "just gotta get out, just gotta get right outta here!",
    "Nothing really matters, anyone can see",
    "nothing really matters",
    "Nothing really matters, to me",
    "any way the wind blows"
  ];

  var runtop = true;
  var runbottom = false;
  for(var br = 0; br < lyrics.length; br++) {
    {
      if (runtop === true) {
    var response = await client.awaitReply(message, lyrics[br]);
    response = response.toLowerCase();
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
  description: "Queen kareoke",
  usage: "bohemian_rhapsody"
};
