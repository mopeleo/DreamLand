var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
//app.use(express.static(__dirname + "/public"));

server.listen(3000, function(){
	console.log("listening on : 3000");
});

io.on("connection", function(socket){
	console.log("a user connect");
	socket.emit("connected", "already connect");
});

