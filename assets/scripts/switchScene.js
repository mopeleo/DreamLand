var CONSTANT = require("pubDefine");
var BattleData = require("battleData");

cc.Class({
    extends: cc.Component,

    properties: {
        sceneName:''
    },

    // use this for initialization
    onLoad: function () {
    },

    gohome:function(){
        cc.director.loadScene(CONSTANT.SCENES.home.name);
    },

    gomining:function(){
        cc.director.loadScene(CONSTANT.SCENES.mining.name);
    },

    chooseActor:function(){
        if(BattleData.isArchive()){
            Alert.show("请先结束游戏存档");
            return;
        }
        BattleData.initActorChoose(this.sceneName);
        cc.director.loadScene(CONSTANT.SCENES.actorchoose.name);
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
