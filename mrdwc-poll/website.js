var express = require("express"),
	app = express(),
	request = require('request');

var timeout;

function pollMrdwcCommandState() {
	var options = {
		url: "http://admin.mrdwc.com/state",
		method: 'GET',
		'auth': {
			'user': 'mrdwc',
			'pass': 'SUPERSECRETPASSWORDWASHERE',
			'sendImmediately': false
		}
	};

	request(options, function (error, response, body) {
		console.log("Polled", error);
		clearTimeout(timeout);
		timeout = setTimeout(pollMrdwcCommandState, 2000);
	});
}

pollMrdwcCommandState();

app.get('/', function (request, response) {
	pollMrdwcCommandState();
	response.send(200);
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Listening on " + port);
});