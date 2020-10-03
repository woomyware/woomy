  var allowed = ["+", "-", "*", "/", "(", ")", " "];
  exports.run = (client, message, args) => {
    let exercise = args.join(" ");
    
    if (!exercise) {
      return message.channel.send(
        `<:error:466995152976871434> No equation provided. Usage :\`${client.commands.get(`calculate`).help.usage}\``
      );
    }

    try {
      for (var i = 0; i < exercise.length; i++) {
        let c = exercise.charAt(i);
        let found = allowed.find((element) => element === c);
        
        if(c == "0") found = true;
        if(!(Number(c) || found))
        {
          return message.channel.send(
            `<:error:466995152976871434> Invalid equation. Please use \`*\` for multiplication and \`/\` for division!`
          );
        }
      }
      
      let result = (new Function( 'return ' + exercise )());

      message.channel.send(`\`RESULT:\`\n\`\`\`${result}\`\`\``)
    } catch (err) {
      message.channel.send('<:error:466995152976871434> Malformed input.')
    }
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["calc", "math"],
    permLevel: "User",
    requiredPerms: []
  };

  exports.help = {
    name: "calculate",
    category: "Utility",
    description: "Solves basic mathematical equations.",
    usage: "calculate [equation]"
  };