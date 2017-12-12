var CONSTANT = require("CONSTANT/pubDefine");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        prefabActor:{
            default:null,
            type:cc.Prefab
        },

        battleSprite:{
            default:null,
            type:cc.Sprite
        },

        floorLabel:{
            default:null,
            type:cc.Label
        },

        nextButton:{
            default:null,
            type:cc.Button
        },

        actorList:[]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.floorLabel.string = "floor : " + CONSTANT.DATA_EXCHANGE.floor;
        this.nextButton.node.on("touchend", function(){
                CONSTANT.DATA_EXCHANGE.floor++;
                cc.director.loadScene(CONSTANT.DATA_EXCHANGE.goscene);
            }, this);
//        Alert.show(this.battleSprite.node);
                // var obj =  this.battleSprite.node;
                // for(var p in obj){
                //     cc.log("p == " + p + ", value == " + obj[p]);
                // }



        //初始化战斗场景
        this.actorList = new Array(CONSTANT.BATTLE_CELL_X);
        for(var i=0; i<CONSTANT.BATTLE_CELL_X; i++){
            this.actorList[i] = new Array(CONSTANT.BATTLE_CELL_Y);
        }

        // 初始化单元格
        for(var i = 0; i < CONSTANT.BATTLE_CELL_X; i++){
            for(var j = 0;j < CONSTANT.BATTLE_CELL_Y; j++){
                var actor = cc.instantiate(this.prefabActor);
                this.battleSprite.node.addChild(actor);
                actor.setPosition(cc.p((j-CONSTANT.BATTLE_CELL_X/2)*80+40, (CONSTANT.BATTLE_CELL_Y/2-i)*80-40));
                var spriteFrame = new cc.SpriteFrame();
                var urlPath = CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl;
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                actor.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;

                this.actorList[i][j]=actor;
                // cc.log(this.actorList);
            }
        }

        //初始化我方,row=6
        for(var i = 0; i < CONSTANT.DATA_EXCHANGE.battleActors.length ; i++){
            // this.actorList[5][i].getComponent(cc.Sprite).spriteFrame = this.aSpriteFrame;
            if(CONSTANT.DATA_EXCHANGE.battleActors[i] && CONSTANT.DATA_EXCHANGE.battleActors[i] != ''){
                var actor = this.getCell(5, i);
                actor.id = "self00" + (i+1);
                var spriteFrame = new cc.SpriteFrame();
                var urlPath = "resources/player/"+ CONSTANT.DATA_EXCHANGE.battleActors[i] +".jpg"
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        }

        //初始化敌方位置
        var count = 0;
        while(count < CONSTANT.DATA_EXCHANGE.battleEnemyNum){
            var randomRow = Math.floor((Math.random() * (CONSTANT.BATTLE_CELL_Y-2)));
            var randomCol = Math.floor((Math.random() * CONSTANT.BATTLE_CELL_X));
            var cell = this.getCell(randomRow, randomCol);
            if(cell.getComponent(cc.Sprite).spriteFrame.frameid == CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid){
                var spriteFrame = new cc.SpriteFrame();
                var urlPath = CONSTANT.PIC_URL.enemydir +"0001.jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                cell.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                count++;
            }
        }

        // for(var i = 0; i < CONSTANT.BATTLE_CELL_Y ; i++){
        //     if(CONSTANT.DATA_EXCHANGE.battleActors[i] && CONSTANT.DATA_EXCHANGE.battleActors[i] != ''){
        //         var actor = this.getCell(6, i+1);
        //         actor.id = "self00" + (i+1);
        //         var spriteFrame = new cc.SpriteFrame();
        //         var urlPath = "resources/player/"+ CONSTANT.DATA_EXCHANGE.battleActors[i] +".jpg"
        //         var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
        //         spriteFrame.setTexture(texture);
        //         actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        //     }
        // }

    },


    // update (dt) {},

    //col从左往右，row从上往下，从1开始，比如最左上角的格子坐标为row=0，col=0，最右下角的格子坐标为row=5，col=5
    //example : getCell(2,1)
    getCell: function(row,col){
        if(row >= CONSTANT.BATTLE_CELL_X){
            row = CONSTANT.BATTLE_CELL_X -1;
        }
        if(col >= CONSTANT.BATTLE_CELL_Y){
            col = CONSTANT.BATTLE_CELL_Y -1;
        }
        if(row < 0){
            row = 0;
        }
        if(col < 0){
            col = 0;
        }
        return this.actorList[row][col];
    }

});
