CREATE TABLE `flower-db` (
    `id` int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `species` varchar(255) NOT NULL,
    `gene` varchar(255) NOT NULL
);

INSERT INTO `flower-db` (species, gene) VALUES ('Tulip', 'Rr-Yy-ww');
