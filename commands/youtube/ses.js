const ytdl = require('ytdl-core');

module.exports = {
	name: 'ses',
	description: 'Youtubeden bir videoyu ses olarak gönderir. [Maksimum 1 dakika!]',
	aliases: ['müzik', 'youtube'],
	usage: '[youtube linki]',
        args: true,
	cooldown: 5,
	async execute(client, message, args) {
    const info = await ytdl.getInfo(args[0]);
    if(info.videoDetails.lengthSeconds > 60) return message.reply("Instagram bir dakikadan uzun ses kayıtlarına izin vermiyor.");
    message.chat.sendMessage('Ses gönderiliyor...').then(() => {
    const stream = ytdl(args[0], { quality: 'highestaudio' });
    const array = [];
	stream
      .on('data', chunk => {
        array.push(chunk);
      })
      .on('end', () => {
        message.chat.sendVoice(Buffer.concat(array));
      })
        }).catch((err) => {
            err = err.toString();
            message.chat.sendMessage('⛔' + err);
        });

	},
};
