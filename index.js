const Insta = require('@androz2091/insta.js');
const Discord = require('discord.js')
const fs = require('fs')
const glob = require('glob');
const path = require('path');
const config = require('./config.json');
const client = new Insta.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection()
client.config = config;

glob.sync('./commands/**/*.js' ).forEach(function(file) {
  const command = require(path.resolve(file));
  client.commands.set(command.name, command);
});

client.on('messageCreate', (message) => {
        if (message.author.id === client.user.id) return;

        if (!message.content.startsWith(client.config.prefix)) return;
    
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.reply(reply);
	}
        /*
	const now = Date.now();
	const timestamps = client.cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.authorID) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);*/
        message.markSeen();
	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
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
