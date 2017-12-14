var CONSTANT = require("common/pubDefine");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
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
        for (var i = 1; i < (CONSTANT.ACTOR_NUM + 1); i++) {
            var actor = cc.instantiate(this.prefabActor);
            this.node.addChild(actor);
            var actorX = -280+(80*i);
            actor.setPosition(actorX, -40);
            actor.id = "000"+i;
            actor.on("touchend", this.addSelectedActor, this);
            var spriteFrame = new cc.SpriteFrame();
            var sno = i;
            if(sno > 4){
                sno = sno%4;
                if(sno == 0){
                    sno = 4;
                }
            }
            var urlPath = "resources/player/000"+ sno +".jpg"
            var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
            spriteFrame.setTexture(texture);
            actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            cc.log("content width = " + this.node.width + ", actor width = " +  (actorX+40));
            if((actorX+40) >= this.node.width){
                this.node.width += 80;
            }
        }
    },


    initSelectedActorBackground:function(){
        for (var i = 0; i < 6; i++) {
            var actor = cc.instantiate(this.prefabActor);
            this.node.addChild(actor);
            actor.id = "selected_" + i;
            var actorX = -320+(100*i);
            actor.setPosition(actorX, 140);
            var spriteFrame = new cc.SpriteFrame();
            var urlPath = CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl;
            var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
            spriteFrame.setTexture(texture);
            actor.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            actor.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;
         }
    },

    showActorInfo:function(event){
        // var preSelected = cc.find("Canvas/actorChoose");
        // var selected = preSelected.getChildren();
        // for(var i = 0; i < selected.length; i++ ){
        //     var child = selected[i];
        //     if(child.id && child.id.indexOf("selected_")==0){
        //         if(child.getComponent(cc.Sprite).spriteFrame._name == 'default_sprite'){
        //             child.getComponent(cc.Sprite).spriteFrame = event.target.getComponent(cc.Sprite).spriteFrame;
        //             break;
        //         }else{
        //             if(i == (selected.length -1) ){
        //                 Alert.show("队伍成员已满");
        //             }
        //             continue;
        //         }
        //     }
        // }
        // Alert.show(event.target.id);
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
                    CONSTANT.DATA_EXCHANGE.battleNumber++;
                    CONSTANT.DATA_EXCHANGE.battleActors[index] = event.target.id;
                    child.on("touchend", this.removeSelectedActor, this);
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
        var urlPath = CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl;
        var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
        spriteFrame.setTexture(texture);
        event.target.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        event.target.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;
        var index = Number(event.target.id.split("_")[1]);
        CONSTANT.DATA_EXCHANGE.battleNumber--;
        CONSTANT.DATA_EXCHANGE.battleActors[index] = "";
     },

    clearSelectedActor:function(){
        var preSelected = cc.find("Canvas/actorChoose");
        var selected = preSelected.getChildren();
        for(var i = 0; i < selected.length; i++ ){
            var child = selected[i];
            if(child.id && child.id.indexOf("selected_")==0){
                if(child.getComponent(cc.Sprite).spriteFrame.frameid == CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid){
                    continue;
                }else{
                    var spriteFrame = new cc.SpriteFrame();
                    var urlPath = CONSTANT.INIT_ACTOR_SPRITEFRAME.rawurl;
                    var texture = cc.textureCache.addImage(cc.url.raw(urlPath));
                    spriteFrame.setTexture(texture);
                    child.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    child.getComponent(cc.Sprite).spriteFrame.frameid = CONSTANT.INIT_ACTOR_SPRITEFRAME.frameid;
                }
            }
        }
        CONSTANT.DATA_EXCHANGE.battleActors = [];
    }

                // for(var p in obj){
                //     cc.log("p == " + p + ", value == " + obj[p]);
                // }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
