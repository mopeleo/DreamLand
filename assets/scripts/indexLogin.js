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
