var CONSTANT = require("pubDefine");
var websocket = require("netEngine");
var BattleData = require("battleData");

cc.Class({
    extends: cc.Component,

    properties: {
        sceneName:''
    },

    // use this for initialization
    onLoad: function () {

    },

    // login:function(){
    //     var userid = this.indexLogin.username.string;
    //     var password = this.indexLogin.password.string;
    //     var message = this.indexLogin.message;
    //     var param = {action:"login", loginid : userid, loginpwd: password};

    //     var ws = new WebSocket(CONSTANT.SERVER_HOST);
    //     var identifier = "id";
    //     ws.onopen = function (msg) {
    //         var sendData = {
    //             "identifier": identifier,
    //             'type': 'send',
    //             "data": param,
    //         };
    //         var sendString = JSON.stringify(sendData);
    //         ws.send(sendString);
    //     };
    //     ws.onmessage = function(msg) {
    //         cc.log('net:receive:before: ' + msg.data);
    //         var data = JSON.parse(msg.data);
    //         if (data.identifier == identifier) {
    //             message.string = "欢迎 ： " + data.results[0].nickname;
    //             cc.director.loadScene(CONSTANT.SCENES.home);
    //             ws.close();
    //         }
    //         else {
    //             cc.log('net:receive: ' + msg);
    //         }
    //     };
    // },

    login:function(){
        var userid = this.indexLogin.username.string;
        var password = this.indexLogin.password.string;
        var message = this.indexLogin.message;
        var param = {action:"login", loginid : userid, loginpwd: password};
        websocket.send("userservice", param, function(res){
            if(res.success == true){
                message.string = "欢迎 ： " + res.results[0].nickname;
                this.gohome();
            }else{
                message.string = res.retmsg;
            }

        });
    },

    logout:function(){
        this.indexLogin.message.string = "您已退出";
    },

    gohome:function(){
        cc.director.loadScene(CONSTANT.SCENES.home);
    },

    gomining:function(){
        cc.director.loadScene(CONSTANT.SCENES.mining);
    },

    chooseActor:function(){
        if(BattleData.isArchive()){
            Alert.show("请先结束游戏存档");
            return;
        }
        BattleData.initActorChoose(this.sceneName);
        cc.director.loadScene(CONSTANT.SCENES.actorchoose);
    },

    goBattle:function(){
        if(BattleData.playerActorNum == 0){
            Alert.show("请先选择上场角色");
            return;
        }
        var nextscene = CONSTANT.SCENES[BattleData.scene];
        if(nextscene.playerMinNum && BattleData.playerActorNum < nextscene.playerMinNum){
            Alert.show("上场角色不能少于" + nextscene.playerMinNum);
            return;
        }
        BattleData.initBattleData();
        cc.director.loadScene(BattleData.scene);
    },

    exitApp:function(){
        cc.director.end();
    },

    saveGame:function(){
        BattleData.save();
    },

    overGame:function(){
        BattleData.clear();
        this.gohome();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
