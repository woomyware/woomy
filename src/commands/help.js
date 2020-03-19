exports.run = (client, message, args, level) => {
  embed = new Discord.MessageEmbed();
  embed.setColor(client.embedColour(message));

  var ran = false;
  var output = "```";
  var commands = 0;
  var prefix;
  var currentCategory;

  if(message.guild) {
    prefix = message.settings.prefix;
  } else {
    prefix = client.config.defaultSettings.prefix;
  };

  if(!args[0]) {
    embed.setTitle(`Commands [${client.commands.size}]`);
    embed.setDescription(`⁣For more information on a specific command use \`${prefix}help <command>\`\nFor the full command list use \`${prefix}help all\`\n`);

    const myCommands = message.guild ? client.commands.filter(
      cmd => client.levelCache[cmd.conf.permLevel] <= level
      ) : client.commands.filter(
        cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true
      );
      
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce(
      (long, str) => Math.max(long, str.length),
      0
    );
    
    const sorted = myCommands.array().sort(
      (p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 
    );

    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        if(ran == true) {
          output = output.slice(0, -2) + "```";
          embed.addField(currentCategory + ` [${commands}]`, output)
          output = "```";
          commands = 0;
        }
        currentCategory = cat;
        ran = true
      }
    output += `${prefix}${c.help.name}, `;
    commands = commands + 1;
    });

    output = output.slice(0, -2);
    output = output + "```"

    embed.addField(currentCategory + ` [${commands}]`, output);

    embed.addField(
      "Invite me",
      "[Click here](https://discordapp.com/oauth2/authorize?client_id=435961704145485835&permissions=8&scope=bot) to add me to your server",
      true
    );
    embed.addField(
      "Support",
      "[Click here](https://discord.gg/HCF8mdv) if bot broke",
      true
    );

    message.channel.send(embed);

    return;
  };

  if(args[0].toLowerCase() == "all") {
    embed.setTitle(`Commands [${client.commands.size}]`);
    embed.setDescription(`⁣For more information on a specific command use \`${prefix}help <command>\`\nFor the full command list use \`${prefix}help all\`\n`);

    const myCommands = client.commands

    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce(
      (long, str) => Math.max(long, str.length),
      0
    );

    const sorted = myCommands.array().sort(
      (p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 
    );

    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        if(ran == true) {
          output = output.slice(0, -2) + "```";
          embed.addField(currentCategory + ` [${commands}]`, output)
          output = "```";
          commands = 0;
        }
        currentCategory = cat;
        ran = true
      }
    output += `${prefix}${c.help.name}, `;
    commands = commands + 1;
    });

    output = output.slice(0, -2) + "```";
    embed.addField(currentCategory + ` [${commands}]`, output);

    embed.addField(
      "Invite me",
      "[Click here](https://discordapp.com/oauth2/authorize?client_id=435961704145485835&permissions=8&scope=bot) to add me to your server",
      true
    );
    embed.addField(
      "Support",
      "[Click here](https://discord.gg/HCF8mdv) if bot broke",
      true
    );

    message.channel.send(embed);

    return;
  };

  if(args[0]) {
    let command = args.shift().toLowerCase();
    let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
    if(!client.commands.has(command)) {
      return message.channel.send("<:error:466995152976871434> That command doesn't exist!")
    };

    command = client.commands.get(command);

    var requiredPerms = "";

    if(cmd.conf.requiredPerms.length > 0 ) {
      requiredPerms = "`" + cmd.conf.requiredPerms.join("`, `") + "`";
    } else {
      requiredPerms = "None";
    };

    var aliases = "";

    if(cmd.conf.aliases.length > 0 ) {
      aliases = "`" + cmd.conf.aliases.join("`, `") + "`";
    } else {
      aliases = "None";
    };

    

    embed.setTitle(prefix + command.help.name);
    embed.setDescription(
      `• **Description:** ${command.help.description}\n• **Usage:** ${prefix + command.help.usage}\n• **Permission Level:** ${cmd.conf.permLevel} \n• **Guild Only:** ${cmd.conf.guildOnly}\n• **Aliases:** ${aliases}\n• **Required perms:** ${requiredPerms}`
      );
    embed.setFooter("Arguments in [] are required, <> are optional.");
    
    message.channel.send(embed);

    return;
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "cmds"],
  permLevel: "User",
  requiredPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "help",
  category: "Utility",
  description:
    "Displays all the commands you are able to use.",
  usage: "help <command> **OR** help all"
};