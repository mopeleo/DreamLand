module.exports = {
    SERVER_HOST: "ws://127.0.0.1:8080/dlserver/websocket",
    SERVICES:{
        userservice: "userservice",    //用户服务名
        data:1
    },
    SCENES:{
        //主页
        home: {
            name: "home"
        },
        //角色选择
        actorchoose: {
            name: "actorChoose",
            selectorWidth : 80,
            selectorHeight: 80,
            selectorNum : 6
        },
        //探险
        mining: {
            name: "mining"
        },
        //战斗场景
        mission1: {
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
    PIC_URL:{
        blankpic : "resources/player/0000.jpg",      //空白图片
        enemydir : "resources/enemy/",
        playerdir: "resources/player/"
    },
    //战斗场景参数
    BATTLE_SCENE_PARAM:{
        bgWidth:480,        //战斗场景背景图片宽度
        bgHeight:480,       //战斗场景背景图片高度
        cellWidth:80,       //战斗场景单元格高度
        cellHeight:80,      //战斗场景单元格宽度
        enemyType:"0",      //敌方类型标识
        playerType:"1",     //我方类型标识
        getBattleRows:function(){
            return this.bgHeight/this.cellHeight;   //获得战斗场景行数
        },
        getBattleCols:function(){
            return this.bgWidth/this.cellWidth;     //获得战斗场景列数
        },
        getPositionX:function(colIndex){
            var cell_x = this.getBattleCols();
            return (colIndex - cell_x/2)*this.cellWidth + this.cellWidth/2;
        },
        getPositionY:function(rowIndex){
            var cell_y = this.getBattleRows();
            return (cell_y/2 - rowIndex)*this.cellHeight - this.cellHeight/2;
        }
    },
    data : null
};

