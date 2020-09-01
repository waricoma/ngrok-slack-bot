[ngrok-slack-bot](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Variables

* [ENV](_index_.md#const-env)
* [binPath](_index_.md#const-binpath)
* [configPath](_index_.md#const-configpath)
* [start](_index_.md#const-start)
* [tunnels](_index_.md#const-tunnels)
* [tunnelsCount](_index_.md#let-tunnelscount)
* [tunnelsNum](_index_.md#const-tunnelsnum)
* [tunnelsReport](_index_.md#let-tunnelsreport)
* [webhook](_index_.md#const-webhook)

### Functions

* [ngrokHandler](_index_.md#const-ngrokhandler)

## Variables

### `Const` ENV

• **ENV**: *ProcessEnv‹›* = process.env

*Defined in [index.ts:5](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L5)*

___

### `Const` binPath

• **binPath**: *string* = path.resolve(__dirname, './node_modules/ngrok/bin/ngrok')

*Defined in [index.ts:17](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L17)*

___

### `Const` configPath

• **configPath**: *string* = path.resolve(__dirname, './config.yml')

*Defined in [index.ts:18](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L18)*

___

### `Const` start

• **start**: *string[]* = ['start', '--all', '--log=stdout', `--config=${configPath}`]

*Defined in [index.ts:21](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L21)*

___

### `Const` tunnels

• **tunnels**: *any* = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))['tunnels']

*Defined in [index.ts:19](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L19)*

___

### `Let` tunnelsCount

• **tunnelsCount**: *number* = 0

*Defined in [index.ts:23](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L23)*

___

### `Const` tunnelsNum

• **tunnelsNum**: *number* = Object.keys(tunnels).length

*Defined in [index.ts:20](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L20)*

___

### `Let` tunnelsReport

• **tunnelsReport**: *string* = `🚨 server restarted!\nip address: ${ip.address()}`

*Defined in [index.ts:24](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L24)*

___

### `Const` webhook

• **webhook**: *IncomingWebhook‹›* = new IncomingWebhook(ENV.SLACK_WEBHOOK_URL)

*Defined in [index.ts:16](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L16)*

## Functions

### `Const` ngrokHandler

▸ **ngrokHandler**(`data`: string): *void*

*Defined in [index.ts:26](https://github.com/waricoma/ngrok-slack-bot/blob/4ded1f8/index.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |

**Returns:** *void*
