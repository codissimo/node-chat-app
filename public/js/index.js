var socket = io();

socket.on('connect', function() {
  console.log('connected');
}); 

socket.on('disconnect', function() {
  console.log('disconnected');
});

socket.on('createwMessage', function(message) {
  console.log('new message', message);
});