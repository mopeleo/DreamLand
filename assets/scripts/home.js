var BattleData = require("battleData");

cc.Class({
    extends: cc.Component,

    properties: {
        goonButton:{
            default:null,
            type:cc.Button
        }

    },

    start () {
        BattleData.load();
        if(BattleData.isArchive()){
            this.goonButton.node.on(
                cc.Node.EventType.TOUCH_END,
                function(){cc.director.loadScene(BattleData.scene);},
                this
            );
        }else{
            this.goonButton.node.active = false;
        }
    },

    // update (dt) {},
});
