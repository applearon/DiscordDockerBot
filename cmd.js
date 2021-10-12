const { exec } = require("child_process");
const Discord = require('discord.js');
var util = require('util')
var Docker = require('dockerode');
var docker = new Docker();
const { createCanvas} = require('canvas')


function newcmd(client, prefix) {
client.on('message', msg => {
    if (msg.content.toLowerCase().startsWith(prefix + 'cmd')) {
      let text = msg.content.substr(msg.content.indexOf(" ") + 1);
      exec(`docker container ls -q -f name=${msg.guild.id}`, (errore, stdoute, stderre) => {
        if (stdoute.length === 0) {
                msg.channel.send("```\n" + `Container Not initialized! type ${prefix}init to initalize.` + "```")
        } else if (text.toLowerCase() === prefix + "cmd") {
                msg.channel.send("```" + `Usage: ${prefix}cmd {LINUX/BASH COMMAND}` + "```");
        } else {
      try {
      //create their CMD
      var options = {
        Cmd: ['/usr/bin/timeout', '30s', '/bin/sh', '-c', `${text}`],
        Env: ['TERM=dumb'],
        AttachStdout: true,
        AttachStderr: true
      };    
      async function test() {
        const containers = await docker.listContainers();
        const names = containers.filter(it => it.Names[0] === `/${msg.guild.id}`);
        //console.log(names)
        container = docker.getContainer(names[0].Id)
        await container.exec(options, function(err, exec) {
            exec.start(function(err, stream) {
                //stream.pipe(process.stdout);
                let output = [];
                
                stream.on("data", (cb) => {
                  cb = String(cb).substr(8);
                  if (output.length < 100) {
                  output.push(cb);
                  }
                })
                stream.on("end", () => {
                  output = output.join('');
                  colours = output.split('\e[');
                  //console.log(colours);
                  var height =  output.split(/\r\n|\r|\n/)
                  if (height.length > 100000 || output.length > 10000) {
                      output = "Output too large.\n";
                      height =  output.split(/\r\n|\r|\n/);
                  }
                  const trulength = Math.max(...(height.map(el => el.length)));
                  const canvas = createCanvas(50+trulength*20, 50+(height.length-1)*40);
                  const ctx = canvas.getContext('2d')
                  ctx.fillStyle = "Black";
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  ctx.font = '30px Mono'
                  ctx.fillStyle = "White";
                  ctx.fillText(output, 25, 50)
                  //console.log(canvas.toDataURL())
                  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'output.png');
                  msg.channel.send(attachment);
                 // msg.channel.send(output.normalize());
                  //console.log(output.normalize());
                  //console.log(output.length);
                  return;   
                })
                //Docker.getContainer(names[0].Id).modem.demuxStream(stream, stdout, process.stderr);
            })
        });
        
        };
        test();        
    } catch (error) {
      msg.channel.send("```\nSomething went wrong :/\nError:"+ error)
    }
  }});
      }
});
}
module.exports = newcmd
