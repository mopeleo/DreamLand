cc.Class({
    extends: cc.Component,

    properties: {
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

});
