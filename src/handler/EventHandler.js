const glob = require("glob");
module.exports.Init = function (client) { 
const eventFiles = glob.sync("./src/events/**/*.js");

    eventFiles.forEach((file) => {
    const event = require(`../../${file}`);

    if (!event.execute) {
      throw new TypeError(`[ERROR]: execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);
    }

    client.on(event.name, event.execute.bind(null, client));
    delete require.cache[require.resolve(`../../${file}`)];
};
