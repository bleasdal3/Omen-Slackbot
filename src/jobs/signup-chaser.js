'use strict';

var Job = require("./job.js");

class SignUpChaser extends Job {
    onInterval() {
        let date = new Date();
        let dow = date.getDay();
        let hour = date.getHours();

        if (this.config.weekdays.indexOf(dow) == -1 &&
            hour != this.config.hour) {
            return;
        }

        this.processJob();
    }

    processJob() {
        let unsigned = this.database.fetchUnSignedRaiders();

        unsigned.forEach(function(user) {
            console.log(user);
        });
    }
}

module.exports = SignUpChaser;
