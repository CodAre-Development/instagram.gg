const Insta = require('@androz2091/insta.js');
const fs = require('fs')
const config = require('./config.json');
const client = new Insta.Client();
client.config = config;
client.commands = new Enmap();
client.timeouts = new Enmap();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	client.on(event.name, event.bind(null, client));
}

client.login(config.username, config.password);
