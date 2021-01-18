const fs = require("fs");
module.exports = function Init(client) {
  console.log(client);
  fs.readdir("../events", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(`../events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});
};
