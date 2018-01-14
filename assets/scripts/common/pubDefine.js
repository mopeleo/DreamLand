module.exports = {
    SERVER_HOST: "ws://127.0.0.1:8080/dlserver/websocket",
    SERVICES:{
        userservice: "userservice",    //用户服务名
        data:1
    },
    SCENES:{
        actorchoose: "actorChoose",
        mining     : "mining",
        home       : "home",
        mission1   :{
            name: "mission1",
            playerMinNum: 2,     //战斗场景玩家最小个数
            playerMaxNum: 5,     //战斗场景玩家最大个数
            enemyMinNum:8,      //战斗场景敌人最小个数
            enemyMaxNum:10,     //战斗场景敌人最大个数
            allowEnemy:["0001", "0002", "0003", "0004"],         //允许出现的敌方ID
            getEnemyNum:function(){
                var num = Math.floor((Math.random() * (this.enemyMaxNum - this.enemyMinNum)));
                num = num + this.enemyMinNum;
                return num;
            }
        }
    },
    INIT_ACTOR_SPRITEFRAME: {
        frameid: "0000",                          //战场默认单元格spriteframe的ID
        rawurl : "resources/player/0000.jpg"      //战场默认单元格spriteframe的背景
    },
    PIC_URL:{
        enemydir : "resources/enemy/",
        playerdir: "resources/player/"
    },
    //角色选择场景参数
    CHOOSE_SCENE_PARAM:{
        selectorWidth : 80,
        selectorHeight: 80,
        selectorNum : 6
    },
    //战斗场景参数
    BATTLE_SCENE_PARAM:{
        bgWidth:480,        //战斗场景背景图片宽度
        bgHeight:480,       //战斗场景背景图片高度
        cellWidth:80,       //战斗场景单元格高度
        cellHeight:80,      //战斗场景单元格宽度
        floor:1,            //战斗场景楼层计数器
        sceneName:"home",   //战斗场景名称
        playerActorNum:0,   //玩家上场角色个数
        playerActors:["","","","","",""],    //玩家上场的角色ID列表，个数与最大保持一致
        getBattleRows:function(){
            return this.bgHeight/this.cellHeight;   //获得战斗场景行数
        },
        getBattleCols:function(){
            return this.bgWidth/this.cellWidth;     //获得战斗场景列数
        },
        init:function(scenename){
            this.floor = 1;
            this.sceneName = scenename;
            this.playerActorNum = 0;
            this.playerActors = ["","","","","",""];
        },
        addActor:function(index, val){
            if(index < 0 || index > this.playerActors.length){
                return;
            }
            this.playerActorNum++;
            this.playerActors[index] = val;
        },
        removeActor:function(index){
            if(index < 0 || index > this.playerActors.length){
                return;
            }
            this.playerActorNum--;
            this.playerActors[index] = "";
        },
        clearActor:function(){
            this.playerActorNum = 0;
            this.playerActors = ["","","","","",""];
        }
    },
    data : null
};

