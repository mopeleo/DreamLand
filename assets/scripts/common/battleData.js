//保存战场数据
module.exports = {
    dataType: 0,            //0 初始化数据，1 存档数据
    enemyType:0,            //敌方类型标识
    partnerType:1,          //我方类型标识
    scene: "",
    floor: 1,
    exp: 0,
    money: 0,
    partner: {},            //我方角色战斗场景临时数据，存档都保存或读取此数据

    battlePartnerNum:0,       //玩家上场角色个数
    battlePartnerIds:[],      //玩家上场的角色ID列表，个数与最大保持一致

    partnerList:[],         //玩家角色对象
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
        this.partnerList = [];
        this.enemyList = [];
        this.actorList = [];
        this.cellList = [];
    },
    save:function(){
        this.dataType = 1;
        cc.sys.localStorage.setItem("userdata", JSON.stringify(this));
        cc.log("======== save success =======");
    },
    load:function(){
        var datastring = cc.sys.localStorage.getItem("userdata");
        if(datastring && datastring != null){
            var userdata = JSON.parse(datastring);
            this.dataType = userdata.dataType;
            this.scene = userdata.scene;
            this.floor = userdata.floor;
            this.battlePartnerNum = userdata.battlePartnerNum;
            this.battlePartnerIds = userdata.battlePartnerIds;
            this.actorList = userdata.actorList;
            this.cellList = userdata.cellList;
            //重新建立引用关系
            this.partnerList = [];
            this.enemyList = [];
            for(var i = 0; i < this.actorList.length; i++){
                var d = this.actorList[i];
                if(d._type == this.partnerType){
                    this.partnerList.push(d);
                    this.partner[d._id] = d._celldata;
                }else{
                    this.enemyList.push(d);
                }
                var pos = d._nodename.split("_");
                var row = +pos[1];
                var col = +pos[2];
                this.cellList[row][col] = d;
            }
        }
    },
    clear:function(){
        this.initBattleData();
        this.floor = 1;
        this.scene = "";

        this.partner = {};
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
    initPartnerSelect:function(scenename, colNum){
        this.floor = 1;
        this.scene = scenename;
        this.battlePartnerNum = 0;
        this.battlePartnerIds = new Array(colNum);
        for(var i = 0; i < colNum; i++){
            this.battlePartnerIds[i] = "";
        }

        this.partner = {};
        this.enemy = {};
    },
    addPartner:function(index, val){
        if(index < 0 || index > this.battlePartnerIds.length){
            return;
        }
        this.battlePartnerNum++;
        this.battlePartnerIds[index] = val;
    },
    existPartner:function(actorid){
        if(this.battlePartnerNum == 0){
            return false;
        }
        for(var i = 0; i < this.battlePartnerIds.length; i++){
            if(this.battlePartnerIds[i] == actorid){
                return true;
            }
        }
        return false;
    },
    removePartner:function(index){
        if(index < 0 || index > this.battlePartnerIds.length){
            return;
        }
        this.battlePartnerNum--;
        this.battlePartnerIds[index] = "";
    },
    clearPartner:function(){
        this.battlePartnerNum = 0;
        for(var i = 0; i < this.battlePartnerIds.length; i++){
            this.battlePartnerIds[i] = "";
        }
    }

};
