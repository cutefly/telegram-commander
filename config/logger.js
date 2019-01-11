'use strict';
// Initialize logger
var moment = require('moment');
var winston = require('winston');
require('winston-daily-rotate-file');
const env = require('../config/env.js');
function timeStampFormat() {
    // For display local time zone
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
};
var logger = winston.createLogger({
    level: (env[process.env.NODE_ENV]).logLevel.default,
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${timeStampFormat()} [${info.level}] ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: (env[process.env.NODE_ENV]).logLevel.console,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.splat(),
                winston.format.simple(),
                winston.format.timestamp(),
                winston.format.printf(info => {
                    return `${timeStampFormat()} [${info.level}] ${info.message}`;
                })
            )
        }),
        new winston.transports.File({
            level: (env[process.env.NODE_ENV]).logLevel.file,
            colorize: false,
            filename: '../logs/telegram-commander.log',
            options: {
                flags: 'w'
            }
        }),
        new winston.transports.DailyRotateFile({
            level: (env[process.env.NODE_ENV]).logLevel.file,
            colorize: false,
            filename: '../logs/telegram-commander_%DATE%.log',
            datePattern: 'YYYY-MM-DD'
        })
    ]
});
module.exports = logger;