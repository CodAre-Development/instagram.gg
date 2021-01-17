const Insta = require('@androz2091/insta.js');
const fs = require('fs')
const config = require('./config.json');
const client = new Insta.Client();
const Collection = require('@discordjs/collection');
client.config = config;
client.commands = new Collection();
client.cooldowns = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

fs.readdir("events", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
        console.log(`Loaded event: ${eventName}`);
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.login(config.username, config.password);
