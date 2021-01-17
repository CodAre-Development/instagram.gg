module.exports = {
	name: `ping`,
	description: 'Ping!',
        execute(client, message) {
	    
	const start = Date.now();
        message.chat.sendMessage('📊 Ping test ediliyor...').then(() => {
	const diff = (Date.now() - start);
	message.chat.sendMessage(`📊 Ping : ${diff} ms.`);
        })
    },
};
