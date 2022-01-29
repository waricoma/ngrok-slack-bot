'use strict';

import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;

import isOnline from 'is-online';
import delay from 'delay';
import { IncomingWebhook } from '@slack/webhook';
//import ip from 'ip';
import { exec, execSync } from 'child_process';
import os from 'os';

const webhook = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL);

const getGlobalIP = () => {
  return String(execSync('curl -s https://checkip.amazonaws.com')).trim();
};

(async () => {
  while (!(await isOnline())) {
    await delay(3000);
  }
  if ((ENV.X11VNC || '').toLowerCase() === 'true') {
    exec('x11vnc -forever -display :0 -rfbauth ~/.x11vnc/passwd -localhost');
  }
  let restartMsg = `server restarted:\nhostname: ${os.hostname()}\n`;
  let address = getGlobalIP(); //ip.address();
  restartMsg += `ip: ${address}\n`;
  if (ENV.NGROK_TOKEN) {
    await ngrok.authtoken(ENV.NGROK_TOKEN);
    restartMsg += `ngrok: ${await ngrok.connect({
      proto: 'tcp',
      addr: ENV.SSH_PORT,
    })}\n`;
  }
  await webhook.send({ text: restartMsg });

  setInterval(async () => {
    if (getGlobalIP() != address) {
      address = getGlobalIP();
      await webhook.send({
        text: `ip changed: ${address}\nhostname: ${os.hostname()}`,
      });
    }
  }, 5000);
})();
