var CONSTANT = require("pubDefine");
var ACTORS = require("pubActors");
var ENEMY = require("pubEnemy");
var BattleData = require("battleData");

cc.Class({
    extends: cc.Component,

    properties: {
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

        // attacking:0,
        unfinish:0,             //未结束行动的角色个数
        playerOpt:false,        //玩家操作标志
        playerSelectEnemy:null, //玩家选中的敌方
        playerList:[],          //玩家角色对象
        enemyList:[],           //敌方角色对象
        actorList:[],           //所有角色对象，玩家+敌方
        cellList:[]             //所有单元格对象，包括空格
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.nextButton.node.on(
            cc.Node.EventType.TOUCH_END,
            function(){
                CONSTANT.BATTLE_SCENE_PARAM.floor++;
                cc.director.loadScene(CONSTANT.BATTLE_SCENE_PARAM.sceneName);
            },
            this
        );

        this.floorLabel.string = "floor : " + CONSTANT.BATTLE_SCENE_PARAM.floor;
        var sceneParam = CONSTANT.SCENES[CONSTANT.BATTLE_SCENE_PARAM.sceneName];

        //初始化战斗场景
        var cell_x = CONSTANT.BATTLE_SCENE_PARAM.getBattleCols();
        var cell_y = CONSTANT.BATTLE_SCENE_PARAM.getBattleRows();
        this.cellList = new Array(cell_x);
        for(var i = 0; i < cell_x; i++){
            this.cellList[i] = new Array(cell_y);
            for(var j = 0;j < cell_y; j++){
                this.cellList[i][j]=null;
            }
        }

        //初始化敌方位置
        var count = 0;
        var enemyNum = sceneParam.getEnemyNum();
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
                var randomEnemyIndex = Math.floor((Math.random() * sceneParam.allowEnemy.length));
                var enemyId = sceneParam.allowEnemy[randomEnemyIndex];
                var urlPath = CONSTANT.PIC_URL.enemydir + enemyId + ".jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                cell.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cell.on(cc.Node.EventType.TOUCH_END, this.playerClick, this);

                var enemyData = ENEMY[enemyId];
                cell.getChildByName("spd").getComponent(cc.Label).string = enemyData.spd;
                cell.getChildByName("hp").getComponent(cc.Label).string = enemyData.hp;
                cell.getChildByName("atk").getComponent(cc.Label).string = enemyData.atk;
                cell._type = CONSTANT.BATTLE_SCENE_PARAM.enemyType;
                cell._act = false;
                cell._id = enemyId;

                this.battleSprite.node.addChild(cell);          //添加到场景
                this.enemyList.push(cell);
                this.actorList.push(cell);
                this.cellList[randomRow][randomCol] = cell;
                count++;
            }
        }

        //初始化我方,row=5
        for(var i = 0; i < CONSTANT.BATTLE_SCENE_PARAM.playerActors.length; i++){
            var playerActorId = CONSTANT.BATTLE_SCENE_PARAM.playerActors[i];
            if(playerActorId && playerActorId != ''){
                var actor = cc.instantiate(this.prefabActor);
                var px = this.getPositionX(i);
                var py = this.getPositionY(cell_y - 1);
                actor.setPosition(cc.p(px, py));

                var spriteFrame = new cc.SpriteFrame();
                var urlPath = CONSTANT.PIC_URL.playerdir + playerActorId + ".jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;

                var actorData = ACTORS[playerActorId];
                actor.getChildByName("spd").getComponent(cc.Label).string = actorData.spd;
                actor.getChildByName("hp").getComponent(cc.Label).string = actorData.hp;
                actor.getChildByName("atk").getComponent(cc.Label).string = actorData.atk;
                actor._type = CONSTANT.BATTLE_SCENE_PARAM.playerType;
                actor._act = false;
                actor._id = playerActorId;

                this.battleSprite.node.addChild(actor);         //添加到场景
                this.playerList.push(actor);
                this.actorList.push(actor);
                this.cellList[cell_y - 1][i] = actor;
            }
        }

        this.actionChain();
    },

    actionChain:function(){
        //按速度排序所有的角色
        this.actorList.sort(this.speedCompare);
        var skipCnt = 0;        //actor行动时前面跳过的已行动过的actor个数
        var playerRound = 0;    //我方开始行动前有几个未动的
        for(var i = 0; i < this.actorList.length; i++){
            if(this.actorList[i]._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
                if(this.actorList[i]._act == false){
                    playerRound = i;
                    break;
                }
            }
        }
        if(this.playerOpt){
            for(var i = playerRound; i < this.actorList.length; i++){
                if(this.actorList[i]._act == false){
                    this.unfinish++;
                }
            }
        }else{
            for(var i = 0; i < playerRound; i++){
                if(this.actorList[i]._act == false){
                    this.unfinish++;
                }
            }
        }
        for(var i = 0; i < this.actorList.length; i++){
            var actor = this.actorList[i];
            if(actor._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
                if(actor._act == true){
                    skipCnt++;
                    continue;
                }else{
                    //玩家已经操作过，自动战斗，若没有操作过，跳出自动战斗
                    if(this.playerOpt == true){
                        var leastHp = this.playerSelectEnemy;
                        if(leastHp == null){
                            leastHp = this.getLeastHpActor(this.enemyList);
                        }
                        if(leastHp == null){
                            break;
                        }
                        this.fight(actor, leastHp, (i-skipCnt));
                    }else{
                        break;
                    }
                }
            }else if(actor._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
                if(actor._act == true){
                    skipCnt++;
                    continue;
                }

                var leastHp = this.getLeastHpActor(this.playerList);
                if(leastHp == null){
                    break;
                }
                this.fight(actor, leastHp, (i-skipCnt));
            }
        }
    },

    fight:function(atk, def, seq){
        /* 动态新增LABEL */
        var hpNode = new cc.Node("hpText");
        hpNode.x = 0;
        hpNode.y = 30;
        hpNode.color = cc.Color.RED;
        var label = hpNode.addComponent(cc.Label);
        label.fontSize = 20;
        label.string="";
        def.addChild(hpNode);
        /* 动态新增LABEL END*/

        var self = this;
        var actorData = this.getActorData(atk);
        var blood = actorData.atk;
        var subHp = cc.callFunc(function(obj, bld){
            hpNode.getComponent(cc.Label).string = bld;
        }, self, blood);
        var finished = cc.callFunc(function(){
            atk._act = true;
            hpNode.getComponent(cc.Label).string = "";
            if(this.unfinish > 0){
                this.unfinish--;
            }
            //判断最后一个行动完毕后开始循环
            var existNotAct = false;
            for(var j = 0; j < this.actorList.length; j++){
                if(this.actorList[j]._act == false){
                    existNotAct = true;
                    break;
                }
            }
            if(!existNotAct){
                this.playerOpt = false;
                for(var j = 0; j < this.actorList.length; j++){
                    this.actorList[j]._act = false;
                }
                this.actionChain(); //开始下一轮
            }
        }, self);
        var seq = cc.sequence(
            cc.delayTime(0.3*seq),
            cc.moveTo(0.3, def.x, def.y),
            subHp,
            cc.moveTo(0.3, atk.x, atk.y),
            finished);
        atk.runAction(seq);
    },

    playerClick:function(event){
        if(this.unfinish > 0){
            return;
        }
        // if(!this.playerOpt){
            this.playerSelectEnemy = event.target;
            this.playerOpt = true;
            this.actionChain();
        // }
    },

    // playerClick: function(event){
    //     if(this.attacking > 0){
    //         return;
    //     }
    //     if(this.playerList.length == 0){
    //         return;
    //     }
    //     this.playerSelectEnemy = event.target;
    //     var ex = event.target.x;
    //     var ey = event.target.y;
    //     /* 动态新增LABEL */
    //     var hpNode = new cc.Node("hpText");
    //     hpNode.x = ex;
    //     hpNode.y = ey + 30;
    //     hpNode.color = cc.Color.RED;
    //     var label = hpNode.addComponent(cc.Label);
    //     label.fontSize = 20;
    //     label.string="";
    //     this.node.addChild(hpNode);
    //     /* 动态新增LABEL END*/

    //     this.playerList.sort(this.speedCompare);
    //     for(var i=0; i < this.playerList.length; i++){
    //         this.attacking++;
    //         var player = this.playerList[i];
    //         var self = this;
    //         var actorData = ACTORS[player.id];
    //         var blood = actorData.atk;
    //         var fight = cc.callFunc(function(obj, bld){
    //             hpNode.getComponent(cc.Label).string = bld;
    //         }, self, blood);
    //         var finished = cc.callFunc(function(){
    //             self.attacking--;
    //             if(self.attacking == 0){
    //                 hpNode.getComponent(cc.Label).string = "";
    //             }
    //         }, self);
    //         var seq = cc.sequence(
    //             cc.delayTime(0.3*i),
    //             cc.moveTo(0.3, ex, ey),
    //             fight,
    //             cc.moveTo(0.3, player.x, player.y),
    //             finished);
    //         player.runAction(seq);
    //     }
    // },

    //按速度排序,spd大的排在前面
    speedCompare: function(objA, objB){
        var a = null;
        var b = null;
        if(objA._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
            a = ACTORS[objA._id];
        }else if(objA._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
            a = ENEMY[objA._id];
        }
        if(objB._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
            b = ACTORS[objB._id];
        }else if(objB._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
            b = ENEMY[objB._id];
        }
        if( a.spd > b.spd) {
            return -1;
        }else if(a.spd < b.spd) {
            return 1;
        }else {
            return 0;
        }
    },

    getActorData:function(obj){
        var a = null
        if(obj._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
            a = ACTORS[obj._id];
        }else if(obj._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
            a = ENEMY[obj._id];
        }
        return a;
    },

    //按血量排序,hp小的排在前面
    hpCompare: function(objA, objB){
        var a = null;
        var b = null;
        if(objA._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
            a = ACTORS[objA._id];
        }else if(objA._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
            a = ENEMY[objA._id];
        }
        if(objB._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
            b = ACTORS[objB._id];
        }else if(objB._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
            b = ENEMY[objB._id];
        }
        if( a.hp > b.hp) {
            return 1;
        }else if(a.hp < b.hp) {
            return -1;
        }else {
            return 0;
        }
    },

    getLeastHpActor:function(aList){
        if(aList == undefined || aList == null || !(aList instanceof Array)){
            return null;
        }
        aList.sort(this.hpCompare);
        return aList[0];
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
        return this.cellList[row][col];
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
