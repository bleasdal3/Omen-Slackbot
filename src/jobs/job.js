'use strict';

class Job {
    constructor(config) {
        this.config = config;
    }

    onInterval() {}

    processJob() {}
}

module.exports = {Job: Job};
