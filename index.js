// Woomy version 2
// Copyright 2020 mudkipscience

// Check node.js version
if (Number(process.version.slice(1).split('.')[0]) < 13) {
  console.log('NodeJS 12.0.0 or higher is required. Please update NodeJS on your system.')
  process.exit()
}

// Load environment variables / config
const fs = require('fs')

if (fs.existsSync('./.env') === false) {
  console.log('.env file not found!')
  process.exit()
}

if (fs.existsSync('./config.js') === false) {
  console.log('config file not found!')
  process.exit()
}

require('dotenv').config()

// Prepare variables
const Discord = require('discord.js')
const client = new Discord.Client({ disabledEvents: ['TYPING_START'] })

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

// Initialization function
const init = async () => {
  // Register events
  fs.readdir('./events', (err, files) => {
    files.forEach(file => {
      client.on(file.substr(0, file.length - 3), require('./events/' + file))
    });
  });

  // Login into Discord
  client.login(process.env.TOKEN);
}

init();
