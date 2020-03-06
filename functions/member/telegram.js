import { success, failure } from '../../libs/response-lib';

const rp = require('request-promise');

const TELEGRAM_TOKEN = '977708004:AAEfqF4pY_oxruLbU9B0AsPdsqPlId7_T9M';
export async function main(event) {
  const body = JSON.parse(event.body);
  const { text, chat } = body.message;
  console.log(body);
  const message = 'fafdf';
  if (text) {
    try {
      await sendToUser(chat.id, message);
      return success({ status: true });
    } catch (e) {
      return failure(e);
    }
  }
}

async function sendToUser(chatId, text) {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    qs: {
      chatId,
      text,
    },
  };

  return rp(options);
}
