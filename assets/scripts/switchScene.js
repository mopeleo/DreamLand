var CONSTANT = require("pubDefine");
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
        var param = {action:"login", loginid : userid, loginpwd: password};
        socket.emit(CONSTANT.SERVICES.userservice, param);
        socket.on(CONSTANT.SERVICES.userservice, function(res){
            if(res.success == true){
                message.string = "欢迎 ： " + res.results[0].nickname;
                cc.director.loadScene(CONSTANT.SCENES.home);
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
        CONSTANT.BATTLE_SCENE_PARAM.init(this.sceneName);
        cc.director.loadScene(CONSTANT.SCENES.actorchoose);
    },

    goBattle:function(){
        if(CONSTANT.BATTLE_SCENE_PARAM.playerActorNum == 0){
            Alert.show("请先选择上场角色");
            return;
        }
        var nextscene = CONSTANT.SCENES[CONSTANT.BATTLE_SCENE_PARAM.sceneName];
        if(nextscene.playerMinNum && CONSTANT.BATTLE_SCENE_PARAM.playerActorNum < nextscene.playerMinNum){
            Alert.show("上场角色不能少于" + nextscene.playerMinNum);
            return;
        }
        cc.director.loadScene(CONSTANT.BATTLE_SCENE_PARAM.sceneName);
    },

    exitApp:function(){
        cc.director.end();
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
