import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import middlewares
import setUserMiddleware from './middlewares/setUser.js';
import setMessageTypeMiddleware from './middlewares/setMessageType.js';
import logMessageContentMiddleware from './middlewares/logMessageContent.js';
import blockCheckMiddleware from './middlewares/blockCheck.js';
import messageCounterMiddleware from './middlewares/messageCounter.js';
import checkTextSizeMiddleware from './middlewares/checkTextSize.js';
import constructMessageMiddleware from './middlewares/constructMessage.js';

import handleMessage from './handlers/index.js';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

mongoose.connect(process.env.MONGODB_URL, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB: ' + error.message));

// Apply middlewares
bot.use(setUserMiddleware);
bot.use(setMessageTypeMiddleware);
bot.use(logMessageContentMiddleware);
bot.use(blockCheckMiddleware);
bot.use(messageCounterMiddleware);
bot.use(checkTextSizeMiddleware);
bot.use(constructMessageMiddleware);

// Use handler to reply with ctx.state
bot.on('message', handleMessage);
bot.on('callback_query', handleMessage);
bot.on('my_chat_member', handleMessage);

export default bot;