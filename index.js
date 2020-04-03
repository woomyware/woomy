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
const isDocker = require('is-docker')
const Discord = require('discord.js')
const client = new Discord.Client({ disabledEvents: ['TYPING_START'] })

// Logger
client.logger = require('tracer').colorConsole({
  format: [
    '{{timestamp}} | {{title}} | {{file}}:{{line}} | {{message}}',
    {
      debug: `{{timestamp}} | ${'{{title}}'.magenta} | {{file}}:{{line}} | {{message}}`,
      log: `{{timestamp}} | ${'{{title}}'.white} | {{file}}:{{line}} | {{message}}`,
      info: `{{timestamp}} | ${'{{title}}'.cyan} | {{file}}:{{line}} | {{message}}`,
      ready: `{{timestamp}} | ${'{{title}}'.green} | {{file}}:{{line}} | {{message}}`,
      warn: `{{timestamp}} | ${'{{title}}'.yellow} | {{file}}:{{line}} | {{message}}`,
      error: `{{timestamp}} | ${'{{title}}'.red} | {{file}}:{{line}} | {{message}}`,
      fatal: `{{timestamp}} | ${'{{title}}'.red.bold} | {{file}}:{{line}} | {{message}}`
    }
  ],
  dateformat: 'yyyy-mm-dd"T"HH:MM:ss',
  methods: ['log', 'debug', 'info', 'ready', 'warn', 'error', 'fatal'],
  filters: [colors.white]
})

// Check to make sure config exists
if (fs.existsSync('./config.js') === false) {
  client.logger.fatal('The config.js file is missing! Please create a config.js file.')
  process.exit()
}

client.config = require('./config')
require('./modules/functions')(client)
require('./modules/music')(client)
require('./modules/botlists')(client)

// Logs into Discord as WoomyDev if a docker container is not detected. Delete this if self-hosting.
if (isDocker() === true) {
  client.devmode = true
  client.logger.warn('Running in development mode.')
} else {
  client.devmode = false
}

client.levelCache = {}
client.commands = new Discord.Collection()
client.cooldown = new Discord.Collection()
client.aliases = new Discord.Collection()

// Initialization function
const init = async () => {
  // Command handler
  fs.readdir('./commands', (err, files) => {
    if (err) {
      client.logger.fatal('Failed to get files in commands directory: ' + err)
      process.exit()
    }
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

  // Event handler
  fs.readdir('./events', (err, files) => {
    if (err) {
      client.logger.fatal('Failed to get files in events directory: ' + err)
      process.exit()
    }
    client.logger.info(`Loading ${files.length} events.`)
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return
      }
      const event = require(`./events/${file}`)
      client.on(file.substr(0, file.length - 3), event.bind(null, client))
    })
  })

  // Cache client permissions
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i]
    client.levelCache[thisLevel.name] = thisLevel.level
  }

  // Log into Discord
  if (client.devmode !== true) {
    client.login(client.config.token)
  } else {
    client.login(client.config.token_dev)
  }
}

init()
