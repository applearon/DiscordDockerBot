const { exec } = require("child_process");

function chgprefix(client, prefix) {
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'prefix')) {
        let text = msg.content.substr(msg.content.indexOf(" ") + 1);
        if (text === prefix + "prefix") {
            msg.channel.send(`Usage: ${prefix}prefix {BOT PREFIX}`);
        } else {
            let prefix = text;
            let docker = `docker run --rm archlinux sh -c echo "You have successfully changed the prefix to ${prefix}"`;
        exec(docker, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            msg.channel.send("```" + stdout + "```");
        });        
    }
      }    
});
}
module.exports = chgprefix 