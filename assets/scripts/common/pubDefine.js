module.exports = {
    SERVER_HOST: "ws://127.0.0.1:8080/dlserver/websocket",
    SERVICES:{
        userservice: "userservice",    //用户服务名
        data:1
    },
    PIC_URL:{
        enemyDir  : "resources/enemy/",
        partnerDir: "resources/player/",
        itemDir   : "resources/item/",
        equipDir  : "resources/equip/",
        blankPic  : "resources/player/0000.jpg"      //空白图片
    },
    //战斗场景参数
    BATTLE_SCENE_PARAM:{
        bgWidth:480,        //战斗场景背景图片宽度
        bgHeight:480,       //战斗场景背景图片高度
        cellWidth:80,       //战斗场景单元格高度
        cellHeight:80,      //战斗场景单元格宽度
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

