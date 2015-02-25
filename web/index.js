var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
function randomNumber() {
  return Math.floor(Math.random()*360)-180;
}

app.use(express.static(path.join(__dirname, 'master')));

app.get('/', function(req, res){
  res.sendfile('index.html');
});
io.on('connection', function(socket){
	console.log("a client Connected");
// 	socket.emit('test', 'If you see this message, then socket.io is working correctly');
  setInterval(function(){
    var loc={
      username:'Jonathan',
      latitude: randomNumber(),
      longitude: randomNumber()
    };
    socket.emit('test', loc);
  }, 3000);
    
  
  socket.on('loc', function(loc){
    console.log('location: ' + loc);
    socket.broadcast.emit('location', loc);
  });
  socket.on('disconnect', function(){
    console.log('a client disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});