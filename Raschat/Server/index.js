var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var server = http.createServer(app);
var { Server } = require("socket.io");
var io = new Server(server);

const port = 8080;
const hostname = 'localhost';
const users = {};

app.use(express.static(__dirname + '/static'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'))
});


io.on('connection', (socket) => {
  //socket.emit('message', 'Sei connesso amico!');
  socket.on('login', function(data){
    const sessionID = socket.id;
    console.log('a user ' + sessionID + ' connected');
    users[socket.id] = sessionID;
  });
  socket.on('disconnect', function(){
    console.log('user ' + users[socket.id] + ' disconnected');
    delete users[socket.id];
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('number', (login) =>{
    io.emit('number', login);
    console.log('numero' + login);
  });
});
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});