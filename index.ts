import { Client, Events } from 'discord.js'
const { BOT_TOKEN } = process.env

const client = new Client({
	intents: ['Guilds', 'GuildMessages', 'MessageContent'],
})

const GENERAL_TEXT_CHANNEL = '1005478799011483701'

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.on(Events.ThreadCreate, async thread => {
	console.log('created thread: ', thread)
})

client.on(Events.Raw, async a => {
	console.log('raw event: ', a)
})

client.login(BOT_TOKEN)
