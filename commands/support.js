exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User',
    requiredPerms: []
};

exports.help = {
    name: 'support',
    category: 'Utility',
    description: "Sends a link to " + client.config.botName + "'s support/development server.",
    usage: 'support'
};

exports.run = async (client, message, args) =>{
    message.channel.send('Use this link to join my support server: https://discord.gg/' + client.config.support.id);
};