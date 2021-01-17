const googleTTS = require('google-tts-api'); // CommonJS

module.exports = {
	name: 'tts',
	description: 'Yazdığınız yazıyı ses olarak gönderir. [Maksimum 1 dakika!]',
	aliases: ['konuş', 'söyle'],
	usage: '[cümle]',
        args: true,
	cooldown: 5,
	async execute(client, message, args) {
    const speak = args.slice(0).join(" ");
    message.chat.sendMessage('Ses gönderiliyor...').then(() => {


googleTTS.getAudioBase64(speak, {
    lang: 'tr-TR',
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
  })
  .then((results) => {
message.chat.sendVoice(new Buffer(results));
}).catch((err) => console.error(err));

});
},
};
