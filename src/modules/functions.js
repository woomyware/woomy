const ytdl = require('ytdl-core-discord');
const youtubeInfo = require('youtube-info');
const getYoutubeId = require('get-youtube-id');
const request = require('request');

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
      client.logger.log(`Loading command: ${commandName}`);
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

  // EMBED COLOUR CONTROL
  client.embedColour = function(msg) {
    if(!msg.guild) {
      return ["#ff9d68", "#ff97cb", "#d789ff", "#74FFFF"].random();
    } else {
      return msg.guild.member(client.user).displayHexColor;
    };
  };

  // MEMBER SEARCH
  client.searchForMembers = function(guild, query) {
    if (!query) return;
    query = query.toLowerCase();

    var a = [];
    var b;

    try {
      b = guild.members.find(x => x.displayName.toLowerCase() == query);
      if (!b) guild.members.find(x => x.user.username.toLowerCase() == query);
    } catch (err) {};
    if (b) a.push(b);
    guild.members.forEach(member => {
      if (
        (member.displayName.toLowerCase().startsWith(query) ||
          member.user.username.toLowerCase().startsWith(query)) &&
        member.id != (b && b.id)
      ) {
        a.push(member);
      };
    });
    return a;
  };

  // Music stuff
  client.music = {guilds: {}};

  client.music.isYoutubeLink = function(input) {
    return input.startsWith('https://www.youtube.com/') || input.startsWith('http://www.youtube.com/') || input.startsWith('https://youtube.com/') || input.startsWith('http://youtube.com/') || input.startsWith('https://youtu.be/') || input.startsWith('http://youtu.be/') || input.startsWith('http://m.youtube.com/') || input.startsWith('https://m.youtube.com/');
  }

  client.music.search = async function(query)
  {
      return new Promise(function(resolve, reject)
      {
          request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + client.config.ytkey, function(error, response, body)
          {
              if(error) throw error;

              var json = JSON.parse(body);
              if(!json.items) { reject(); return; }
              resolve(json.items[0]);
          });
      });
  }

  client.music.getGuild = function(id)
  {
      if(client.music.guilds[id]) return client.music.guilds[id];
  
      return client.music.guilds[id] =
      {
          queue: [],
          playing: false,
          paused: false,
          dispatcher: null,
          skippers: []
      }
  }
  
  client.music.getMeta = async function(id)
  {
      return new Promise(function(resolve, reject)
      {
          youtubeInfo(id, function(err, videoInfo)
          {
              if(err) throw err;
  
              resolve(videoInfo);
          });
      });
  }
  
  client.music.play = async function(message, input, bypassQueue)
  {
      let voiceChannel = message.member.voiceChannel;
      if(!voiceChannel) return message.channel.send('<:error:466995152976871434> You need to be in a voice channel to use this command!');

      let permissions = voiceChannel.permissionsFor(client.user);
      if (!permissions.has('CONNECT')) {
          return message.channel.send('<:error:466995152976871434> I do not have permission to join your voice channel.');
      }
      if (!permissions.has('SPEAK')) {
          return message.channel.send('<:error:466995152976871434> I do not have permission to join your voice channel.');
      }
      if (message.member.voiceChannel.joinable != true) {
          return message.channel.send("<:error:466995152976871434> I do not have permission to join your voice channel.")
      }

      let id = undefined;

      if(client.music.isYoutubeLink(input))
      {
          id = await getYoutubeId(input)
      } else {
          let item = await client.music.search(input);
          if(!item) {
            return message.channel.send(`<:error:466995152976871434> No results found.`);
          };
          id = item.id.videoId;
      }

      if(client.music.getGuild(message.guild.id).queue.length == 0 || bypassQueue)
      {
          let meta = await client.music.getMeta(id);

          if(!bypassQueue) client.music.getGuild(message.guild.id).queue.push({input: input, id: id, requestedBy: message.author, title: meta.title, author: meta.owner, thumbnail: meta.thumbnailUrl, duration: meta.duration});

          let connection = await new Promise((resolve, reject) =>
          {
              voiceChannel.join().then((connection) =>
              {
                  resolve(connection);
              });
          });

          function end(silent)
          {
              client.music.getGuild(message.guild.id).queue.shift();
              client.music.getGuild(message.guild.id).dispatcher = null;

              if(client.music.getGuild(message.guild.id).queue.length > 0)
              {
                  client.music.play(message, client.music.getGuild(message.guild.id).queue[0].input, true);
              } else {
                  client.music.getGuild(message.guild.id).playing = false;

                  if(!silent) {
                    message.channel.send("<:play:467216788187512832> Queue is empty! Disconnecting from the voice channel.");
                  }
                  
                  connection.disconnect();
              }
          }

          client.music.getGuild(message.guild.id).playing = true;

          let song = client.music.getGuild(message.guild.id).queue[0];

          try
          {
              let dispatcher = client.music.getGuild(message.guild.id).dispatcher = connection.playOpusStream(await ytdl("https://www.youtube.com/watch?v=" + id, {highWaterMark: 1024 * 1024 * 32}));

              dispatcher.on('end', (a, b) =>
              {
                  end(a == "silent");
              });
          } catch(err) {
              message.channel.send('<:error:466995152976871434> Failed to play **' + song.title + '** ' + err);

              end();
          }
          
          client.music.getGuild(message.guild.id).skippers = [];
          message.channel.send(`<:play:467216788187512832> Now playing: **${song.title}**`);
      } else {
          let meta = await client.music.getMeta(id);
          let song = {input: input, id: id, requestedBy: message.author, title: meta.title, author: meta.owner, thumbnail: meta.thumbnailUrl, duration: meta.duration};
          
          client.music.getGuild(message.guild.id).queue.push(song);

          message.channel.send(`<:success:466995111885144095> Added to queue: **${song.title}**`);
      }
  }
  
  // COVNERT SECONDS TO TIMESTAMP
  client.createTimestamp = function(duration){
    hrs = ~~(duration / 60 / 60),
    min = ~~(duration / 60) % 60,
    sec = ~~(duration - min * 60);
  
    if(String(hrs).length < 2) {
      hrs = "0" + String(hrs) + ":";
    };
  
    if(String(min).length < 2) {
      min = "0" + String(min);
    };
  
    if(String(sec).length < 2) {
      sec = "0" + String(sec);
    };

    if(hrs == "00:") {
      hrs = "";
    }
  
    var time = hrs + min + ":" + sec;
    return time;
  };

  // MISCELLANEOUS NON-CRITICAL FUNCTIONS

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
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
};
