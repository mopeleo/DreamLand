var CONSTANT = require("common/pubDefine");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        sceneName:''
    },

    // use this for initialization
    onLoad: function () {

    },

    login:function(){
        var userid = this.indexLogin.username.string;
        var password = this.indexLogin.password.string;
        var message = this.indexLogin.message;
        var socket = io.connect(CONSTANT.SERVER_HOST);
        socket.emit("userservice", {action:"login", loginid : userid, loginpwd: password});
        socket.on("userservice", function(res){
            console.log(res);
            if(res.success == true){
                message.string = "欢迎 ： " + res.results[0].nickname;
                cc.director.loadScene("home");
            }else{
                message.string = res.retmsg;
            }
        });
    },

    logout:function(){
        this.indexLogin.message.string = "您已退出";
    },

    gohome:function(){
        cc.director.loadScene("home");
    },

    gomining:function(){
        cc.director.loadScene("mining");
    },

    nextfloor:function(scene){
        cc.director.loadScene(scene);
    },

    chooseActor:function(){
        CONSTANT.DATA_EXCHANGE.goscene = this.sceneName;
        CONSTANT.DATA_EXCHANGE.floor = 1;
        CONSTANT.DATA_EXCHANGE.battleNumber = 0;
        CONSTANT.DATA_EXCHANGE.battleActors = ["","","","","",""];
        cc.director.loadScene("actorChoose");
    },

    goScene:function(){
        if(CONSTANT.DATA_EXCHANGE.battleNumber == 0){
            Alert.show("请先选择上场角色");
            return;
        }
        cc.director.loadScene(CONSTANT.DATA_EXCHANGE.goscene);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
