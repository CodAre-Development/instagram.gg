const util = require('util')

module.exports = {
	name: 'eval',
	description: 'Sadece geliştirici.',
	aliases: ['e'],
        args: true,
	execute(client, message, args) {
        if (parseInt(message.author.id) !== parseInt(client.config.ownerid)) return message.chat.sendMessage(`Bunu sadece geliştirici kullanabilir!`)
        let result = new Promise((resolve) => resolve(eval(args.join(` `))));

        return result.then((output) => {
            if (typeof output !== `string`) {
                output = require(`util`).inspect(output, { depth: 0 });
            }
            message.chat.sendMessage('📤 Sonuç : \n' + output)
        }).catch((err) => {
            err = err.toString();
            message.chat.sendMessage('⛔ Hata: ' + err);
        });
	},
    },
};
