CREATE TABLE `flower-db` (
    id int(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    species varchar(255) NOT NULL,
    genotype varchar(255) NOT NULL,
    numericGenotype varchar(255) NOT NULL,
    color varchar(255) NOT NULL,
    seeded boolean
);

LOAD DATA INFILE '../populate_db.csv' 
    INTO TABLE `flower-db`
    FIELDS TERMINATED BY ',' 
    ENCLOSED BY '"'
    (species, genotype, numericGenotype, color, seeded)
    SET ID = NULL;
