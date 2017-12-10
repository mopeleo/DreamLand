var CONSTANT = require("common/pubDefine");

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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.floorLabel.string = "floor : " + CONSTANT.DATA_EXCHANGE.floor;
        this.nextButton.node.on("touchend", function(){
                CONSTANT.DATA_EXCHANGE.floor++;
                cc.director.loadScene(CONSTANT.DATA_EXCHANGE.goscene);
            }, this);
        // Alert.show(CONSTANT.DATA_EXCHANGE.battleActors[0]);
    },

    // update (dt) {},
});
