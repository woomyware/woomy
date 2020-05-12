exports.run = async (client, message, args) => {
    if (!args[0])
    return message.channel.send(
        `<:error:466995152976871434> What am I meant to rate? Usage: \`${client.commands.get(`rate`).help.usage}\``
    );
var rating = [
    "0/10",
    "1/10",
    "2/10",
    "3/10",
    "4/10",
    "5/10",
    "6/10",
    "7/10",
    "8/10",
    "9/10",
    "10/10"
];

if (message.content.includes("@everyone")) {
  return message.channel.send('>:(');
}

    let mess = rating.random();
    message.channel.send(`<:star:618393201501536258> I give ${args.join(" ")} a **${mess}**`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    requiredPerms: []
};

exports.help = {
    name: "rate",
    category: "Fun",
    description: "Gives something a rating from 0-10",
    usage: "rate [thing]"
};