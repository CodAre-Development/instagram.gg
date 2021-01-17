const glob = require("glob");
const Collection = require('@discordjs/collection');

module.exports = function Init(client) {
  const commandFiles = glob.sync("./src/commands/**/*.js");

  for (const file of commandFiles) {
    const cmd = require(`../../${file}`);

    if (!cmd.name) {
      throw new TypeError(`[ERROR][COMMANDS]: name is required for commands! (${file})`);
    }

    if (!cmd.execute) {
      throw new TypeError(
        `[ERROR][COMMANDS]: execute function is required for commands! (${file})`
      );
    }

    if (cmd.aliases) {
      for (const alias of cmd.aliases) {
        client.aliases.set(alias, cmd.name);
      }
    }

    client.commands.set(cmd.name, cmd);

    const cooldowns = client.cooldowns;

    if (!cooldowns.has(cmd.name)) {
      cooldowns.set(cmd.name, new Collection());
    }
    // debug
    // Logger.log("commands", `Loaded Command: ${cmd.name}`);
  }
};
