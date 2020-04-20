// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

'use strict'

// remove this after we uncomment sentry
/* eslint-disable no-unused-vars */

// Check node.js version
if (Number(process.version.slice(1).split('.')[0]) < 12) {
  console.log('NodeJS 12.0.0 or higher is required. Please update NodeJS on your system.')
  process.exit()
}

// Libraries
const Discord = require('discord.js')
const fs = require('fs')
const isDocker = require('is-docker')
const sentry = require('@sentry/node')

// Create bot client instance
const client = new Discord.Client({ disabledEvents: ['TYPING_START'] })

// Load all our useful utilities
client.config = require('./config')
client.version = require('./version.json')
client.db = require('./utils/mongoose')
client.logger = require('./utils/logger')
require('./utils/_functions')(client)

if (typeof client.config.devmode !== 'undefined') { // Check if devmode is explicitly overridden
  client.devmode = client.config.devmode
} else { // Check if Woomy is running inside a Docker
  if (isDocker() === false) {
    client.devmode = true
  } else {
    client.devmode = false
  }
}

if (client.devmode) {
  client.logger.warn('Running in development mode.')
}

// Create caches for permissions, commands, cooldowns and aliases
client.levelCache = {}
client.commands = new Discord.Collection()
client.cooldown = new Discord.Collection()
client.aliases = new Discord.Collection()

// Main initialisation function
const init = async () => {
  // initialise sentry
  if (client.config.keys.sentry !== '' && client.devmode === false) {
    // sentry.init({ dsn: client.config.keys.sentry })
  }

  // Command handler
  fs.readdir('./commands', (err, files) => {
    if (err) {
      client.logger.error('Failed to get files in commands directory: ' + err)
      process.exit()
    }
    client.logger.info(`Loading ${files.length} commands.`)
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return
      }
      const res = client.loadCommand(file)
      if (res) {
        client.logger.error(res)
      }
    })
  })

  // Event handler
  fs.readdir('./events', (err, files) => {
    if (err) {
      client.logger.error('Failed to get files in events directory: ' + err)
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

  // Initialise DB
  await client.db.init(client)

  // Login to Discord
  function failedToLogin (err) {
    client.logger.error('Couldn\'t login: ' + err)
    process.exit(0)
  }

  if (client.devmode !== true) {
    client.login(client.config.token).catch(failedToLogin)
  } else {
    client.login(client.config.devtoken).catch(failedToLogin)
  }
}

init()
