//保存战场数据
module.exports = {
    dataType: 0,             //0 初始化数据，1 存档数据
    scene: "",
    floor: 1,
    exp: 0,
    money: 0,
    playerId: [],
    player: {},
    enemyId: [],
    enemy: {},

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
        }
    },
    clear:function(){
        this.initBattleData();
        this.floor = 1;
        this.scene = "";
        cc.sys.localStorage.removeItem("userdata");
    },
    initActorChoose:function(scenename){
        this.floor = 1;
        this.scene = scenename;
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

};
