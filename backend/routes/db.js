let express = require("express");
let router = express.Router();

const mysql = require("promise-mysql");

let connectionOptions = {
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

let connection = null;

router.get("/", async function (req, res, next) {
    res.send({ msg: "this is the database API home page" });
  });

router.get("/connectToDB", async function (req, res, next) {
  //Connect to the database
  try {
    connection = await mysql.createPool(connectionOptions);
    res.send({ msg: "Successfully connected to DB"});
  } catch (error) {
    res.status(500);
    res.send({ err: error });
  }
});

router.get("/queryDB", async function (req, res, next) {
  //Connect to the database
  try {
    let result = await connection.query(`select * from \`flower-db\``);
    res.send({ msg: result });
  } catch (error) {
    res.status(500);
    res.send({ err: error });
  }
});

router.post("/getColorList", async function (req, res, next) {
  let arrayOfChildrenGenes = Object.keys(req.body.listOfFlowers);
  try {
    //Build the query string
    let queryString = "select * from `flower-db` where numericGenotype in ";
    let numericGenotypeString = "(";
    //Build the list of genes to include in the list for the query
    for (let i = 0; i < arrayOfChildrenGenes.length; i++) {
      numericGenotypeString = numericGenotypeString + "'" + arrayOfChildrenGenes[i] + "'";
      if (i < arrayOfChildrenGenes.length - 1) {
        numericGenotypeString = numericGenotypeString + ", ";
      }
    }

    //Specify the species
    numericGenotypeString = numericGenotypeString + ") and species = '" + req.body.species + "'";

    let result = await connection.query(queryString + numericGenotypeString);
    res.send({ msg: result });
  } catch (error) {
    res.status(500);
    res.send({ err: error });
  }
});

module.exports = router;
