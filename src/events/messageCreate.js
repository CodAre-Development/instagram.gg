module.exports = (client, message) => {
 if (message.author.id === client.user.id) return;

        if (!message.content.startsWith(client.config.prefix)) return;
    
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.aliases.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `Bir argüman belirtmediniz!`;

		if (command.usage) {
			reply += `\nKullanım: \`${client.config.prefix}${command.name} ${command.usage}\``;
		}

		return message.reply(reply);
	}

	const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = command.cooldown * 1000;

	if (timestamps.has(message.author.id)) {
          const expTime = timestamps.get(message.author.id) + cooldownAmount;

          if (now < expTime) {
            const timeleft = (expTime - now) / 1000;
            return message.reply(
              `lütfen ${command.name} komutunu kullanabilmek için ${timeleft.toFixed(1)} saniye bekleyin.`
            );
          }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        message.markSeen();
	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('komutu çalıştırırken bir hata oluştu, lütfen @merdcimkee ile iletişime geçin.');
	}
}
