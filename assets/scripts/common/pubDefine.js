module.exports = {
    SERVER_HOST           : "127.0.0.1:3000",
    BATTLE_FLOOR          : 1,
    BATTLE_CELL_X         : 6,
    BATTLE_CELL_Y         : 6,
    BATTLE_CELL_WIDTH     : 80,
    BATTLE_CELL_HEIGHT    : 80,
    ACTOR_NUM             : 18,
    INIT_ACTOR_SPRITEFRAME: {
                                "frameid": "0000",      //战场默认单元格spriteframe的ID
                                "rawurl":"resources/player/0000.jpg"    //战场默认单元格spriteframe的背景
                            },
    PIC_URL:                {
                                "enemydir" : "resources/enemy/",
                                "playerdir": "resources/player/"
                            },
    DATA_EXCHANGE         : {
                                "goscene" : "home", //默认场景名，主界面
                                "floor" : 1,        //战场楼层计数器
                                "battleEnemyNum"  :8,  //战场地方个数
                                "battleNumber" :0,  //我方上场人数个数
                                "battleActors" :["","","","","",""]     //我方上场具体角色
                            },
    data : null
};

