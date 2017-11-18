// var pool = require("dbpool");

// pool.query("select * from sys_user", function(err, rows, fields){
//     for(var row of rows){
//         var result = "";
//         console.log("==============");
//         for(var field of fields){
//             result += " " + row[field.name];
//         }

//         console.log(result);
//     }
// });

var SysUser = require("entity/sys_user");
var SysLog = require("entity/sys_log");
var user = new SysUser();
user.userid = "test";
SysUser.getById(user, function(result){
    console.log("test's name is : " + result.username);
});

console.log("new s1:");
var s1 = new SysUser();
s1.userid = "s1";
console.log("s1.userid:" + s1.userid);
console.log("new s2:");
var s2 = new SysUser();
console.log("new s3:");
var s3 = new SysLog();

console.log(s1 === s2);
console.log(s1.select === s2.select);