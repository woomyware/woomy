if (Number(process.version.slice(1).split(".")[0]) < 12) {
  throw new Error("Node 12.0.0 or higher is required. Please update Node on your system.");
};

const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const chalk = require('chalk');
const client = new Discord.Client();

try {
  client.config = require('./config');
} catch (err) {
  console.log('Failed to load config.js:', err);
  process.exit();
};
try{
  client.version = require('./version.json');
} catch (err) {
  console.log('Failed to load version.json:', err);
  process.exit();
};
try{
  client.logger = require('./src/modules/Logger');
} catch (err) {
  console.log('Failed to load Logger.js:', err);
  process.exit();
};
client.logger.setClient(client);

try{
  require("./src/modules/functions")(client);
} catch (err) {
  console.log('Failed to load functions.js:', err);
  process.exit();
};

if(process.env['USER'] != 'container') {
  client.devmode = true;
} else {
  client.devmode = false;
  if(client.config.dblkey.length > 0) {
    const DBL = require("dblapi.js");
    const dblapi = new DBL(client.config.dblkey, client);
  };
};

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({name: 'settings'});

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