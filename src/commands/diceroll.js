exports.run = async (bot, message, args) => {
    if (args.length === 0) {
      message.channel.send(`🎲 You rolled a ${Array.from(Array(6).keys()).random() + 1}!`);
    } else {
      if (args[0].match(/^\d+$/)) {
        message.channel.send(`🎲 You rolled a ${Array.from(Array(parseInt(args[0])).keys()).random() + 1}!`);
      } else {
        message.channel.send(`🎲 You rolled a ${Array.from(Array(6).keys()).random() + 1}!`);
      }
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["diceroll"],
    permLevel: "User",
    requiredPerms: []
  };
  
  exports.help = {
    name: "dice",
    category: "Fun",
    description: "Rolls a dice.",
    usage: "dice"
  };
  
