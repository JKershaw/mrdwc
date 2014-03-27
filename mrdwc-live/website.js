var express = require("express"),
	app = express(),
	path = require('path'),
	ROOT_DIRECTORY = __dirname,
	ASSETS_DIRECTORY = path.join(ROOT_DIRECTORY, 'public');

app.use(express.static(ASSETS_DIRECTORY));

app.get('/loaderio-[loderiocodehere]/', function (request, response) {
	response.send("loaderio-[loderiocodehere]");
});

var model = {
	groups: [{
		name: "Red",
		teams: [{
			name: "FIN",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "USA",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "WAL",
			played: 0,
			won: 0,
			dif: 0
		}]
	}, {
		name: "Orange",
		teams: [{
			name: "BEL",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "CAN",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "JPN",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "SCO",
			played: 0,
			won: 0,
			dif: 0
		}]
	}, {
		name: "Green",
		teams: [{
			name: "ARG",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "ENG",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "NED",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "SWE",
			played: 0,
			won: 0,
			dif: 0
		}]
	}, {
		name: "Blue",
		teams: [{
			name: "AUS",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "FRA",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "GER",
			played: 0,
			won: 0,
			dif: 0
		}, {
			name: "IRE",
			played: 0,
			won: 0,
			dif: 0
		}]
	}],
	rounds: [{
		bouts: [{
			number: 1,
			title: "Bout 1",
			a: "Blue 3",
			b: "Orange 4",
			details: "Saturday 10:00 (RDC)",
			top: 614,
			left: 231
		}, {
			number: 2,
			title: "Bout 2",
			a: "Orange 3",
			b: "Blue 4",
			details: "Saturday 10:30 (QSS)",
			top: 519,
			left: 231
		}, {
			number: 3,
			title: "Bout 3",
			a: "Red 3",
			b: "Green 4",
			details: "Saturday 12:00 (RDC)",
			top: 425,
			left: 231
		}, {
			number: 4,
			title: "Quarter-final (Bout 4)",
			a: "Blue 1",
			b: "Green 2",
			details: "Saturday 12:30 (QSS)",
			top: 296,
			left: 373
		}, {
			number: 5,
			title: "Quarter-final (Bout 5)",
			a: "Orange 1",
			b: "Red 2",
			details: "Saturday 14:00 (RDC)",
			top: 203,
			left: 373
		}, {
			number: 6,
			title: "Quarter-final (Bout 6)",
			a: "Green 1",
			b: "Blue 2",
			details: "Saturday 14:30 (QSS)",
			top: 109,
			left: 373
		}, {
			number: 7,
			title: "Quarter-final (Bout 7)",
			a: "Red 1",
			b: "Orange 2",
			details: "Saturday 16:00 (RDC)",
			top: 16,
			left: 373
		}]
	}, {
		bouts: [{
			number: 8,
			title: "Bout 8",
			a: "Loser 1",
			b: "Loser 2",
			details: "Saturday 16:30 (QSS)",
			top: 578,
			left: 523
		}, {
			number: 9,
			title: "Bout 9",
			a: "Winner 1",
			b: "Winner 2",
			details: "Saturday 18:00 (RDC)",
			top: 474,
			left: 523
		}, {
			number: 10,
			title: "Bout 10",
			a: "Winner 3",
			b: "Green 3",
			details: "Saturday 18:30 (QSS)",
			top: 371,
			left: 523
		}, {
			number: 11,
			title: "Bout 11",
			a: "Loser 6",
			b: "Loser 4",
			details: "Sunday 09:00 (RDC)",
			top: 310,
			left: 748
		}, {
			number: 12,
			title: "Bout 12",
			a: "Loser 7",
			b: "Loser 5",
			details: "Sunday 09:30 (QSS)",
			top: 212,
			left: 748
		}, {
			number: 13,
			title: "Semi-final (Bout 13)",
			a: "Winner 6",
			b: "Winner 4",
			details: "Sunday 11:00 (RDC)",
			top: 115,
			left: 748
		}, {
			number: 14,
			title: "Semi-final (Bout 14)",
			a: "Winner 7",
			b: "Winner 5",
			details: "Sunday 11:30 (QSS)",
			top: 18,
			left: 748
		}]
	}, {
		bouts: [{
			number: 19,
			title: "CUP (Bout 19)",
			a: "Winner 13",
			b: "Winner 14",
			details: "NEW TIME Sunday 17:00 (RDC)",
			top: 62,
			left: 972
		}, {
			number: 17,
			title: "3rd Place (Bout 17)",
			a: "Loser 13",
			b: "Loser 14",
			details: "Sunday 15:30 (QSS)",
			top: 207,
			left: 975
		}, {
			number: 18,
			title: "Plate (Bout 18)",
			a: "Winner 11",
			b: "Winner 12",
			details: "NEW TIME Sunday 15:00 (RDC)",
			top: 340,
			left: 972
		}, {
			number: 16,
			title: "Bowl (Bout 16)",
			a: "Winner 9",
			b: "Winner 10",
			details: "NEW TIME Sunday 13:30 (QSS)",
			top: 471,
			left: 972
		}, {
			number: 15,
			title: "Jug (Bout 15)",
			a: "Winner 8",
			b: "Loser 3",
			details: "Sunday 13:00 (RDC)",
			top: 616,
			left: 970
		}]
	}]
};

app.get('/overlay/table', function (request, response) {
	response.render("overlay_table.ejs", model);
});

app.get('/overlay/knockout', function (request, response) {
	response.render("overlay_knockout.ejs", model);
});

app.get('/knockout', function (request, response) {
	response.render("overlay_public_knockout.ejs", model);
});

app.get('/', function (request, response) {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.render("index.ejs", model);
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Listening on " + port);
});