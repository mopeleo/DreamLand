//保存战场数据
module.exports = {
    dataType: 0,             //0 初始化数据，1 存档数据
    scene: "",
    floor: 1,
    exp: 0,
    money: 0,
    player: {},

    playerActorNum:0,       //玩家上场角色个数
    playerActors:[],        //玩家上场的角色ID列表，个数与最大保持一致

    playerList:[],          //玩家角色对象
    enemyList:[],           //敌方角色对象
    actorList:[],           //所有角色对象，玩家+敌方
    cellList:[],            //所有单元格对象，包括空格

    //是否存档数据
    isArchive: function(){
        if(this.dataType && this.dataType == 1){
            return true;
        }
        return false;
    },
    initBattleData:function(){
        this.dataType = 0;
        this.playerList = [];
        this.enemyList = [];
        this.actorList = [];
        this.cellList = [];
    },
    save:function(){
        this.dataType = 1;
        cc.sys.localStorage.setItem("userdata", JSON.stringify(this));
    },
    load:function(){
        var datastring = cc.sys.localStorage.getItem("userdata");
        if(datastring && datastring != null){
            var userdata = JSON.parse(datastring);
            this.dataType = userdata.dataType;
            this.scene = userdata.scene;
            this.floor = userdata.floor;
            this.playerActorNum = userdata.playerActorNum;
            this.playerActors = userdata.playerActors;
            this.playerList = userdata.playerList;
            this.enemyList = userdata.enemyList;
            this.actorList = userdata.actorList;
            this.cellList = userdata.cellList;

            this.player = userdata.player;
        }
    },
    clear:function(){
        this.initBattleData();
        this.floor = 1;
        this.scene = "";

        this.player = {};
        cc.sys.localStorage.removeItem("userdata");
    },
    getDataByNodename:function(nodename){
        for(var i=0; i< this.actorList.length; i++){
            var data = this.actorList[i];
            if(data._nodename == nodename){
                return data;
            }
        }
    },
    getRandomLevel:function(){
        var randomLevel = 1;
        if(this.floor < 5){
            randomLevel = Math.floor(Math.random() * this.floor);
            if(randomLevel == 0){
                randomLevel = 1;
            }
        }else{
            randomLevel = Math.floor(this.floor - (Math.random() * 5));
        }
        return randomLevel;
    },
    enemyDie:function(enemy){
        var index = -1;
        for(var i = 0; i < this.enemyList.length; i++){
            if(this.enemyList[i]._nodename == enemy._nodename){
                index = i;
                break;
            }
        }
        if(index > -1){
            this.enemyList.splice(index, 1);
        }
        index = -1;
        for(var i = 0; i < this.actorList.length; i++){
            if(this.actorList[i]._nodename == enemy._nodename){
                index = i;
                break;
            }
        }
        if(index > -1){
            this.actorList.splice(index, 1);
        }
        var pos = enemy._nodename.split("_");
        var row = +pos[1];
        var col = +pos[2];
        this.cellList[row][col] = null;
    },
    // 角色选择相关
    initActorChoose:function(scenename, colNum){
        this.floor = 1;
        this.scene = scenename;
        this.playerActorNum = 0;
        this.playerActors = new Array(colNum);
        for(var i = 0; i < colNum; i++){
            this.playerActors[i] = "";
        }

        this.player = {};
        this.enemy = {};
    },
    addActor:function(index, val){
        if(index < 0 || index > this.playerActors.length){
            return;
        }
        this.playerActorNum++;
        this.playerActors[index] = val;
    },
    existActor:function(actorid){
        if(this.playerActorNum == 0){
            return false;
        }
        for(var i = 0; i < this.playerActors.length; i++){
            if(this.playerActors[i] == actorid){
                return true;
            }
        }
        return false;
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
        for(var i = 0; i < this.playerActors.length; i++){
            this.playerActors[i] = "";
        }
    }

};
