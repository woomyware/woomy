exports.run = (client, message, args, level) => {
  const settings = message.settings;

  if(message.channel.name === settings.chatlogsChannel) {
    return message.channel.send("<:error:466995152976871434> Can't purge logs.")
  }

  if(message.channel.name === settings.modlogsChannel) {
    return message.channel.send("<:error:466995152976871434> Can't purge logs.")
  }
  const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
  if(amount > 100) {
    return message.channel.send("<:error:466995152976871434> Can only purge a maximum of 100 messages!")
  }

    if (!amount) return message.channel.send(
      '<:error:466995152976871434> You didn\'t tell me how many messages to purge. Usage: \`' + client.commands.get(`purge`).help.usage + "`"
      );
    
    message.delete().catch(O_o => {});

    message.channel.fetchMessages({
      limit: amount,
    }).then((messages) => {
      message.channel.bulkDelete(messages, true).catch(console.error);
      message.channel.send(`<:success:466995111885144095> Purged ${amount} messages!`).then(m => m.delete(5000));
    });

    if (settings.modlogsChannel !== "off") {
      const channel = message.guild.channels.find(
        channel => channel.name === settings.modlogsChannel
      );
    
      if (channel) {
      let embed = new Discord.RichEmbed();
        embed.setColor("#a62019");
        embed.setAuthor(`${amount} messages purged!`, message.author.avatarURL);
        embed.setDescription(`❯ Mod: ${message.author} (${message.author.id})`)
        try {
          channel.send({ embed });
        } catch (err) {
          // probably no permissions to send messages/embeds there
        };
      };
    };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
  requiredPerms: ["MANAGE_MESSAGES"]
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Bulk deletes messages. **cannot delete messages older than 14 days.**",
  usage: "purge [amount]"
};
