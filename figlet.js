const { exec } = require("child_process");
const { createCanvas} = require('canvas')
const Discord = require('discord.js');

function figlet(client, prefix) {
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'figlet')) {
        let text = msg.content.substr(msg.content.indexOf(" ") + 1);
        if (text === prefix + "figlet") {
            exec(`docker run --rm archlinux echo "Usage: ${prefix}figlet {TEXT}"`, (error, output, stderr) => {
                msg.channel.send("```" + output + "``` ");
            });
        } else {
            let command = text;
            let docker = `docker run --rm archlinux bash -c "pacman -Sy --noconfirm figlet > /dev/null && figlet '${command}'"`;
        exec(docker, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            } 
            //msg.channel.send("```" + stdout + "```");

            const height =  stdout.split(/\r\n|\r|\n/)
            const trulength = Math.max(...(height.map(el => el.length)));
            const canvas = createCanvas(trulength*20, height.length*40);
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = "Black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '30px Mono'
            ctx.fillStyle = "White";
            ctx.fillText(stdout, 0, 30)
            console.log(canvas.toDataURL())
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
            msg.channel.send(attachment);
        });
    }
      }
});
}
module.exports = figlet
