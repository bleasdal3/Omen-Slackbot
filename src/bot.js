const Discord = require('discord.js');
const auth = require('../auth.json');
const config = require('../config/bot-config.json');

const client = new Discord.Client();
const CHECK_PERIOD = 3.6e6;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.setInterval(() => {
    //TODO: run bot jobs
}, CHECK_PERIOD);

client.login(auth.token);
