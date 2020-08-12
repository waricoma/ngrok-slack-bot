'use strict';

require('dotenv').config();
const ENV = process.env;
const ngrok = require('ngrok');
const isOnline = require('is-online');
const delay = require('delay');
const { IncomingWebhook } = require('@slack/webhook');
const webhook = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL);

(async () => {
  while (!(await isOnline())) {
    await delay(3000);
  }
  await ngrok.authtoken(ENV.NGROK_TOKEN);
  const ngrokUrl = await ngrok.connect({ proto: 'tcp', addr: ENV.SSH_PORT });
  await webhook.send({
    text: `server restarted: ${ngrokUrl}`,
  });
})();
