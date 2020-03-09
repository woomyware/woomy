const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const chalk = require('chalk');
const DBL = require("dblapi.js");
const client = new Discord.Client();

try {
client.config = require('./config');
} catch (err) {
	console.log('Unable to load config.js \n', err);
	process.exit();
}

try{
client.version = require('./version.json');
} catch (err) {
	console.log('Unable to load the version file. \n', err);
	process.exit();
}

try{
client.logger = require('./src/modules/Logger');
} catch (err) {
	console.log('Unable to load the logger. \n', err);
	process.exit();
}

try{
require("./src/modules/functions")(client);
} catch (err) {
	console.log('Unable to load the functions. \n', err);
	process.exit();
}

try{
client.logger.setClient(client);
} catch (err) {
	console.log('Unable to initiate the logger. \n', err);
	process.exit(1);
}

if(process.env['USER'] != 'container') {
  client.devmode = true;
} else {
  client.devmode = false;
  const dblapi = new DBL(client.config.dblkey, client);
}

try{
client.commands = new Enmap();
} catch (err) {
	console.log('Failed to create the commands database. \n', err);
	process.exit();
}

try{
client.aliases = new Enmap();
} catch (err) {
	console.log('Unable to create the aliases database. \n', err);
	process.exit();
}

try{
client.settings = new Enmap({name: 'settings'});
} catch (err) {
	console.log('Unable to make the settings database. \n', err);
	process.exit();
}

try{
client.blacklist = new Enmap({name: 'blacklist'});
} catch (err) {
	console.log('Unable to create the blacklist database. \n', err);
	process.exit(1);
}

try{
const init = async () => {
  try{
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
} catch (err) {
	console.log('Unable to load Woomys commands. \n', err);
	process.exit(1);
}

  try{
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
} catch (err) {
	console.log('Unable to load Woomy events. \n', err);
	process.exit();
}

  try{
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  };
} catch (err) {
	console.log('Unable to enable the levelCache. \n', err);
	process.exit();
}

  try{
  if(client.devmode === true) {
    client.login(client.config.devtoken);
  } else {
    client.login(client.config.token);
  };
} catch (err) {
	console.log('Unable to login to Discord. \n', err);
	process.exit(1);
}
};
init();
} catch (err) {
	console.log('Failed to initiate Woomy. \n', err);
	process.exit(1);
}