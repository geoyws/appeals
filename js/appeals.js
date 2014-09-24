// Appeals by George Yong @geoyws
// MIT License
// 24th September 2014

// Configs
var serverURL = "https://geoyws.com/api/appeals";

// Inits
app.ready(function () {
    app.cnvs.listen.send();
});

// Library
var app = {
    cnvs: { // cnvs is short for conversations
	populate: function () {
	    var data;
	    var cnvs = (function () {
		// get conversations via AJAX
		var httpRequest;
		if (window.XMLHttpRequest) {
		    httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
		    httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
		} else {
		    alert('Your device doesn\'t support AJAX. Please upgrade your device OS.');
		}
		httpRequest.onreadystatechange = function () {
		    if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
			    // do success callback, like check to see if the latest conversations match the current conversations that are appended with push. We will always only fetch the recent 50 messages.
			    if (!(localStorage.cnvs == httpRequest.responseText)) {
				// then replace the conversations with httpRequest.responseText data
				// UNFINISHED
				/* httpRequest.responseText = {
				    
				}
				*/
			    }
			} else {
			    alert('Something went wrong. We were unable to retrieve your conversations from our servers.');
			}
		    }
		};
		httpRequest.open('GET', 'http://geoyws.com/api/appeals/conversations', true);
		httpRequest.send();	
	    })();
	    (function updateCnvs () {
		
	    })();
	},
	listen: {
	    send: function () { // attach a listener to listen for message sending in conversations
		var sendmsg = function (event) {
		    event.preventDefault();
		    var id = event.target.id;
		    var timestamp = new Date().getTime();
		    var geolocationData; // location, remember to utilize the geolocation plugin for PhoneGap
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
		};
		if (!window.addEventListener) {
		    document.getElementById('conversations').attachEvent('submit', sendmsg);
		} else {
		    document.getElementById('conversations').addEventListener('submit', sendmsg);
		}
	    }
	}
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
    nav: function (destination, animation) {
	// this will be the main way the app navigates between 'pages' via AJAX
	//window.location.href = destination;
    },
    popup: function () {}
};


