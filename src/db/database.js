'use strict';

class Database {
    constructor(connection) {
        this.connection = connection;

        if (connection) {
            connection.connect();
        }
    }

    fetchUnSignedRaiders() {

    }

    fetchRequiredDonaters() {

    }
}

module.exports = Database;
