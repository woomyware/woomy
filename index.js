// Woomy version 2
// Copyright 2020 mudkipscience

// Check node.js version
if (Number(process.version.slice(1).split('.')[0]) < 12) {
  console.log('NodeJS 12.0.0 or higher is required. Please update NodeJS on your system.')
  process.exit()
}

// Load environment variables / config
const fs = require('fs')
const colors = require('colors')
const Discord = require('discord.js')
const client = new Discord.Client({ disabledEvents: ['TYPING_START'] })

require('./modules/functions')(client)

client.logger = require('tracer').colorConsole({
  format: [
    '{{timestamp}} <{{title}}> {{message}}',
    {
      error: '{{timestamp}} <{{title}}> ({{file}}) {{message}}',
      fatal: '{{timestamp}} <{{title}}> ({{file}}) {{message}}'
    }
  ],
  dateformat: 'dd-mm-yyyy HH:MM:ss',
  methods: ['log', 'debug', 'info', 'ready', 'warn', 'error', 'fatal'],
  filters: [{
    log: colors.white,
    debug: colors.magenta,
    info: colors.cyan,
    ready: colors.green,
    warn: colors.yellow,
    error: colors.red,
    fatal: [colors.red, colors.bold]
  }]
})

if (fs.existsSync('./.env') === false) {
  client.logger.fatal('The .env file is missing! Please create a .env file.')
  process.exit()
}

if (fs.existsSync('./config.js') === false) {
  client.logger.fatal('The config.js file is missing! Please create a config.js file.')
  process.exit()
}

require('dotenv').config()
client.config = require('./config')

// Command/alias cache
client.commands = new Discord.Collection()
client.cooldown = new Discord.Collection()
client.aliases = new Discord.Collection()

// Initialization function
const init = async () => {
  // Load modules

  // Load events
  fs.readdir('./events', (err, files) => {
    if (err) {}
    client.logger.info(`Loading ${files.length} events.`)
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return
      }
      const event = require(`./events/${file}`)
      client.on(file.substr(0, file.length - 3), event.bind(null, client))
    })
  })

  // Load commands
  fs.readdir('./commands', (err, files) => {
    if (err) {}
    client.logger.info(`Loading ${files.length} commands.`)
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return
      }
      const response = client.loadCommand(file)
      if (response) {
        client.logger.error(response)
      }
    })
  })

  // Level cache
  client.levelCache = {}
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i]
    client.levelCache[thisLevel.name] = thisLevel.level
  }

  // Login into Discord
  client.login(process.env.TOKEN)
}

init()
