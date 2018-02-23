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

  var messageTextbox = jQuery('[name=message]');
  // var messageTextbox = jQuery('#message');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(feedback) {
    console.log(feedback);
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }, function(feedback) {
      console.log(feedback);
      locationButton.removeAttr('disabled').text('Send Location');
    });
  }, function() {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send Location');
  });
});