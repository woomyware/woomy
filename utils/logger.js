'use strict'

const { createLogger, format, transports, addColors } = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs')
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD'
})

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    ready: 3,
    info: 4,
    cmd: 5,
    debug: 6
  },

  colors: {
    fatal: 'bold red',
    error: 'red',
    warn: 'yellow',
    ready: 'green',
    info: 'cyan',
    cmd: 'white',
    debug: 'magenta'
  }
}

const logger = createLogger({
  level: 'info',
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),

  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),

    dailyRotateFileTransport
  ]
})

addColors(customLevels.colors)

module.exports = logger
