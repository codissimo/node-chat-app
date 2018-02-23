const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  // console.log('a new user signed in');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));  // emits to everyone
    // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));  // emits to everyone except the user
    callback('Message delivered');
  });

  socket.on('createLocationMessage', (coods, callback) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coods.lat, coods.lng));
    // callback('LocationMessage delivered');
  });

  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});