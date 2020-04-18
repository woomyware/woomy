'use strict'

const { colorConsole } = require('tracer')
const colors = require('colors')

const logger = colorConsole({
  format: [
    '{{timestamp}} | {{title}} | {{file}} | {{message}}',
    {
      debug: `{{timestamp}} | ${'{{title}}'.magenta} | {{file}} | {{message}}`,
      cmd: `{{timestamp}} | ${'{{title}}'.white} | {{file}} | {{message}}`,
      info: `{{timestamp}} | ${'{{title}}'.cyan} | {{file}} | {{message}}`,
      ready: `{{timestamp}} | ${'{{title}}'.green} | {{file}} | {{message}}`,
      warn: `{{timestamp}} | ${'{{title}}'.yellow} | {{file}} | {{message}}`,
      error: `{{timestamp}} | ${'{{title}}'.red} | {{file}} | {{message}}`
    }
  ],
  dateformat: 'yyyy-mm-dd"T"HH:MM:ss',
  methods: ['cmd', 'debug', 'info', 'ready', 'warn', 'error'],
  filters: [colors.white]
})

module.exports = logger
