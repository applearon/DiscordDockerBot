const { exec } = require("child_process");
function info(client, prefix) {
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'info')) {
        msg.channel.send("Hello there! This is AppleCMD Bot (Name WIP). Each command output is from a linux container specifically for this server! Type ${prefix}help for more info.")
      }    
});
}
module.exports = info
