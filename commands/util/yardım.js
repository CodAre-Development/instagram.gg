module.exports = {
	name: 'yardım',
	description: 'Tüm komutlarımı veya belirli bir komutla ilgili bilgileri listeleyin.',
	aliases: ['komutlar', 'help'],
	usage: '[komut adı]',
	cooldown: 5,
	execute(client, message, args) {
		const data = [];
		const { commands, config } = client;

		if (!args.length) {
			data.push(`Komut listesi:`);
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nBir komut hakkında bilgi almak için ${config.prefix}yardım [komut adı] yazabilirsin`);

			return message.chat.sendMessage(data.toString())
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply(`böyle bir komut yok!`);
		}

		data.push(`Komut: ${command.name}`);

		if (command.aliases) data.push(`Alternatif: ${command.aliases.join(', ')}`);
		if (command.description) data.push(`Açıklama: ${command.description}`);
		if (command.usage) data.push(`Kullanım: ${config.prefix}${command.name} ${command.usage}`);

		data.push(`Bekleme süresi: ${command.cooldown || 3} saniye`);

		message.chat.sendMessage(data.toString());
	},
};
