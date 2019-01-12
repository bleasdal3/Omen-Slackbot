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
                "SELECT u.id FROM discordUsers AS u WHERE u.websiteName NOT IN " +
                "(SELECT s.player FROM signs AS s)",
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
            let users = {};
            
            this.connection.query(
                "SELECT u.id, s.missing FROM discordUsers AS u " +
                "INNER JOIN missingDonations AS s ON u.websiteName = s.name " +
                "WHERE u.recruit = 0",
                (error, results, fields) => {
                    if (results.length == 0) {
                        resolve(null);
                        return;
                    }

                    results.forEach((result) => {
                        users[result.id] = result.missing;
                    });

                    resolve(users);
                }
            );
        });
    }
}

module.exports = Database;
