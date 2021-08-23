const { exec } = require("child_process");
const Discord = require('discord.js');

function help(client, prefix) {
const command = `printf "${prefix}help - Displays this message\n${prefix}info - Displays DiscordDockerBot information\n${prefix}cmd {COMMAND} - Runs linux command\n${prefix}init - Initializes Server Specific Container"`
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'help')) {
        exec(`docker run --rm ubuntu ${command}`, (error, stdout, stderr) => {
            if (error) {
                msg.channel.send(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                msg.channel.send(`stderr: ${stderr}`);
                return;
            }
            const HelpEmbed = new Discord.MessageEmbed()
                .setColor('#920089')
                .setTitle('**__Commands__**')
                .setDescription(stdout)

            msg.channel.send(HelpEmbed);
        });        
      }    
});
}
module.exports = help
