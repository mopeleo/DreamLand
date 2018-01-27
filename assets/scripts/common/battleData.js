//保存战场数据
module.exports = {
    dataType: 0,             //0 初始化数据，1 存档数据
    scene: "",
    floor: 0,
    exp: 0,
    money: 0,
    playerId: [],
    player: {},
    enemyId: [],
    enemy: {},

    playerList:[],          //玩家角色对象
    enemyList:[],           //敌方角色对象
    actorList:[],           //所有角色对象，玩家+敌方
    cellList:[],            //所有单元格对象，包括空格

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
        }
    },
    clear:function(){
        this.dataType = 0;
        cc.sys.localStorage.removeItem("userdata");
    }
};
