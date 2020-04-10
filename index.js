// Woomy version 2
// Copyright 2020 mudkipscience

'use strict'

// Check node.js version
if (Number(process.version.slice(1).split('.')[0]) < 12) {
  console.log('NodeJS 12.0.0 or higher is required. Please update NodeJS on your system.')
  process.exit()
}

// Libraries
const Discord = require('discord.js')
const client = new Discord.Client({ disabledEvents: ['TYPING_START'] })
const fs = require('fs')
const colors = require('colors')
const isDocker = require('is-docker')

// Helpers
client.config = require('./config')
client.version = require('./version.json')
client.db = require('./helpers/mongoose')
require('./helpers/_functions')(client)
require('./helpers/music')(client)

// Initialise logger
client.logger = require('tracer').colorConsole({
  transport: function (data) {
    console.log(data.output)
    fs.appendFile('./file.log', data.rawoutput + '\n', err => {
      if (err) throw err
    })
  },

  format: [
    '{{timestamp}} | {{title}} | {{file}} | {{message}}',
    {
      debug: `{{timestamp}} | ${'{{title}}'.magenta} | {{file}} | {{message}}`,
      log: `{{timestamp}} | ${'{{title}}'.white} | {{file}} | {{message}}`,
      info: `{{timestamp}} | ${'{{title}}'.cyan} | {{file}} | {{message}}`,
      ready: `{{timestamp}} | ${'{{title}}'.green} | {{file}} | {{message}}`,
      warn: `{{timestamp}} | ${'{{title}}'.yellow} | {{file}} | {{message}}`,
      error: `{{timestamp}} | ${'{{title}}'.red} | {{file}} | {{message}}`,
      fatal: `{{timestamp}} | ${'{{title}}'.red.bold} | {{file}} | {{message}}`
    }
  ],
  dateformat: 'yyyy-mm-dd"T"HH:MM:ss',
  methods: ['log', 'debug', 'info', 'ready', 'warn', 'error', 'fatal'],
  filters: [colors.white]
})

// Create caches for permissions, commands, cooldowns and aliases
client.levelCache = {}
client.commands = new Discord.Collection()
client.cooldown = new Discord.Collection()
client.aliases = new Discord.Collection()

// Main initialisation function
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

  // Check if Woomy is running inside a Docker container
  if (isDocker() === true) {
    client.devmode = true
    client.logger.warn('Running in development mode.')
  } else {
    client.devmode = false
  }

  // Initialise DB
  await client.db.init(client)

  // Login to Discord
  function failedToLogin (err) {
    client.logger.error('Failed to login: ' + err)

    process.exit(0)
  };

  if (client.devmode !== true) {
    client.login(client.config.token).catch(failedToLogin)
  } else {
    client.login(client.config.token_dev).catch(failedToLogin)
  }
}

init()
