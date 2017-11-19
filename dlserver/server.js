var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
//app.use(express.static(__dirname + "/public"));

//service
var UserService = require("services/userService");

server.listen(3000, function(){
	console.log("listening on : 3000");
});

io.on("connection", function(socket){
	console.log("connection event");
	socket.emit("connected", "already connect");

	socket.on("login", function(req){
		console.log("login event : ");
		console.log(req);
		var self = this;
		UserService.login(req, function(user){
			console.log("result : ");
			console.log(user);
			self.emit("login", user.username);
		});
		// this.emit("login", "already login");
	});
});
