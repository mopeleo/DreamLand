var userData = require("userData");

var baseurl = "ws://127.0.0.1:8080/dlserver/websocket/";
var netEngine = new Object();

netEngine.send = function (service, data, callBack) {
    var websocketurl = baseurl + service;
    var ws = new WebSocket(websocketurl);
    ws.onopen = function (msg) {
        if(!data){
            data = {};
        }
        data.type = "send";
        data.clientId = userData.userId;
        var sendString = JSON.stringify(data);
        ws.send(sendString);
    };
    ws.onmessage = function(msg) {
        var res = JSON.parse(msg.data);
        if (res.retmsg) {
            if (callBack != null) {
                callBack(res);
            }
            ws.close();
        }
        else {
            cc.log('net:receive: ' + msg);
        }
    };
};

netEngine.register = function (service, data, callBack) {
    var websocketurl = baseurl + service;
    var ws = new WebSocket(websocketurl);
    if (this.registeredList == null) {
        this.registeredList = {};
    }
    this.registeredList[service] = ws;
    ws.onopen = function (msg) {
        if(!data){
            data = {};
        }
        data.type = "register";
        data.clientId = userData.userId;
        var sendString = JSON.stringify(sendData);
        ws.send(sendString);
    };
    ws.onmessage = function(msg) {
        var res = JSON.parse(msg.data);
        if (callBack != null) {
            callBack(res);
        }
    };
    ws.onclose = ()=>{
        this.registeredList[service] = null;
    };
};

netEngine.unRegister = function (service) {
    if (this.registeredList == null) return;
    if (this.registeredList[service] != null) {
        if (this.registeredList[service].readyState == WebSocket.OPEN)
            this.registeredList[service].close();
        this.registeredList[service] = null;
    }
}

netEngine.unRegisterAll = function () {
    if (this.registeredList == null) return;
    Object.keys(this.registeredList).forEach((service)=>{
        if (this.registeredList[service] != null) {
            if (this.registeredList[service].readyState == WebSocket.OPEN)
                this.registeredList[service].close();
            this.registeredList[service] = null;
        }
    });
}

module.exports = netEngine;
