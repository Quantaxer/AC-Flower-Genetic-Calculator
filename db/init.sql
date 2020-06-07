CREATE TABLE `flower-db` (
    id int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    species varchar(255) NOT NULL,
    gene varchar(255) NOT NULL,
    seeded boolean
);

LOAD DATA INFILE '../populate_db.csv' 
    INTO TABLE `flower-db`
    FIELDS TERMINATED BY ',' 
    ENCLOSED BY '"'
    (species, gene, seeded)
    SET ID = NULL;
