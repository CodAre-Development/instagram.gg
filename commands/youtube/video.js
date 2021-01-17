const ytdl = require('ytdl-core');

module.exports = {
	name: 'video',
	description: 'Youtubeden videoyu gönderir. [Maksimum 1 dakika!]',
	aliases: ['müzik', 'youtube'],
	usage: '[youtube linki]',
        args: true,
	cooldown: 5,
	execute(client, message, args) {
    message.chat.sendMessage('Video gönderiliyor...').then(() => {
    const stream = ytdl(args[0], { filter: format => format.container === 'mp4' });
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
