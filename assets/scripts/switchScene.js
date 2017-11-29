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
    },

    // use this for initialization
    onLoad: function () {

    },

    login:function(){
        var userid = this.indexLogin.username.string;
        var password = this.indexLogin.password.string;
        var message = this.indexLogin.message;
        var socket = io.connect("http://localhost:3000");
        socket.emit("userservice", {action:"login", userid : userid, pwd: password});
        socket.on("userservice", function(res){
            console.log(res);
            message.string = "欢迎 ： " + res.results[0].username;
            if(res.success == true){
                cc.director.loadScene("home");
            }
        });
    },

    logout:function(){
        this.indexLogin.message.string = "您已退出";
    },

    gohome:function(){
        cc.director.loadScene("home");
    },

    gomining:function(){
        cc.director.loadScene("mining");
    },

    nextfloor:function(scene){
        cc.director.loadScene(scene);
    },

    mission1:function(){
        cc.director.loadScene("mission1");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
