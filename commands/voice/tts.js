const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient();


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

    var request = {
    input: {text: speak},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'tr-TR', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  async function textToAudioBuffer(text) {
    request.input = { text: text }; // text or SSML
    const response = await ttsClient.synthesizeSpeech(request);
    return response[0].audioContent;
}

message.chat.sendVoice(textToAudioBuffer(speak))
.catch((err) => {
err = err.toString();
message.chat.sendMessage('⛔' + err);
});
});
},
};
