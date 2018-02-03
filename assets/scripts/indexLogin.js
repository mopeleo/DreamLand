var websocket = require("netEngine");
var CONSTANT = require("pubDefine");
cc.Class({
    extends: cc.Component,

    properties: {
        iptUsername: {
            default:null,
            type:cc.EditBox
        },

        iptPassword: {
            default:null,
            type:cc.EditBox
        },

        btnLogin: {
            default:null,
            type:cc.Button
        },

        btnLogout: {
            default:null,
            type:cc.Button
        },

        txtMessage:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        var userid = cc.sys.localStorage.getItem("userid");
        if(userid){
            this.iptUsername.string = userid;
        }
        this.btnLogin.node.on(cc.Node.EventType.TOUCH_END, this.login, this);
        this.btnLogout.node.on(cc.Node.EventType.TOUCH_END, function(){cc.director.end();}, this);
    },

    login:function(){
        var self = this;
        var userid = self.iptUsername.string;
        var password = self.iptPassword.string;
        var param = {action:"login", loginid : userid, loginpwd: password};
        websocket.send("userservice", param, function(res){
            if(res.success == true){
                self.txtMessage.string = "欢迎 ： " + res.results[0].nickname;
                cc.sys.localStorage.setItem("userid", userid);
                cc.director.loadScene(CONSTANT.SCENES.home.name);
            }else{
                self.txtMessage.string = res.retmsg;
            }
        });
    },
});
