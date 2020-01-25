exports.run = async (client, message, args) => {
  message.channel.send(
    `**Credits:**\n❯ \`mudkipscience#3739\` and \`FLGX#9896\`for developing the bot\n❯ \`An Idiots Guide\` for the Guidebot bot base\n❯ \`dellannie#6057\` for helping with the music commands\n❯ \`TheCakeChicken#9088\` and \`Tina the Cyclops girl#0064\` for helping me not suck at coding\n❯ \`AirVentTrent\` for the icon, find him on Instagram`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "credits",
  category: "Miscellaneous",
  description: "Cool people",
  usage: "credits"
};
