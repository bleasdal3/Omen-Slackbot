'use strict';

class Job {
    constructor(config, database) {
        this.config = config;
        this.database = database;
    }

    onInterval() {}

    processJob() {}
}

module.exports = Job;
