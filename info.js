const { exec } = require("child_process");
function info(client, prefix) {
const command = `echo "Hello there! This is AppleCMD Bot (Name WIP). Each command output is from a linux container specifically for this server! Type ${prefix}help for more info."`
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'info')) {
        exec(`docker run --rm ubuntu ${command}`, (error, stdout, stderr) => {
            if (error) {
                msg.channel.send(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                msg.channel.send(`stderr: ${stderr}`);
                return;
            }
            msg.channel.send("```" + stdout + "```");
        });        
      }    
});
}
module.exports = info
