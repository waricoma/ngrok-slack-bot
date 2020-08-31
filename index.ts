'use strict';

import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;

import isOnline from 'is-online';
import delay from 'delay';
import { IncomingWebhook } from '@slack/webhook';
import ip from 'ip';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import yaml from 'js-yaml';

const webhook = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL);

const binPath = path.resolve(__dirname, './node_modules/ngrok/bin/ngrok');

const configPath = path.resolve(__dirname, './config.yml');
const configStr = fs.readFileSync(configPath, 'utf8');

const tunnels = yaml.safeLoad(configStr)['tunnels'];
const tunnelsNum = Object.keys(tunnels).length;

const ops = ['start', '--all', '--log=stdout', `--config=${configPath}`];

let tunnelsCount = 0;
let tunnelsReport = `🚨 server restarted!\nip address: ${ip.address()}`;

const ngrokHandler = (data: string) => {
  const msg = data.toString().trim();

  if (msg.indexOf('lvl=info msg="started tunnel" obj=tunnels') === -1) {
    return;
  }

  if (msg.indexOf('url=http://') >= 0) {
    return;
  }

  console.log(msg);

  tunnelsReport += `\n${msg.split('name=')[1]}`;
  ++tunnelsCount;

  if (tunnelsCount !== tunnelsNum) {
    return;
  }

  // TODO: why it didn't run?
  console.log(tunnelsReport);

  /*
  webhook.send({
    text: tunnelsReport,
  });
  */
};

(async () => {
  while (!(await isOnline())) {
    await delay(3000);
  }
  const ngrok = spawn(binPath, ops);
  ngrok.stdout.on('data', ngrokHandler);
})();
