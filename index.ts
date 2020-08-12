'use strict';

import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;

import ngrok from 'ngrok';
import isOnline from 'is-online';
import delay from 'delay';
import { IncomingWebhook } from '@slack/webhook';
import ip from 'ip';

const webhook = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL);

(async () => {
  while (!(await isOnline())) {
    await delay(3000);
  }
  await ngrok.authtoken(ENV.NGROK_TOKEN);
  const ngrokUrl = await ngrok.connect({ proto: 'tcp', addr: ENV.SSH_PORT });
  await webhook.send({
    text: `server restarted: ${ngrokUrl}\nip address: ${ip.address()}`,
  });
})();
