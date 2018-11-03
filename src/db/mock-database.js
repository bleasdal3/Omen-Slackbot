'use strict';

var Database = require("./database.js");

class MockDatabase extends Database
{
    fetchUnSignedRaiders() {
        return [
            "Kungfumoo#8622",
            "Tymia#2748"
        ];
    }
}

module.exports = MockDatabase;
