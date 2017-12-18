var CONSTANT = require("pubDefine");
var ACTORS = require("pubActors");

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

        attacking:0,
        actorList:[],
        playerList:[],
        enemyList:[]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.floorLabel.string = "floor : " + CONSTANT.BATTLE_SCENE_PARAM.floor;
        this.nextButton.node.on(
            cc.Node.EventType.TOUCH_END,
            function(){
                CONSTANT.BATTLE_SCENE_PARAM.floor++;
                cc.director.loadScene(CONSTANT.BATTLE_SCENE_PARAM.sceneName);
            },
            this
        );


        //初始化战斗场景
        var cell_x = CONSTANT.BATTLE_SCENE_PARAM.getBattleCols();
        var cell_y = CONSTANT.BATTLE_SCENE_PARAM.getBattleRows();
        this.actorList = new Array(cell_x);
        for(var i = 0; i < cell_x; i++){
            this.actorList[i] = new Array(cell_y);
        }

        // 初始化单元格
        for(var i = 0; i < cell_x; i++){
            for(var j = 0;j < cell_y; j++){
                var actor = cc.instantiate(this.prefabActor);
                this.battleSprite.node.addChild(actor);
                var px = (j - cell_x/2)*CONSTANT.BATTLE_SCENE_PARAM.cellWidth + CONSTANT.BATTLE_SCENE_PARAM.cellWidth/2;
                var py = (cell_y/2-i)*CONSTANT.BATTLE_SCENE_PARAM.cellHeight - CONSTANT.BATTLE_SCENE_PARAM.cellHeight/2;
                actor.setPosition(cc.p(px, py));
                var spriteFrame = new cc.SpriteFrame();
                var texture = cc.textureCache.addImage(cc.url.raw(CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl));
                spriteFrame.setTexture(texture);
                actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                actor.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;

                this.actorList[i][j]=actor;
            }
        }

        //初始化我方,row=5
        for(var i = 0; i < CONSTANT.BATTLE_SCENE_PARAM.playerActors.length ; i++){
            var playerActorId = CONSTANT.BATTLE_SCENE_PARAM.playerActors[i];
            if(playerActorId && playerActorId != ''){
                var actor = this.getCell(cell_y - 1, i);
                actor.id = playerActorId;
                var spriteFrame = new cc.SpriteFrame();
                var urlPath = CONSTANT.PIC_URL.playerdir + playerActorId + ".jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;

                var actorData = ACTORS[playerActorId];
                actor.getChildByName("spd").getComponent(cc.Label).string = actorData.spd;
                actor.getChildByName("hp").getComponent(cc.Label).string = actorData.hp;
                actor.getChildByName("atk").getComponent(cc.Label).string = actorData.atk;

                this.playerList.push(actor);
            }
        }

        //初始化敌方位置
        var count = 0;
        var enemyNum = CONSTANT.BATTLE_SCENE_PARAM.getEnemyNum();
        while(count < enemyNum){
            var randomRow = Math.floor((Math.random() * (cell_y - 2)));  //最下方两行为分隔行与玩家行
            var randomCol = Math.floor((Math.random() * cell_x));
            var cell = this.getCell(randomRow, randomCol);
            if(cell.getComponent(cc.Sprite).spriteFrame.frameid == CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid){
                var spriteFrame = new cc.SpriteFrame();
                var urlPath = CONSTANT.PIC_URL.enemydir + "0001" + ".jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                cell.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cell.on(cc.Node.EventType.TOUCH_END, this.attack, this);
                this.enemyList.push(cell);
                count++;
            }
        }

    },

    attack: function(event){
        if(this.attacking > 0){
            return;
        }
        if(this.playerList.length == 0){
            return;
        }
        var ex = event.target.x;
        var ey = event.target.y;
        this.playerList.sort(this.speedCompare);
        for(var i=0; i < this.playerList.length; i++){
            this.attacking++;
            var player = this.playerList[i];
            var ox = player.x;
            var oy = player.y;
            var self = this;
            var finished = cc.callFunc(function(){self.attacking--;}, self);
            var seq = cc.sequence(cc.delayTime(0.3*i), cc.moveTo(0.3, ex, ey), cc.moveTo(0.3, ox, oy), finished);
            player.runAction(seq);
        }
    },

    //按速度排序
    speedCompare: function(objA, objB){
        var a = ACTORS[objA.id];
        var b = ACTORS[objB.id];
        if( a.spd > b.spd) {
            return -1;
        }else if(a.spd < b.spd) {
            return 1;
        }else {
            return 0;
        }
    },
    // update (dt) {},

    //col从左往右，row从上往下，从1开始，比如最左上角的格子坐标为row=0，col=0，最右下角的格子坐标为row=5，col=5
    //example : getCell(2,1)
    getCell: function(row,col){
        if(row >= CONSTANT.BATTLE_SCENE_PARAM.getBattleCols()){
            row = CONSTANT.BATTLE_SCENE_PARAM.getBattleCols() -1;
        }
        if(col >= CONSTANT.BATTLE_SCENE_PARAM.getBattleRows()){
            col = CONSTANT.BATTLE_SCENE_PARAM.getBattleRows() -1;
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
