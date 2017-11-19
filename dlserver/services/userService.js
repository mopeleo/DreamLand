var SysUser = require("entity/sys_user");

var UserService = {};

UserService.login = function(req, callback){
    var user = new SysUser();
    user.userid = req.userid;
    SysUser.getById(user, function(result){
        if(result.pwd == req.pwd){
            callback(result);
        }else{

        }
    });
}

module.exports = UserService;