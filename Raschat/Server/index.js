var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var server = http.createServer(app);
var { Server } = require("socket.io");
var io = new Server(server);

const port = 8080;
const hostname = 'localhost'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
    //socket.emit('message', 'Sei connesso amico!');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
  });
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });