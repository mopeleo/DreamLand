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
        // cc.director.getCollisionManager().enabled = true;  // 开启碰撞检测系统

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
            for(var j = 0;j < cell_y; j++){
                this.actorList[i][j]=null;
            }
        }

        //初始化敌方位置
        var count = 0;
        var enemyNum = CONSTANT.BATTLE_SCENE_PARAM.getEnemyNum();
        while(count < enemyNum){
            var randomRow = Math.floor((Math.random() * (cell_y - 2)));  //最下方两行为分隔行与玩家行
            var randomCol = Math.floor((Math.random() * cell_x));
            var cell = this.getCell(randomRow, randomCol);
            if(!cell){
                cell = cc.instantiate(this.prefabActor);
                var px = this.getPositionX(randomCol);
                var py = this.getPositionY(randomRow);
                cell.setPosition(cc.p(px, py));

                var spriteFrame = new cc.SpriteFrame();
                var urlPath = CONSTANT.PIC_URL.enemydir + "0001" + ".jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                cell.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cell.on(cc.Node.EventType.TOUCH_END, this.attack, this);

                this.battleSprite.node.addChild(cell);          //添加到场景
                this.enemyList.push(cell);
                this.actorList[randomRow][randomCol] = cell;
                count++;
            }
        }

        //初始化我方,row=5
        for(var i = 0; i < CONSTANT.BATTLE_SCENE_PARAM.playerActors.length ; i++){
            var playerActorId = CONSTANT.BATTLE_SCENE_PARAM.playerActors[i];
            if(playerActorId && playerActorId != ''){
                // var actor = this.getCell(cell_y - 1, i);
                var actor = cc.instantiate(this.prefabActor);
                var px = this.getPositionX(i);
                var py = this.getPositionY(cell_y - 1);
                actor.setPosition(cc.p(px, py));

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

                this.battleSprite.node.addChild(actor);         //添加到场景
                this.playerList.push(actor);
                this.actorList[cell_y - 1][i] = actor;
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
        /* 动态新增LABEL */
        var hpNode = new cc.Node("hpText");
        hpNode.x = ex;
        hpNode.y = ey + 30;
        hpNode.color = new cc.Color(226, 2, 69);
        var label = hpNode.addComponent(cc.Label);
        label.fontSize = 20;
        label.string="";
        this.node.addChild(hpNode);
        /* 动态新增LABEL END*/

        this.playerList.sort(this.speedCompare);
        for(var i=0; i < this.playerList.length; i++){
            this.attacking++;
            var player = this.playerList[i];
            var self = this;
            var actorData = ACTORS[player.id];
            var blood = actorData.atk;
            var fight = cc.callFunc(function(obj, bld){
                hpNode.getComponent(cc.Label).string = bld;
            }, self, blood);
            var finished = cc.callFunc(function(){
                self.attacking--;
                if(self.attacking == 0){
                    hpNode.getComponent(cc.Label).string = "";
                }
            }, self);
            var seq = cc.sequence(
                cc.delayTime(0.3*i),
                cc.moveTo(0.3, ex, ey),
                fight,
                cc.moveTo(0.3, player.x, player.y),
                finished);
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
    },

    getPositionX:function(colIndex){
        var cell_x = CONSTANT.BATTLE_SCENE_PARAM.getBattleCols();
        return (colIndex - cell_x/2)*CONSTANT.BATTLE_SCENE_PARAM.cellWidth + CONSTANT.BATTLE_SCENE_PARAM.cellWidth/2;
    },

    getPositionY:function(rowIndex){
        var cell_y = CONSTANT.BATTLE_SCENE_PARAM.getBattleRows();
        return (cell_y/2 - rowIndex)*CONSTANT.BATTLE_SCENE_PARAM.cellHeight - CONSTANT.BATTLE_SCENE_PARAM.cellHeight/2;
    }

});
