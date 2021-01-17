const Insta = require('@androz2091/insta.js');
const fs = require('fs')
const config = require('./config.json');
const client = new Insta.Client();
const Collection = require('@discordjs/collection');
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('messageCreate', (message) => {
        if (message.authorID === client.user.id  || !message.content.startsWith(config.prefix)) return;
    
    message.args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const icommandName = message.args.shift().toLowerCase();
    const icommand = client.commands.get(icommandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(icommandName));

	if (!icommand) return;
	
	try {
		icommand.execute(client, message, args);
	} catch (error) {
		console.error(error);
    }
});

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

// Unhandled errors
process.on("unhandledRejection", (error) => console.error(error));

process.on("uncaughtExceptionMonitor", (error) => console.error(error));

process.on("warning", (warning) => {
  if (warning.stack.startsWith("(node:13988) [DEP0148]")) return;

  console.error(error);
})
