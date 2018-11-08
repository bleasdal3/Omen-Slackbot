'use strict';

var Job = require("./job.js");

class SignUpChaser extends Job {
    onInterval() {
        let date = new Date();
        let dow = date.getDay();
        let hour = date.getHours();

        //reset process counter
        if (this.processed && this.processed.getDay() != dow) {
            this.processed = false;
        }

        if (this.config.weekdays.indexOf(dow) == -1 &&
            hour != this.config.hour) {
            return;
        }

        this.processJob();
    }

    processJob() {
        if (this.processed) {
            return;
        }

        let promise = this.database.fetchUnSignedRaiders();

        promise.then((unsigned) => {
            if (unsigned.length == 0) {
                return;
            }

            let channel = this.discord.channels.get(this.config.channel);

            if (!channel) {
                console.log("No channel found, unable to execute this job");
                return;
            }

            let mentions = '';
            unsigned.forEach(function(user) {
                mentions += ' <@' + user + '>';
            }.bind(this));

            channel.send("Please sign up for the raid" + mentions);
            this.processed = new Date();
        });
    }
}

module.exports = SignUpChaser;
