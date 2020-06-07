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
    connection = await mysql.createConnection(connectionOptions);
    let result = await connection.query(`select * from \`flower-db\``);
    console.log(result);
    res.send({ msg: result});
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

module.exports = router;
