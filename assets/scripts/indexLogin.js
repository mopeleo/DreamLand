cc.Class({
    extends: cc.Component,

    properties: {
        username: {
            default:null,
            type:cc.EditBox
        },

        password: {
            default:null,
            type:cc.EditBox
        },

        login: {
            default:null,
            type:cc.Button
        },

        logout: {
            default:null,
            type:cc.Button
        },

        message:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.login.getComponent("switchScene").indexLogin = this;
        this.logout.getComponent("switchScene").indexLogin = this;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
