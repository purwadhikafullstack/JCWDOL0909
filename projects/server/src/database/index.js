const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection({
  host: "purwadhikabootcamp.com",
  user: "user0909",
  password: "group09",
  database: "jcwdol0909",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    return console.log(`error : ${err.message}`);
  }
  console.log("connect to mysql");
});

const query = util.promisify(db.query).bind(db);
module.exports = { db, query };
