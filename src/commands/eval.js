exports.run = async (client, message, args) => {
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(`\`OUTPUT\` \`\`\`js\n${await clean}\n\`\`\``);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Developer",
  requiredPerms: []
};

exports.help = {
  name: "eval",
  category: "Owner",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [code]"
};
