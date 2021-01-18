const glob = require("glob");
module.exports = function Init(client) {
  let eventFiles = glob.sync("./src/events/*.js");

  eventFiles.forEach((file) => {
    let event = require(`../../${file}`);
    let eventName = file.replace(/^.*[\\\/]/, '')
    eventName = eventName.split(".")[0];
    
    client.on(eventName, event.bind(null, client));

    delete require.cache[require.resolve(`../../${file}`)];
  });
};
