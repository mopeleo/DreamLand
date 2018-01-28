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

        unfinishNum: 0,          //未结束行动的角色个数
        playerOpt: false,        //玩家操作标志
        playerSelectEnemy: null, //玩家选中的敌方
    },

    start () {
        this.nextButton.node.on(
            cc.Node.EventType.TOUCH_END,
            function(){
                BattleData.floor++;
                BattleData.initBattleData();
                cc.director.loadScene(BattleData.scene);
            },
            this
        );

        this.floorLabel.string = "floor : " + BattleData.floor;
        if(BattleData.isArchive()){
            this.loadBattle();
        }else{
            this.newBattle();
        }
        this.actionChain();
    },

    //开始一场新的
    newBattle:function(){
        var sceneParam = CONSTANT.SCENES[BattleData.scene];
        //初始化战斗场景
        var cell_x = CONSTANT.BATTLE_SCENE_PARAM.getBattleCols();
        var cell_y = CONSTANT.BATTLE_SCENE_PARAM.getBattleRows();
        BattleData.cellList = new Array(cell_x);
        for(var i = 0; i < cell_x; i++){
            BattleData.cellList[i] = new Array(cell_y);
            for(var j = 0;j < cell_y; j++){
                BattleData.cellList[i][j] = null;
            }
        }

        //初始化敌方位置
        var count = 0;
        var enemyNum = sceneParam.getEnemyNum();
        while(count < enemyNum){
            var randomRow = Math.floor((Math.random() * (cell_y - 2)));  //最下方两行为分隔行与玩家行
            var randomCol = Math.floor((Math.random() * cell_x));
            var cellData = this.getCell(randomRow, randomCol);
            if(!cellData){
                var cell = cc.instantiate(this.prefabActor);
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
                cell.name = "CELL"+randomRow+""+randomCol;   //以坐标作为每个单元格的名字

                cellData = {};
                cellData._type = CONSTANT.BATTLE_SCENE_PARAM.enemyType;
                cellData._act = false;
                cellData._id = enemyId;
                cellData._cellname = cell.name;

                this.battleSprite.node.addChild(cell);          //添加到场景
                BattleData.enemyList.push(cellData);
                BattleData.actorList.push(cellData);
                BattleData.cellList[randomRow][randomCol] = cellData;
                count++;
            }
        }

        //初始化我方,row=5
        for(var i = 0; i < BattleData.playerActors.length; i++){
            var playerActorId = BattleData.playerActors[i];
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
                actor.name = "CELL5" + "" + i;   //以坐标作为每个单元格的名字

                cellData = {};
                cellData._type = CONSTANT.BATTLE_SCENE_PARAM.playerType;
                cellData._act = false;
                cellData._id = playerActorId;
                cellData._cellname = actor.name;

                this.battleSprite.node.addChild(actor);         //添加到场景
                BattleData.playerList.push(cellData);
                BattleData.actorList.push(cellData);
                BattleData.cellList[cell_y - 1][i] = cellData;
            }
        }
    },

    loadBattle:function(){
        for(var i = 0; i < BattleData.cellList.length; i++){
            var cols = BattleData.cellList[i];
            for(var j = 0;j < cols.length; j++){
                var cellData = BattleData.cellList[i][j];
                if(cellData && cellData != null){
                    var cell = cc.instantiate(this.prefabActor);
                    var px = this.getPositionX(j);
                    var py = this.getPositionY(i);
                    cell.setPosition(cc.p(px, py));

                    var spriteFrame = new cc.SpriteFrame();
                    var actorData = null;
                    if(cellData._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
                        var enemyId = cellData._id;
                        var urlPath = CONSTANT.PIC_URL.enemydir + enemyId + ".jpg";
                        var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                        spriteFrame.setTexture(texture);
                        cell.on(cc.Node.EventType.TOUCH_END, this.playerClick, this);
                        actorData = ENEMY[enemyId];
                    }else{
                        var playerActorId = cellData._id;
                        var urlPath = CONSTANT.PIC_URL.playerdir + playerActorId + ".jpg";
                        var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                        spriteFrame.setTexture(texture);
                        actorData = ACTORS[playerActorId];
                    }
                    cell.getComponent(cc.Sprite).spriteFrame = spriteFrame;

                    cell.getChildByName("spd").getComponent(cc.Label).string = actorData.spd;
                    cell.getChildByName("hp").getComponent(cc.Label).string = actorData.hp;
                    cell.getChildByName("atk").getComponent(cc.Label).string = actorData.atk;
                    cell.name = cellData._cellname;

                    this.battleSprite.node.addChild(cell);          //添加到场景
                }
            }
        }
    },

    actionChain:function(){
        //按速度排序所有的角色
        BattleData.actorList.sort(this.speedCompare);
        var skipCnt = 0;        //行动时前面跳过的已行动过的actor个数
        var playerRound = 0;    //我方始行动回合
        for(var i = 0; i < BattleData.actorList.length; i++){
            if(BattleData.actorList[i]._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
                if(BattleData.actorList[i]._act == false){
                    playerRound = i;
                    break;
                }
            }
        }
        if(this.playerOpt){
            for(var i = playerRound; i < BattleData.actorList.length; i++){
                if(BattleData.actorList[i]._act == false){
                    this.unfinishNum++;
                }
            }
        }else{
            for(var i = 0; i < playerRound; i++){
                if(BattleData.actorList[i]._act == false){
                    this.unfinishNum++;
                }
            }
        }
        for(var i = 0; i < BattleData.actorList.length; i++){
            var actor = BattleData.actorList[i];
            if(actor._type == CONSTANT.BATTLE_SCENE_PARAM.playerType){
                if(actor._act == true){
                    skipCnt++;
                    continue;
                }else{
                    //玩家已经操作过，自动战斗，若没有操作过，跳出自动战斗
                    if(this.playerOpt == true){
                        var leastHp = this.playerSelectEnemy;
                        if(leastHp == null){
                            leastHp = this.getLeastHpActor(BattleData.enemyList);
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

                var leastHp = this.getLeastHpActor(BattleData.playerList);
                if(leastHp == null){
                    break;
                }
                this.fight(actor, leastHp, (i-skipCnt));
            }
        }
    },

    fight:function(atkData, defData, seq){
        var atk= this.getNodeByCellName(atkData._cellname);
        var def= this.getNodeByCellName(defData._cellname);
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
        var actorData = this.getActorData(atkData);
        var blood = actorData.atk;
        var subHp = cc.callFunc(function(obj, bld){
            hpNode.getComponent(cc.Label).string = bld;
        }, self, blood);
        var finished = cc.callFunc(function(){
            atkData._act = true;
            hpNode.getComponent(cc.Label).string = "";
            if(this.unfinishNum > 0){
                this.unfinishNum--;
            }
            //判断最后一个行动完毕后开始循环
            var existNotAct = false;
            for(var j = 0; j < BattleData.actorList.length; j++){
                if(BattleData.actorList[j]._act == false){
                    existNotAct = true;
                    break;
                }
            }
            if(!existNotAct){
                this.playerOpt = false;
                for(var j = 0; j < BattleData.actorList.length; j++){
                    BattleData.actorList[j]._act = false;
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
        if(this.unfinishNum > 0){
            return;
        }
        cc.log("event name : "  + event.target.name);
        this.playerSelectEnemy = this.getDataByCellName(event.target.name);
        // this.playerSelectEnemy = event.target;
        this.playerOpt = true;
        this.actionChain();
    },

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

    getNodeByCellName:function(cellname){
        return this.battleSprite.node.getChildByName(cellname);
    },

    getDataByCellName:function(cellname){
        for(var i=0; i< BattleData.actorList.length; i++){
            var data = BattleData.actorList[i];
            if(data._cellname == cellname){
                return data;
            }
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
        return BattleData.cellList[row][col];
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
