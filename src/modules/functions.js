module.exports = client => {
  // Permission level function
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  // Guild settings function
  client.getSettings = guild => {
    const defaults = client.config.defaultSettings || {};
    if (!guild) return defaults;
    const guildData = client.settings.get(guild) || {};
    const returnObject = {};
    Object.keys(defaults).forEach(key => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    return returnObject;
  };

  // Single line await messages
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  // Message clean function
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(
        client.token,
        "NaKzDzgwNDef1Nitl3YmDAy.tHEvdg.r34L.whl7sTok3N.18n4Ryj094p"
      );

    return text;
  };

  client.loadCommand = commandName => {
    try {
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Failed to load command ${commandName}: ${e}`;
    };
  };

  client.unloadCommand = async commandName => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    };
    if (!command)
      return `<:error:466995152976871434> The command \`${commandName}\` could not be found.`;

    if (command.shutdown) {
      await command.shutdown(client);
    };
    const mod = require.cache[require.resolve(`../commands/${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      };
    };
    return false;
  };

  // MEMBER SEARCH
  client.searchForMembers = function(guild, query) {
    if (!query) return;
    query = query.toLowerCase();

    var a = [];
    var b;

    try {
      b = guild.members.cache.find(x => x.displayName.toLowerCase() == query);
      if (!b) guild.members.cache.find(x => x.user.username.toLowerCase() == query);
    } catch (err) {};
    if (b) a.push(b);
    guild.members.cache.forEach(member => {
      if (
        (member.displayName.toLowerCase().startsWith(query) ||
          member.user.tag.toLowerCase().startsWith(query)) &&
        member.id != (b && b.id)
      ) {
        a.push(member);
      };
    });
    return a;
  };

  // USER OBJECT FROM MENTION
  client.getUserFromMention = mention => {
    if (!mention) return;
  
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
  
      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
  
      return client.users.cache.get(mention);
    }
  }

  //FIND ROLE
  client.findRole = function(input, message) {
    var role;
    role = message.guild.roles.cache.find(r => r.name.toLowerCase() === input.toLowerCase());
    if(!role) {
      role = message.guild.roles.cache.get(input.toLowerCase());
    };
  
    if(!role) {
      return;
    };
  
    return role;
  };

  // EMBED COLOUR
  client.embedColour = function(msg) {
    if(!msg.guild) {
      return ["#ff9d68", "#ff97cb", "#d789ff", "#74FFFF"].random();
    } else {
      return msg.guild.member(client.user).displayHexColor;
    };
  };

  // FIND RANDOM INT BETWEEN TWO INTEGERS
  client.intBetween = function(min, max){
    return Math.round((Math.random() * (max - min))+min);
  };


  // <String>.toPropercase() returns a proper-cased string
  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(
        /([^\W_]+[^\s-]*) */g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }
  });

  // <Array>.random() returns a single random element from an array
  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    }
  });

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
};
