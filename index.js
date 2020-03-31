// Woomy version 2
// Copyright 2020 mudkipscience

// Check node.js version
if (Number(process.version.slice(1).split('.')[0]) < 12) {
  console.log('NodeJS 12.0.0 or higher is required. Please update NodeJS on your system.')
  process.exit()
}

// Libraries
const fs = require('fs')
const colors = require('colors')
const Discord = require('discord.js')
const client = new Discord.Client({ disabledEvents: ['TYPING_START'] })

// Logger
client.logger = require('tracer').colorConsole({
  format: [
    '{{timestamp}} [{{title}}] {{file}}: {{message}}',
    {
      log: `{{timestamp}} ${'[{{title}}]'.white} {{file}}: {{message}}`,
      debug: `{{timestamp}} ${'[{{title}}]'.magenta} {{file}}: {{message}}`,
      info: `{{timestamp}} ${'[{{title}}]'.cyan} {{file}}: {{message}}`,
      ready: `{{timestamp}} ${'[{{title}}]'.green} {{file}}: {{message}}`,
      warn: `{{timestamp}} ${'[{{title}}]'.yellow} {{file}}: {{message}}`,
      error: `{{timestamp}} ${'[{{title}}]'.red} {{file}}: {{message}}`,
      fatal: `{{timestamp}} ${'[{{title}}]'.red.bold} {{file}}: {{message}}`
    }
  ],
  dateformat: 'yyyy-mm-dd HH:MM:ss',
  methods: ['log', 'debug', 'info', 'ready', 'warn', 'error', 'fatal'],
  filters: [colors.white]
})

// Load modules
require('./modules/functions')(client)
require('./modules/music')(client)
require('./modules/botlists')(client)

// Checks to make sure config.js and .env exist
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

if (process.env.DEV_MODE === 'true') {
  client.devmode = true
  client.logger.warn('Running in development mode.')
} else {
  client.devmode = false
  // load botlist stuff here eventually
}

// Collections that
client.commands = new Discord.Collection()
client.cooldown = new Discord.Collection()
client.aliases = new Discord.Collection()

// Initialization function
const init = async () => {
  // Load events
  fs.readdir('./events', (err, files) => {
    if (err) {
      client.logger.fatal('Failed to get files in events directory: ' + err)
      process.exit()
    };

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
    if (err) {
      client.logger.fatal('Failed to get files in commands directory: ' + err)

      process.exit()
    };

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

  if(client.devmode === true) {
    client.login(process.env.DEVTOKEN)
  } else {
    client.login(process.env.TOKEN)
  }
}

init()
