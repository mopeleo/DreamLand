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
            // BattleData.save();
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
        //col从左往右，row从上往下，从1开始，比如最左上角的格子坐标为row=0，col=0，最右下角的格子坐标为row=5，col=5
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
            var cellData = BattleData.cellList[randomRow][randomCol];
            if(!cellData){
                var cell = cc.instantiate(this.prefabActor);
                var px = CONSTANT.BATTLE_SCENE_PARAM.getPositionX(randomCol);
                var py = CONSTANT.BATTLE_SCENE_PARAM.getPositionY(randomRow);
                cell.setPosition(cc.p(px, py));

                var spriteFrame = new cc.SpriteFrame();
                var randomEnemyIndex = Math.floor((Math.random() * sceneParam.allowEnemy.length));
                var enemyId = sceneParam.allowEnemy[randomEnemyIndex];
                var urlPath = CONSTANT.PIC_URL.enemydir + enemyId + ".jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                cell.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cell.on(cc.Node.EventType.TOUCH_END, this.playerClick, this);

                var randomLevel = BattleData.getRandomLevel();
                var enemyData = ENEMY.createEnemy(enemyId, randomLevel);
                cell.getChildByName("spd").getComponent(cc.Label).string = enemyData.spd;
                cell.getChildByName("hp").getComponent(cc.Label).string = enemyData.hp;
                cell.getChildByName("atk").getComponent(cc.Label).string = enemyData.atk;
                cell._name = "CELL_" + randomRow + "_" + randomCol;   //以坐标作为每个单元格的名字

                cellData = {};
                cellData._type = CONSTANT.BATTLE_SCENE_PARAM.enemyType;
                cellData._act = false;
                cellData._id = enemyId;
                cellData._nodename = cell._name;
                cellData._celldata = enemyData;

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
                var cellRow = cell_y - 1;
                var px = CONSTANT.BATTLE_SCENE_PARAM.getPositionX(i);
                var py = CONSTANT.BATTLE_SCENE_PARAM.getPositionY(cellRow);
                actor.setPosition(cc.p(px, py));

                var spriteFrame = new cc.SpriteFrame();
                var urlPath = CONSTANT.PIC_URL.playerdir + playerActorId + ".jpg";
                var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                spriteFrame.setTexture(texture);
                actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;

                var actorData = null;
                if(BattleData.player[playerActorId]){
                    actorData = BattleData.player[playerActorId];
                }else{
                    actorData = ACTORS.createPlayer(playerActorId);
                    BattleData.player[playerActorId] = actorData;
                }
                actor.getChildByName("spd").getComponent(cc.Label).string = actorData.spd;
                actor.getChildByName("hp").getComponent(cc.Label).string = actorData.hp;
                actor.getChildByName("atk").getComponent(cc.Label).string = actorData.atk;
                actor._name = "CELL_" + cellRow + "_" + i;   //以坐标作为每个单元格的名字

                cellData = {};
                cellData._type = CONSTANT.BATTLE_SCENE_PARAM.playerType;
                cellData._act = false;
                cellData._id = playerActorId;
                cellData._nodename = actor._name;
                cellData._celldata = actorData;

                this.battleSprite.node.addChild(actor);         //添加到场景
                BattleData.playerList.push(cellData);
                BattleData.actorList.push(cellData);
                BattleData.cellList[cellRow][i] = cellData;
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
                    var px = CONSTANT.BATTLE_SCENE_PARAM.getPositionX(j);
                    var py = CONSTANT.BATTLE_SCENE_PARAM.getPositionY(i);
                    cell.setPosition(cc.p(px, py));

                    var spriteFrame = new cc.SpriteFrame();
                    if(cellData._type == CONSTANT.BATTLE_SCENE_PARAM.enemyType){
                        var enemyId = cellData._id;
                        var urlPath = CONSTANT.PIC_URL.enemydir + enemyId + ".jpg";
                        var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                        spriteFrame.setTexture(texture);
                        cell.on(cc.Node.EventType.TOUCH_END, this.playerClick, this);
                    }else{
                        var playerActorId = cellData._id;
                        var urlPath = CONSTANT.PIC_URL.playerdir + playerActorId + ".jpg";
                        var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                        spriteFrame.setTexture(texture);
                    }
                    cell.getComponent(cc.Sprite).spriteFrame = spriteFrame;

                    cell.getChildByName("spd").getComponent(cc.Label).string = cellData._celldata.spd;
                    cell.getChildByName("hp").getComponent(cc.Label).string = cellData._celldata.hp;
                    cell.getChildByName("atk").getComponent(cc.Label).string = cellData._celldata.atk;
                    cell._name = cellData._nodename;

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
        var damageCount = 0;   //累计伤害
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
                            if(leastHp == null){
                                break;
                            }
                        }
                        if(leastHp._celldata.hp - damageCount <= 0){
                            BattleData.enemyDie(leastHp);    //从角色数组中删除数据
                            this.unfinishNum--;              //因为从数组中删除了，计数时会少减，在这里补上-1
                            this.playerSelectEnemy = null;
                            damageCount = 0;                 //换目标后重新统计伤害
                            leastHp = this.getLeastHpActor(BattleData.enemyList);
                            if(leastHp == null){
                                break;
                            }
                        }
                        this.fight(actor, leastHp, (i-skipCnt));
                        damageCount = damageCount + actor._celldata.atk;
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
                // damageCount = damageCount + actor._celldata.atk;
            }
        }
    },

    fight:function(atkData, defData, seq){
        var atk= this.battleSprite.node.getChildByName(atkData._nodename);
        var def= this.battleSprite.node.getChildByName(defData._nodename);

        var blood = atkData._celldata.atk;
        var subHp = cc.callFunc(function(){
            def.getChildByName("subhp").getComponent(cc.Label).string = blood;
            var subObj = def.getChildByName("hp").getComponent(cc.Label);
            subObj.string = subObj.string - blood;
            defData._celldata.hp = subObj.string;
        }, this);
        var finished = cc.callFunc(function(){
            atkData._act = true;
            def.getChildByName("subhp").getComponent(cc.Label).string = "";
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
        }, this);
        var seq = cc.sequence(
            cc.delayTime(0.3*seq),
            cc.moveTo(0.3, def.x, def.y),
            subHp,
            cc.moveTo(0.3, atk.x, atk.y),
            finished);
        atk.runAction(seq);
    },

    playerClick:function(event){
        cc.log("this.unfinishNum ==== " + this.unfinishNum);
        if(this.unfinishNum > 0){
            return;
        }
        cc.log("event name : "  + event.target._name);
        this.playerSelectEnemy = BattleData.getDataByNodename(event.target._name);
        this.playerOpt = true;
        this.actionChain();
    },

    //按速度排序,spd大的排在前面
    speedCompare: function(objA, objB){
        var a = objA._celldata;
        var b = objB._celldata;
        if(a.spd > b.spd) {
            return -1;
        }else if(a.spd < b.spd) {
            return 1;
        }else {
            return 0;
        }
    },

    //按血量排序,hp小的排在前面
    hpCompare: function(objA, objB){
        var a = objA._celldata;
        var b = objB._celldata;
        if(a.hp > b.hp) {
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
});
