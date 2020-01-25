const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const chalk = require("chalk");
const client = new Discord.Client();

client.config = require("./config");
client.update = require("./update.json");
client.logger = require("./src/modules/Logger");
client.logger.setClient(client);

require("./src/modules/functions.js")(client);

if(process.env['USER'] != 'container') {
  client.devmode = true;  
};

if(client.devmode === false) {
  const DBL = require("dblapi.js");
  const dbl = new DBL(client.config.dblkey, client);
};

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({name: "settings"});
client.warnings = new Enmap({name: "warnings"});
client.blacklist = new Enmap({name: "blacklist"});
//client.points = new Enmap({name: "points"});

const init = async () => {

  const cmdFiles = await readdir("./src/commands/");
  client.logger.log(chalk.greenBright(`Loading ${cmdFiles.length} commands.`));
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./src/events/");
  client.logger.log(chalk.greenBright(`Loading ${evtFiles.length} events.`));
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./src/events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }
  if(client.devmode === true) {
    client.login(client.config.devtoken);
  }
  if(client.devmode !== true) {
  client.login(client.config.token);
  }
};

init();