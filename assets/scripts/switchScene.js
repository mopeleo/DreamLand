var Scene = require("pubScene");
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
        Scene.goHome();
    },

    gomining:function(){
        Scene.goMining();
    },

    chooseActor:function(){
        if(BattleData.isArchive()){
            Alert.show("请先结束游戏存档");
            return;
        }
        BattleData.initPartnerSelect(this.sceneName, Scene.actorselect.selectorNum);
        Scene.goActorSelect();
    },

    goBattle:function(){
        if(BattleData.battlePartnerNum == 0){
            Alert.show("请先选择上场角色");
            return;
        }
        var nextscene = Scene[BattleData.scene];
        if(nextscene.playerMinNum && BattleData.battlePartnerNum < nextscene.playerMinNum){
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
        Scene.goHome();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
