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

        indexLoadingBar:{
            default:null,
            type:cc.ProgressBar
        }
    },

    // use this for initialization
    onLoad: function () {
        var loading = function(){
            this.indexLoadingBar.progress += 0.1;
            if(this.indexLoadingBar.progress > 0.9){
                cc.director.loadScene("indexLogin");
            }
        }
        this.schedule(loading, 0.8);
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
