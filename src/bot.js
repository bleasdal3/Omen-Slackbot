const Discord = require('discord.js');
const mysql = require('mysql');
const auth = require('../auth.json');
const config = require('../config/bot-config.json');
const jobs = require('./jobs');
const db = require('./db');

const client = new Discord.Client();
const CHECK_PERIOD = 60000;
//const database = new db.MockDatabase(null);
const database = new db.Database(mysql.createConnection(require('../config/mysql-config.json')));

const jobsToRun = [
    new jobs.SignUpChaser(config.signups, client, database),
    new jobs.DonateChaser(config.donations, client, database)
];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.setInterval(() => {
        jobsToRun.forEach((job) => {
            //job.processJob(); //TODO: onInterval
        });

        //keep connection alive, I'm sure you are not supposed to do this lol but oh well
        if (database.connection) {
            database.connection.query("SELECT 1", () => {});
        }
    }, CHECK_PERIOD);
});

client.on('message', msg => {
    if (msg.content === '!listRaiders' && msg.author.id == config.main.admin) {
        const guild = client.guilds.get(config.main.guild);

        if (!(guild && guild.available)) {
            return;
        }

        let membersWithRole = guild.roles.get("474545706841931776").members; //raider

        membersWithRole.array().forEach((member) => {
            let name = member.nickname;

            if (!name) {
                name = member.displayName;
            }

            msg.reply(member.id + " : " + name);
        });
    }
});

client.on('error', (error) => {
    console.log(error.name);
    console.log(error.message);
});

client.login(auth.token);
