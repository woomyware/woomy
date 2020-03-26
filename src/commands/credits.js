exports.run = async (client, message, args) => {
  message.channel.send(
    `__**Credits:**__\n• \`mudkipscience#8904\`, \`FLGX#9896\` and \`TheCakeChicken#9088\` for developing the bot\n• \`An Idiots Guide\` for the Guidebot bot base\n• \`Tina the Cyclops girl#0064\` for helping me not suck at coding\n• \`AirVentTrent\` for the icon, find him on Instagram\n• \`Terryiscool160\` for contributing to Woomy.`
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
  category: "Utility",
  description: "Cool people",
  usage: "credits"
};
