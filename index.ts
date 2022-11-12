import { AnyThreadChannel, Client, Events, TextChannel } from 'discord.js'
const { BOT_TOKEN } = process.env

const client = new Client({
	intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildMembers'],
	allowedMentions: {
		parse: ['users'],
	},
})

const GENERAL_TEXT_CHANNEL = '1005478799011483701'

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

const isPost = (t: AnyThreadChannel<boolean>) => {
	return t.appliedTags.length >= 1
}

client.on(Events.ThreadCreate, async t => {
	if (!isPost(t)) return

	try {
		const c = client.channels.cache.get(GENERAL_TEXT_CHANNEL) as TextChannel
		c.send({
			allowedMentions: { users: [t.ownerId + ''] },
			content: `🚨 NEW: <@${t.ownerId}> created a new post called <#${t.id}>!`,
		})
	} catch (e) {
		console.warn(`Could not fetch user of id: ${t.ownerId}`)
		console.error(`[Error] - ${e}`)
	}
})

client.login(BOT_TOKEN)
