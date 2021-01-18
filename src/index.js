const Insta = require('@androz2091/insta.js');
const Collection = require('@discordjs/collection');
const config = require('../config.json');

const client = new Insta.Client();

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.config = config;

require("./handler/CommandHandler")(client);
require("./handler/EventHandler")(client);

client.login(process.env.USERNAME, process.env.PASSWORD);

process.on("unhandledRejection", (error) => console.error(error));

process.on("uncaughtExceptionMonitor", (error) => console.error(error));

process.on("warning", (warning) => {
  if (warning.stack.startsWith("(node:13988) [DEP0148]")) return;

  console.error(warning);
})
