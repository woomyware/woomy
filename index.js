// Woomy version 2
// Copyright 2020 mudkipscience

// Check node.js version
if (Number(process.version.slice(1).split('.')[0]) < 12) {
  console.log('NodeJS 12.0.0 or higher is required. Please update NodeJS on your system.')
  process.exit()
}

// Load environment variables / config
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client({ disabledEvents: ['TYPING_START'] })

if (fs.existsSync('./.env') === false) {
  console.log('.env file not found!')
  process.exit()
}

if (fs.existsSync('./config.js') === false) {
  console.log('config file not found!')
  process.exit()
}

require('dotenv').config()
client.config = require('config')

// Command/alias cache
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

// Initialization function
const init = async () => {
  // Load modules

  // Load events
  fs.readdir('./events', (err, files) => {
    if (err) {}// Prepare variableseturn err
    files.forEach(file => {
      client.on(file.substr(0, file.length - 3), require('./events/' + file))
    })
  })

  // Load commands

  // Level cache
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const currentlevel = client.config.permLevels[i]
    client.levelCache[currentlevel.name] = currentlevel.level
  }
  // Login into Discord
  client.login(process.env.TOKEN)
}

init()
