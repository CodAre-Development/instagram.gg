module.exports = (client, message) => {
  // Ignore all bots
  if (message.authorID === client.user.id) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (!message.content.startsWith(client.config.prefix)) return;
    

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  message.markSeen();

  try {
  cmd.execute(client, message, args);
  } catch(error) {
  console.error(error);
  }
};
