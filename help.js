const { exec } = require("child_process");
const Discord = require('discord.js');

function help(client, prefix) {
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'help')) {
            const HelpEmbed = new Discord.MessageEmbed()
                .setColor('#920089')
                .setTitle('**__Commands__**')
                .setDescription(`${prefix}help - Displays this message\n${prefix}info - Displays DiscordDockerBot information\n${prefix}cmd {COMMAND} - Runs linux command\n${prefix}init - Initializes Server Specific Container`)

            msg.channel.send(HelpEmbed);
      }    
});
}
module.exports = help
