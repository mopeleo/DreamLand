var CONSTANT = require("pubDefine");
var ACTORS = require("pubActors");
var BattleData = require("battleData");

cc.Class({
    extends: cc.Component,

    properties: {
        prefabActor:{
            default:null,
            type:cc.Prefab
        },

        //容器类型, 0 backgroud, 1 selected scroll
        containType:''
    },

    // use this for initialization
    onLoad: function () {
        if(this.containType == 1){
            this.initAllActorScroll();
        }else if(this.containType == 2){
            this.initSelectedActorBackground();
        }else{}
    },

    initAllActorScroll:function(){
        for (var i = 0; i < ACTORS.actorId.length; i++) {
            var actor = cc.instantiate(this.prefabActor);
            this.node.addChild(actor);
            var actorX = -200 + (CONSTANT.CHOOSE_SCENE_PARAM.selectorWidth*i);
            actor.setPosition(actorX, -CONSTANT.CHOOSE_SCENE_PARAM.selectorHeight/2);
            actor.id = ACTORS.actorId[i];
            actor.on(cc.Node.EventType.TOUCH_END, this.addSelectedActor, this);
            var spriteFrame = new cc.SpriteFrame();
            var urlPath = CONSTANT.PIC_URL.playerdir + actor.id + ".jpg";
            var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
            spriteFrame.setTexture(texture);
            actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            if((actorX + CONSTANT.CHOOSE_SCENE_PARAM.selectorWidth/2) >= this.node.width){
                this.node.width += CONSTANT.CHOOSE_SCENE_PARAM.selectorWidth;
            }
        }
    },

    initSelectedActorBackground:function(){
        var snum = CONSTANT.CHOOSE_SCENE_PARAM.selectorNum;
        var nextscene = CONSTANT.SCENES[BattleData.scene];
        if(nextscene){
            if(nextscene.playerMaxNum){
                snum = nextscene.playerMaxNum;
            }
        }else{
            Alter.show(BattleData.scene + "场景不存在");
        }
        for (var i = 0; i < snum; i++) {
            var actor = cc.instantiate(this.prefabActor);
            this.node.addChild(actor);
            actor.id = "selected_" + i;
            var actorX = -200 + (100*i);
            actor.setPosition(actorX, 140);
            var spriteFrame = new cc.SpriteFrame();
            var texture = cc.textureCache.addImage(cc.url.raw(CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl));
            spriteFrame.setTexture(texture);
            actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            actor.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;
        }
    },

    showActorInfo:function(event){
    },

    addSelectedActor:function(event){
        var preSelected = cc.find("Canvas/actorChoose");
        var selected = preSelected.getChildren();
        for(var i = 0; i < selected.length; i++ ){
            var child = selected[i];
            if(child.id && child.id.indexOf("selected_")==0){
                if(child.getComponent(cc.Sprite).spriteFrame.frameid == CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid){
                    child.getComponent(cc.Sprite).spriteFrame = event.target.getComponent(cc.Sprite).spriteFrame;
                    var index = Number(child.id.split("_")[1]);
                    BattleData.addActor(index, event.target.id);
                    child.on(cc.Node.EventType.TOUCH_END, this.removeSelectedActor, this);
                    break;
                }else{
                    if(i == (selected.length -1) ){
                        Alert.show("队伍成员已满");
                    }
                    continue;
                }
            }
        }
    },

    removeSelectedActor:function(event){
        var spriteFrame = new cc.SpriteFrame();
        var texture = cc.textureCache.addImage(cc.url.raw(CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl));
        spriteFrame.setTexture(texture);
        event.target.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        event.target.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;
        var index = Number(event.target.id.split("_")[1]);
        BattleData.removeActor(index);
    },

    clearSelectedActor:function(){
        if(BattleData.playerActorNum == 0){
            return;
        }
        var preSelected = cc.find("Canvas/actorChoose");
        var selected = preSelected.getChildren();
        for(var i = 0; i < selected.length; i++ ){
            var child = selected[i];
            if(child.id && child.id.indexOf("selected_")==0){
                if(child.getComponent(cc.Sprite).spriteFrame.frameid == CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid){
                    continue;
                }else{
                    var spriteFrame = new cc.SpriteFrame();
                    var texture = cc.textureCache.addImage(cc.url.raw(CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl));
                    spriteFrame.setTexture(texture);
                    child.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    child.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;
                }
            }
        }
        BattleData.clearActor();
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
