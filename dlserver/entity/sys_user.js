var pool = require("dbpool");

var SysUser = function(){
    this.userid = "";
    this.pwd = "";
    this.username = "";
}

SysUser.getById = function(reqObj, callback){
    var user = new SysUser();
    pool.query("select * from sys_user where userid = ?",[reqObj.userid], function(err, rows, fields){
        if(rows && rows.length > 0){
            user = rows[0];
        }

        callback(user);
    });
}

SysUser.query = function(reqObj){
    var userList = [];

    return userList;
}

module.exports = SysUser;
