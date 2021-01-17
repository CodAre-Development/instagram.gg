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

    function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}


googleTTS.getAudioBase64(speak, {
    lang: 'tr-TR',
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
  })
  .then((results) => {
message.chat.sendVoice(_base64ToArrayBuffer(results));
}).catch(console.error);

});
},
};
