'use strict';

var Job = require("./job.js");

class RoleUpdater extends Job {
    handleRoleRemoval(discordUser) {
        let promise = this.database.removeUser(discordUser.id);

        promise.then(() => {
            //notify admin
            let discordPromise = this.discord.fetchUser(this.config.admin);

            discordPromise.then((adminUser) => {
                adminUser.send("Removed user " + discordUser.id);
            });
        });
    }

    handleRoleAdd(discordUser) {
        let discordPromise = this.discord.fetchUser(this.config.admin);

        discordPromise.then((adminUser) => {
            let name = discordUser.nickname;

            if (!name) {
                name = discordUser.displayName;
            }

            name = discordUser.id + " : " + name;

            adminUser.send("You need to add the user " + name);
        });
    }
}

module.exports = RoleUpdater;
