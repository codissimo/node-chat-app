var socket = io();

socket.on('connect', function() {
  console.log('connected');

  socket.emit('createMessage', {
    from: 'Takuya',
    body: 'text from Takuya'
  });
}); 

socket.on('disconnect', function() {
  console.log('disconnected');
});

socket.on('newMessage', function(message) {
  console.log('new message', message);
});