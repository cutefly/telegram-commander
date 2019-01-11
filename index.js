'use strict'

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

const TelegramBot = require('node-telegram-bot-api');
const env = require('./config/env.js');
const logger = require('./config/logger.js');
const stringFormat = require('string-format');

// replace the value below with the Telegram token you receive from @BotFather
console.log('profile : ' + process.env.NODE_ENV);
const token = (env[process.env.NODE_ENV]).telegramBotToken;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  logger.info('response echo command : chatId = %s, resp = %s', chatId, resp);
  bot.sendMessage(chatId, resp);
});

// Matches "/who"
bot.onText(/\/who/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'chat' is the information of user who send message

  const chatId = msg.chat.id;
  const chat = msg.chat;
  logger.info('response who command : username = %s, userid = %s', chat.username, chat.id);
  const resp = stringFormat('username = {}, userid = {}', chat.username, chat.id);

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
  
  
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, 'Received your message');
  logger.debug('received message : %s', msg.text);
});