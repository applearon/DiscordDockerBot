const { exec } = require("child_process");

function dockerinit(client, prefix) {
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'init')) {
        msg.channel.send("```\nResetting The VM...```");
        exec(`docker stop ${msg.guild.id} || true && docker rm ${msg.guild.id} || true && docker create --name ${msg.guild.id} alpine:latest sleep infinity && docker start ${msg.guild.id}`, (error, stdout, stderr) => {
            msg.channel.send("```\nVirtual Machine Reset!```");
        })
    }  
});
}
module.exports = dockerinit