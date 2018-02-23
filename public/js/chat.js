var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
}); 

socket.on('disconnect', function() {
  // console.log('disconnected');
});

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    createdAt: `${moment.utc(message.createdAt).format('HH:mm:ss')}`,
    from: message.from,
    text: message.text
  });
  jQuery('#messages').append(html);
  scrollToBottom();

//   // console.log('newMessage', message);
//   var li = jQuery('<li></li>');
//   li.text(`${moment.utc(message.createdAt).format('HH:mm:ss')} - ${message.from}: ${message.text}`);
//   jQuery('#messages').append(li);
// }, function(feedback) {
//   console.log(feedback);
});

socket.on('newLocationMessage', function(message) {
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    createdAt: `${moment.utc(message.createdAt).format('HH:mm:ss')}`,
    from: message.from,
    url: message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom();
//   var li = jQuery('<li></li>');
//   var a = jQuery('<a target="_blank">My current location</a>');
//   li.text(`${moment.utc(message.createdAt).format('HH:mm:ss')} - ${message.from}: `);
//   a.attr('href', message.url);
//   li.append(a);
//   jQuery('#messages').append(li);
// }, function(feedback) {
//   console.log(feedback);
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