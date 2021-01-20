const util = require("../../util/functions.js");
module.exports = async(client, message) => {
	if (message.author.id === client.user.id) return;

	const isMediaShare = message.data.item_type === 'media_share';

	if (isMediaShare) {
		const mediaData = {
			messageSender: message.author.username,
			creatorIgHandle: util.extractCreator(message.data),
			images: util.extractImages(message.data),
			mediaShareUrl: util.extractMediaShareUrl(message.data),
			timestamp: util.extractPostTimestamp(message.data),
			location: util.extractLocation(message.data),
		}
                const images = mediaData.images;
                const start = Date.Now();
		await message.chat.sendMessage("✅ Resim(ler) gönderiliyor...");
		images.forEach(async image => await message.chat.sendPhoto(image));
                await message.chat.sendMessage(`✅ Resim(ler) başarıyla gönderildi! (${Date.Now() - start} ms)`);
		return;
	};
	if (!message.content.startsWith(client.config.prefix)) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
	const cooldowns = client.cooldowns;
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;

	if (command.args && !args.length) {
		let reply = `Bir argüman belirtmediniz!`;

		if (command.usage) {
			reply += `\nKullanım: \`${client.config.prefix}${command.name} ${command.usage}\``;
		}

		return message.reply(reply);
	}

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

	await message.markSeen();
	try {
		await command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('komutu çalıştırırken bir hata oluştu, lütfen @merdcimkee ile iletişime geçin.');
	}
}
