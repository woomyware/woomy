// totally not stolen from https://github.com/GmdDjca/Hitomi-Manaka
exports.run = (client, message, args) => {
  if (!args[0]) {
    return message.channel.send(`<:error:466995152976871434> pwease incwude some text fow me to owoify UwU`)
  }
  const faces = ['(・`ω´・)', 'x3', 'owo', 'UwU', '>w<', '^w^']
  owoified = `${args.join(' ')}`.replace(/(?:r|l)/g, 'w')
  owoified = owoified.replace(/(?:R|L)/g, 'W')
  owoified = owoified.replace(/n([aeiou])/g, 'ny$1')
  owoified = owoified.replace(/N([aeiou])/g, 'Ny$1')
  owoified = owoified.replace(/N([AEIOU])/g, 'Ny$1')
  owoified = owoified.replace(/ove/g, 'uv')
  owoified = owoified.replace(/!+/g, ' ' + faces[~~(Math.random() * faces.length)] + ' ')

message.channel.send(owoified)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  requiredPerms: []
};

exports.help = {
  name: "owoify",
  category: "Fun",
  description: "Makes nyowmal tewxt owo'ed x3",
  usage: "owoify [message]"
};
