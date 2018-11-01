'use strict';

require("./job.js")

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

    processJob() {}
}
