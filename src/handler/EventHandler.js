const fs = require("fs");
const path = require("path");
module.exports = function Init(client) {
  var pth = path.join(__dirname, '/../events/');
  fs.readdir(pth, (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(`${pth}${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});
};
