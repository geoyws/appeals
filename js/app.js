// Inits
app.init.ie8check();
app.ready(app.init.startup);

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
  init: {
    ie8check: function () {
      if (window.attachEvent && !window.addEventListener) {
        alert('Your browser is not supported. You might run into problems whilst using this app.'); 
      }
    },
    startup: function () {
      // list all startup functions here to run
    }
  },
  nav: function (destination, animation) {
    //window.location.href = destination;
  },
  ready: function (func) {
    document.onreadystatechange = function () {
      var state = document.readyState;
      if (state == 'interactive') {
        // do this
      } else if (state == 'complete') {
        // do this
        func();
      }
    }
  },
  popup: function () {}
};

