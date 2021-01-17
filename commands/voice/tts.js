const googleTTS = require('google-tts-api'); // CommonJS
const http = require('http');
const https = require('https');
const urlParse = require('url').parse;

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

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const info = urlParse(url);
    const httpClient = info.protocol === 'https:' ? https : http;
    const options = {
      host: info.host,
      path: info.path,
      headers: {
        'user-agent': 'WHAT_EVER',
      },
    };

    httpClient.get(options, (res) => {
        // check status code
        if (res.statusCode !== 200) {
          const msg = `request to ${url} failed, status code = ${res.statusCode} (${res.statusMessage})`;
          reject(new Error(msg));
          return;
        }
        var stream;
        res.pipe(stream);
        message.chat.sendVoice(stream)
      })
      .on('error', reject)
      .end();
  });
}

const url = googleTTS.getAudioUrl(speak, {
    lang: 'tr-TR',
    slow: false,
    host: 'https://translate.google.com',
});

downloadFile(url);

});
},
};
