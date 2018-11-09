'use strict';

var Job = require("./job.js");

class DonateChaser extends Job {
    onInterval() {
        let date = new Date();
        let dow = date.getDay();
        let hour = date.getHours();

        //reset process counter
        if (this.processed && this.processed.getDay() != dow) {
            this.processed = false;
        }

        if (this.config.interval.weekdays.indexOf(dow) == -1 &&
            hour != this.config.hour) {
            return;
        }

        this.processJob();
    }

    processJob() {
        if (this.processed) {
            return;
        }

        let promise = this.database.fetchRequiredDonaters();

        promise.then((raiders) => {
            if (raiders.length == 0) {
                return;
            }

            let channel = this.discord.channels.get(this.config.channel);

            if (!channel) {
                console.log("No channel found, unable to execute this job");
                return;
            }

            let mentions = '';
            raiders.forEach(function(user) {
                mentions += ' <@' + user + '>';
            }.bind(this));

            channel.send("Missing donations from:" + mentions);
            this.processed = new Date();
        });
    }
}

module.exports = DonateChaser;
