require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "ap?";
const cmd = require("./cmd.js");
const figlet = require('./figlet.js');
const info = require('./info.js');
const dockerinit = require('./dockerinit.js');
//const chgprefix = require('./prefix.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

cmd(client, prefix);
figlet(client, prefix);
info(client, prefix);
dockerinit(client, prefix);
//chgprefix(client, prefix);

client.login(process.env.TOKEN);