const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const chalk = require('chalk');
const DBL = require("dblapi.js");
const client = new Discord.Client();

client.config = require('./config');
client.version = require('./version.json');
client.logger = require('./src/modules/Logger');
require("./src/modules/functions")(client);
client.logger.setClient(client);

if(process.env['USER'] != 'container') {
  client.devmode = true;
} else {
  client.devmode = false;
  const dblapi = new DBL(client.config.dblkey, client);
}

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({name: 'settings'});
client.blacklist = new Enmap({name: 'blacklist'});

const init = async () => {
  const cmdFiles = await readdir("./src/commands/");
  client.logger.info(`Loading ${cmdFiles.length} commands.`);
  cmdFiles.forEach(file => {
    if (!file.endsWith(".js")) {
      return;
    };
    const response = client.loadCommand(file);
    if (response) {
      console.log(response);
    };
  });

  const evtFiles = await readdir("./src/events/");
  client.logger.info(`Loading ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    if (!file.endsWith(".js")) {
      return;
    };
    const eventName = file.split(".")[0];
    const event = require(`./src/events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  };

  if(client.devmode === true) {
    client.login(client.config.devtoken);
  } else {
    client.login(client.config.token);
  };
};

init();