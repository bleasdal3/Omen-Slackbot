'use strict';

var Database = require("./database.js");

class MockDatabase extends Database
{
    fetchUnSignedRaiders() {
        return [
            "230604196490117120", //kfm
            "230102238306107392" //tym
        ];
    }

    fetchRequiredDonaters() {
        return this.fetchUnSignedRaiders();
    }
}

module.exports = MockDatabase;
