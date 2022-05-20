var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var server = http.createServer(app);
var { Server } = require("socket.io");
var io = new Server(server);
//var List = require("collections/list");

'use strict';
class Utente {
  constructor(numero, socketId) {
      this.numero = numero;
      this.socketId = socketId;
  }
  GetSocketId() { return this.socketId; }
} 

const port = 8080;
const hostname = 'localhost';
//const users = {};

app.use(express.static(__dirname + '/static'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'))
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/login.html'))
});


io.on('connection', (socket) => {
  //socket.emit('message', 'Sei connesso amico!');
  //var list = new List();
  //list.push(new Utente(1, socket.id));
  let Log = new Utente(1, socket.id);
  socket.on('login', function (data) {    
    console.log('a user ' + Log.GetSocketId() + ' connected');
    //users[socket.id] = socket.id;
  });
  socket.on('disconnect', function () {
    console.log('user ' + Log.GetSocketId() + ' disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('login_register', (data) => {
    const number = data.number
    /*db.query("SELECT * FROM users WHERE Username=?", [user], function(err, rows, fields){
    if(rows.length == 0){
    console.log("nothing here");
    }else{
    console.log("here");
    }
    });*/
    console.log(number);
    if(number == '1')
    {
      socket.emit('logged_in', number);  
    }  
    else
    {
      socket.emit("invalid");
    }
  });
});
//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


/*
come creare un eseguibile
npm install --save-dev electron-packager
npx electron-packager . goodwe
*/