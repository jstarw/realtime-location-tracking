var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'master')));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
	console.log("a client Connected");
	socket.emit('message', 'If you see this message, then socket.io is working correctly');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('a client disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});