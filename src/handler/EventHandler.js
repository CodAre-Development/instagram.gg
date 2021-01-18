const glob = require("glob");
module.exports = function Init(client) {
  const eventFiles = glob.sync("./src/events/*.js");

  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);
    let eventName = file.replace(/^.*[\\\/]/, '')
    console.log(eventName);
    
    client.on(eventName, event.bind(null, client));

    delete require.cache[require.resolve(`../../${file}`)];

    // debug
    // Logger.log("events", `Loaded ${bot.toCapitalize(type)}: ${event.name}`);
  });
};
