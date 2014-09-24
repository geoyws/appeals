// Inits
app.ready(function () {
    app.check.ie8Check();
    app.cnvs.listen();
});

/*
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
*/

// Library
var app = {
    cnvs: { // cnvs is short for conversations
	listen: {
	    send: function () { // attach a listener to listen for message sending in conversations
		document.getElementById('conversations').addEventListener('submit', function (event) {
		    event.preventDefault();
		    var id = event.target.id;
		    var timestamp = new Date().getTime();
		    var loc; // location, remember to utilize the geolocation plugin for PhoneGap
		    var geolocationSuccess = function (position) { // Remember to add in "Do you want to enable location services for conversations?"
			geolocationData = {
			    'latitude': position.coords.latitude,
			    'longtitude': position.coords.longtitude,
			    'altitude': position.coords.altitude,
			    'accuracy': position.coords.accuracy,
			    'altitudeAccuracy': position.coords.altitudeAccuracy,
			    'heading': position.coords.heading,
			    'speed': position.coords.speed,
			    'timestamp': position.timestamp     
			};
		    };
		    var geolocationError = function (error) {
			alert(
			    'Geolocation Error Code:' + error.code + '\n' +
			    error.message
			);
		    };
		    var geolocationOptions = {
			maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
		    };
		    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);
		    var msg = document.querySelector(id + ' .active').value;
		    var data = {
			'conversationID': id,
			'timestamp': timestamp,
			'geolocationData': geolocationData, // location and geolocation are both reserved words
			'message': msg // plain text only, if we are to send media, we do it by other means
		    };
		    socket.emit('chatmsg', JSON.stringify(data));
		    msg = ''; // to clear the chat send box
		});
	    }
	}
    },
    check: {
    // checks to be done at startup
	ie8Check: function () {
	    if (window.attachEvent && !window.addEventListener) {
		alert('Your browser is not supported. You might run into problems whilst using this app.'); 
	    }
	}
    },
    nav: function (destination, animation) {
	// this will be the main way the app navigates between 'pages' via AJAX
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

