const telegrapf = require('telegraf');

const bot = new telegrapf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome!!!!'));
