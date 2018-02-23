var socket = io();

socket.on('connect', function() {
  // console.log('connected');
}); 

socket.on('disconnect', function() {
  // console.log('disconnected');
});

socket.on('newMessage', function(message) {
  // console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
}, function(feedback) {
  console.log(feedback);
});

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
}, function(feedback) {
  console.log(feedback);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(feedback) {
    console.log(feedback);
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }, function(feedback) {
      console.log(feedback);
    });
  }, function() {
    alert('Unable to fetch location');
  });
});