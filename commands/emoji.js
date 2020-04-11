exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User',
    requiredPerms: []
  };
  
exports.help = {
    name: 'emoji',
    category: 'Utility',
    description: 'Enlarges and links an custom emoji',
    usage: 'emoji [emoji]',
    params: '`[emoji] - Custom emoji you want to enlarge.'
};

exports.run = async (client, message, args) => {
    if(!args[0]) {
      return message.channel.send(`You need to specify a custom emoji. Usage: \`${client.commands.get(`emoji`).help.usage}\``)
    };
  
    var ID;
    var format = '.png'
    var string =  args[0].replace(/\D/g,'');
  
    if(args[0].charAt(1) == 'a' && args[0].charAt(2) == ':') {
      format = '.gif'
    };
    
    if(string.length > 18) {
      ID = string.slice(string.length - 18);
    } else {
      ID = string;
    };
  
    if(!ID) {
      return message.channel.send(`<:error:466995152976871434> Invalid emoji. This command only works with custom emojis.`)
    };
  
  
  
    message.channel.send('https://cdn.discordapp.com/emojis/' + ID + format)
};
  