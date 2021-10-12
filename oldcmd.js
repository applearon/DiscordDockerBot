const { exec } = require("child_process");
const { createCanvas} = require('canvas')
const Discord = require('discord.js');
const http = require('http');
const options = {
    socketPath: '/var/run/docker.sock',
    path: '/v1.41/containers/json',
    method: 'GET'
};
function checkrun(names, msg) {
    
}

function cmd(client, prefix) {
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'cmd')) {
        let text = msg.content.substr(msg.content.indexOf(" ") + 1);

        exec(`docker container ls -q -f name=${msg.guild.id}`, (errore, stdoute, stderre) => {
        if (stdoute.length === 0) {
                msg.channel.send("```\n" + `Container Not initialized! type ${prefix}init to initalize.` + "```")
        } else if (text.toLowerCase() === prefix + "cmd") {
            exec(`docker run --rm archlinux echo "Usage: ${prefix}cmd {LINUX/BASH COMMAND}"`, (error, output, stderr) => {
                msg.channel.send("```" + output + "```");
            });
        } else {
                let command = text.replace(`'`, `\'`);
                let docker = `docker exec ${msg.guild.id} sh -c '${command}'`;
                exec(docker, (error, stdout, stderr) => {
                    if (error) {
                        if (error.message === "stderr maxBuffer length exceeded") {
                            msg.channel.send("```\nMessage output is too large.```");
                            return;
                        } else {
                        const height =  error.message.split(/\r\n|\r|\n/)
                        const trulength = Math.max(...(height.map(el => el.length)));
                        const canvas = createCanvas(50+trulength*20, 50+(height.length-1)*40);
                        const ctx = canvas.getContext('2d')
                        ctx.fillStyle = "Black";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.font = '30px Mono'
                        ctx.fillStyle = "White";
                        ctx.fillText(error.message, 25, 50)
                        //console.log(canvas.toDataURL())
                        //console.log(error);
                        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'output.png');
                        msg.channel.send(attachment);           
                        return;
                    }}
                    if (stderr) {
                    const height =  stderr.split(/\r\n|\r|\n/)
                    const trulength = Math.max(...(height.map(el => el.length)));
                    const canvas = createCanvas(50+trulength*20, 50+(height.length-1)*40);
                    const ctx = canvas.getContext('2d')
                    ctx.fillStyle = "Black";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.font = '30px Mono'
                    ctx.fillStyle = "White";
                    ctx.fillText(stderr, 25, 50)
                    //console.log(canvas.toDataURL())
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'output.png');
                    msg.channel.send(attachment);       
                        return;
                    }
                    if (stdout) {
                    //msg.channel.send("```\n" + stdout + "```");
                    if (stdout.length <= 1) {
                        msg.channel.send("```\nNo Output.```")
                        return;
                    } else {
                    //console.log(stdout.length)
                    const height =  stdout.split(/\r\n|\r|\n/)
                    const trulength = Math.max(...(height.map(el => el.length)));
                    const canvas = createCanvas(50+trulength*20, 50+(height.length-1)*40);
                    const ctx = canvas.getContext('2d')
                    ctx.fillStyle = "Black";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.font = '30px Mono'
                    ctx.fillStyle = "White";
                    ctx.fillText(stdout, 25, 50)
                    //console.log(canvas.toDataURL())
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'output.png');
                    msg.channel.send(attachment);
                    return;   
                    };
                    }
                });        
    }
    })
      }
});
}
module.exports = cmd