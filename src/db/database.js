'use strict';

class Database {
    constructor(connection) {
        this.connection = connection;

        if (connection) {
            connection.connect();
        }
    }

    fetchUnSignedRaiders() {
        return new Promise((resolve, reject) => {
            let users = [];

            this.connection.query(
                "SELECT u.id FROM discordUsers AS u WHERE u.websiteName IN " +
                "(SELECT s.name FROM missingSigns AS s)",
                (error, results, fields) => {
                    results.forEach((result) => {
                        users.push(result.id);
                    });

                    resolve(users);
                }
            );
        });
    }

    fetchRequiredDonaters() {
        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => {
                let users = [];

                this.connection.query(
                    "SELECT u.id FROM discordUsers AS u WHERE u.websiteName IN " +
                    "(SELECT s.name FROM missingDonations AS s)",
                    (error, results, fields) => {
                        results.forEach((result) => {
                            users.push(result.id);
                        });

                        resolve(users);
                    }
                );
            });
        });
    }
}

module.exports = Database;
