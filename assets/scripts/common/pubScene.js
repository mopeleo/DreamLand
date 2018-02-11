//场景相关常量
var SCENE_TYPE_SHOW   = 1;           //场景类型-展示
var SCENE_TYPE_BATTLE = 2;           //场景类型-战斗
var DEFAUTL_ENEMY_MINNUM = 5;        //默认敌人最小数量
var DEFAUTL_ENEMY_MAXNUM = 10;       //默认敌人最大数量

//场景信息
module.exports = {
    //主页
    home: {
        name: "home111",
        type: SCENE_TYPE_SHOW
    },
    //角色选择
    actorselect: {
        name: "actorselect111",
        selectorWidth : 80,
        selectorHeight: 80,
        selectorNum : 6,
        type: SCENE_TYPE_SHOW
    },
    //探险
    mining: {
        name: "mining111",
        type: SCENE_TYPE_SHOW
    },
    //战斗场景
    mission1: {
        name: "mission1111",
        playerMinNum: 2,     //战斗场景玩家最小个数
        playerMaxNum: 5,     //战斗场景玩家最大个数
        enemyMinNum: 6,      //战斗场景敌人最小个数
        enemyMaxNum: 10,     //战斗场景敌人最大个数
        allowEnemy: ["0001", "0002", "0003", "0004"],        //允许出现的敌方ID
        forbidPartner: ["0002","0003"],                        //禁止上场的角色
        dropItem: [{id:"0001",name:"name001",minfloor:1,rate:5,number:1}],
        dropEquip: [{id:"0001",name:"name001",minfloor:1,rate:5,number:1}],
        type: SCENE_TYPE_BATTLE
    },
    getEnemyNum : function(sceneId){
        var scene = this[sceneId];
        var minNum = DEFAUTL_ENEMY_MINNUM;
        var maxNum = DEFAUTL_ENEMY_MAXNUM;
        if(scene && scene.enemyMinNum != undefined ){
            minNum = scene.enemyMinNum;
        }
        if(scene && scene.enemyMaxNum != undefined){
            maxNum = scene.enemyMaxNum;
        }
        var num = Math.floor((Math.random() * (maxNum - minNum))) + minNum;
        if(num < DEFAUTL_ENEMY_MINNUM){
            num = DEFAUTL_ENEMY_MINNUM;
        }
        return num;
    },
    goHome:function(){
        cc.director.loadScene("home");
    },
    goIndex:function(){
        cc.director.loadScene("index");
    },
    goMining:function(){
        cc.director.loadScene("mining");
    },
    goActorSelect:function(){
        cc.director.loadScene("actorselect");
    },
};
