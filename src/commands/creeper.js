exports.run = async (client, message, args, level) => {
  const lyrics = [
"Aw man",
"so we back in the mine",
"Got our pickaxe swinging from side to side",
"side side to side",
"This task a grueling one",
"hope to find some diamonds tonight night night",
"Diamonds tonight",
"heads up",
"You hear a sound turn around and look up",
"total shock fills your body",
"Oh no it's you again",
"i can never forget those eyes eyes eyes",
"Eyes-eye-eyes",
"cause baby tonight",
"The creeper's tryna steal all our stuff again",
"cause baby tonight",
"You grab your pick, shovel and bolt again",
"and run run until it's done done",
"Until the sun comes up in the morn",
"cause baby tonight",
"The creeper's tryna steal all our stuff again",
"just when you think you're safe",
"Overhear some hissing from right behind",
"right right behind",
"That's a nice life you have",
"shame it's gotta end at this time time time",
"Time-time-time-time",
"blows up",
"Then your health bar drops and you could use a one up",
"get inside, don't be tardy",
"So now you're stuck in there",
"half a heart is left, but don't die die die",
"Die-die-die",
"cause baby tonight",
"The creeper's tryna steal all our stuff again",
"cause baby tonight",
"You grab your pick shovel and bolt again",
"and run run until it's done done",
"Until the sun comes up in the morn",
"cause baby tonight?",
"The creeper's tryna steal all our stuff again",
"dig up diamonds and craft those diamonds",
"And make some armor, get it baby",
"go and forge that like you so MLG pro",
"The sword's made of diamonds, so come at me bro, huh",
"training in your room under the torchlight",
"Hone that form to get you ready for the big fight",
"every single day and the whole night",
"Creeper's out prowlin', hoo, alright",
"look at me, look at you",
"Take my revenge, that's what I'm gonna do",
"i'm a warrior baby, what else is new",
"And my blade's gonna tear through you, bring it",
"cause baby tonight",
"The creeper's tryna steal all our stuff again",
"(gather your stuff, yeah, let's take back the world)",
"Yeah baby tonight",
"grab your sword armor and go",
"Take your revenge",
"so fight fight like it's the last last night",
"Of your life life show them your bite",
"cause baby tonight",
"The creeper's tryna steal all our stuff again",
"cause baby tonight",
"You grab your pick shovel and bolt again",
"and run run until it's done done",
"Until the sun comes up in the morn",
"cause baby tonight",
"The creeper's tryna steal all our stuff again"
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
        return message.channel.send("Those aren't the lyrics!")
      }
      runtop = false
    };
  } if (runtop === true) {
    runtop = false
    runbottom = true
  } else if (runbottom === true) {
    runtop = true
    runbottom = false
  }
  }
  message.channel.send("What a lovely duet!")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "creeper",
  category: "Fun",
  description: "Aww man",
  usage: "creeper"
};
