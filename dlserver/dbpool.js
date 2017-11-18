var mysql = require("mysql");

console.log("========create pool begin=======");
var dbpool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "db_system"
});
console.log("========create pool end=======");

module.exports = dbpool;