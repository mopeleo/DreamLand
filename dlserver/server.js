const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

server.listen(3000, function() {
    console.log('Listening on %d', server.address().port);
});

wss.on('connection', function(ws) {
    console.log("ws connected");

    ws.on('message', function(msg) {
        console.log('received: %s', msg);
        var receivedData = JSON.parse(msg);
        var identifier = receivedData.identifier;
        var type = receivedData.type;
        if (type == 'send') {
            var sendData = {identifier: "id", retmsg:"success",results:[{nickname:"leo", age:30}]};
            var sendString = JSON.stringify(sendData);
            if (ws.readyState == WebSocket.OPEN) {
                ws.send(sendString);
            }
        }
    });

    ws.on('close', (msg)=>{
        console.log('ws closed');
    });
});
