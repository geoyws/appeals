// Inits
$(function() {
  var socket = io();
  document.getElementById('#m').focus();
  
  $('form').submit(function(event) {
    event.preventDefault();
    socket.emit('chatmsg', $('#m').val());
    $('#m').val('').focus();
  });
  socket.on('chatmsg', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });
});

// Library
var app = {
  init: {},
  nav: function(destination, animation) {},
  popup: function() {},
};

