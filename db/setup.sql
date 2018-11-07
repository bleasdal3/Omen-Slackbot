CREATE TABLE discordUsers (
    id VARCHAR(32) PRIMARY KEY,
    discordName VARCHAR(255),
    websiteName VARCHAR(255)
);

CREATE TABLE missingDonations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE missingSigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);
