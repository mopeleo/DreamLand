var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_system"
});

connection.connect();

connection.query("select * from sys_user", function(err, rows, fields){
    for(var row of rows){
        var result = "";
        for(var field of fields){
            result += " " + row[field.name]
        }

        console.log(result);
    }
});

connection.end();