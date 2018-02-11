var CONSTANT = require("pubDefine");
var Scene = require("pubScene");
var Partner = require("pubPartner");
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
        for (var i = 0; i < Partner.partnerId.length; i++) {
            var actor = cc.instantiate(this.prefabActor);
            this.node.addChild(actor);
            var actorX = -200 + (Scene.actorselect.selectorWidth*i);
            actor.setPosition(actorX, -Scene.actorselect.selectorHeight/2);
            actor._id = Partner.partnerId[i];
            actor.on(cc.Node.EventType.TOUCH_END, this.addSelectedActor, this);
            var spriteFrame = new cc.SpriteFrame();
            var urlPath = CONSTANT.PIC_URL.partnerDir + actor._id + ".jpg";
            var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
            spriteFrame.setTexture(texture);
            spriteFrame._id = Partner.partnerId[i];
            actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            if((actorX + Scene.actorselect.selectorWidth/2) >= this.node.width){
                this.node.width += Scene.actorselect.selectorWidth;
            }
        }
    },

    initSelectedActorBackground:function(){
        var snum = Scene.actorselect.selectorNum;
        var nextscene = Scene[BattleData.scene];
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
            actor._id = "selected_" + i;
            var actorX = -200 + (100*i);
            actor.setPosition(actorX, 140);
            var spriteFrame = new cc.SpriteFrame();
            var texture = cc.textureCache.addImage(cc.url.raw(CONSTANT.PIC_URL.blankPic));
            spriteFrame.setTexture(texture);
            actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }
    },

    addSelectedActor:function(event){
        var scene = Scene[BattleData.scene];
        if(scene.forbidPartner && scene.forbidPartner.length && scene.forbidPartner.length>0){
            for(var i = 0; i < scene.forbidPartner.length; i++){
                if(scene.forbidPartner[i] == event.target._id){
                    Alert.show("成员禁止上场");
                    return;
                }
            }
        }
        if(BattleData.existPartner(event.target._id)){
            Alert.show("成员已上场");
            return;
        }
        var preSelected = cc.find("Canvas/actorChoose");
        var selected = preSelected.getChildren();
        for(var i = 0; i < selected.length; i++ ){
            var child = selected[i];
            if(child._id && child._id.indexOf("selected_") == 0){
                if(!child.getComponent(cc.Sprite).spriteFrame._id){
                    child.getComponent(cc.Sprite).spriteFrame = event.target.getComponent(cc.Sprite).spriteFrame;
                    var index = Number(child._id.split("_")[1]);
                    BattleData.addPartner(index, event.target._id);
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
        var texture = cc.textureCache.addImage(cc.url.raw(CONSTANT.PIC_URL.blankPic));
        spriteFrame.setTexture(texture);
        event.target.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        var index = Number(event.target._id.split("_")[1]);
        BattleData.removePartner(index);
    },

    clearSelectedActor:function(){
        if(BattleData.battlePartnerNum == 0){
            return;
        }
        var preSelected = cc.find("Canvas/actorChoose");
        var selected = preSelected.getChildren();
        for(var i = 0; i < selected.length; i++ ){
            var child = selected[i];
            if(child._id && child._id.indexOf("selected_")==0){
                if(!child.getComponent(cc.Sprite).spriteFrame._id){
                    continue;
                }else{
                    var spriteFrame = new cc.SpriteFrame();
                    var texture = cc.textureCache.addImage(cc.url.raw(CONSTANT.PIC_URL.blankPic));
                    spriteFrame.setTexture(texture);
                    child.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            }
        }
        BattleData.clearPartner();
    }

});
