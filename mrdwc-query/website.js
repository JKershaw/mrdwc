var express = require("express"),
	app = express();

app.use(express.bodyParser());

app.use(function (req, res, next) {
	var oneof = false;
	if (req.headers.origin) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		oneof = true;
	}
	if (req.headers['access-control-request-method']) {
		res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
		oneof = true;
	}
	if (req.headers['access-control-request-headers']) {
		res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
		oneof = true;
	}
	if (oneof) {
		res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
	}
	if (oneof && req.method == 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
});

app.get('/', function (request, response) {
	response.send(200);
});

app.get('/loaderio-[loaderApiCode]/', function (request, response) {
	response.send("loaderio-[loaderApiCode]");
});

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_CONNECTION_STRING, ["state"]);

var fakeState = {
	"_id": "state",
	"tracks": {
		"rdc": {
			"title": "USA vs England",
			"a": {
				"name": "USA",
				"score": 260
			},
			"b": {
				"name": "England",
				"score": 71
			},
			"period": "-",
			"jam": "-",
			"time": "-",
			"period_time": "-"
		},
		"qss": {
			"title": "Canada vs France",
			"a": {
				"name": "Canada",
				"score": "196"
			},
			"b": {
				"name": "France",
				"score": "111"
			},
			"period": "-",
			"jam": "-",
			"time": "-",
			"period_time": "-"
		}
	},
	"config": {
		"refreshWaitTime": "60000",
		"qss_alt_lang": "Alternate",
		"rdc_alt_lang": "Alternate"
	},
	"score": {
		"groups": [{
			"name": "Red",
			"teams": [{
				"name": "USA",
				"played": "2",
				"won": "2",
				"dif": "518"
			}, {
				"name": "FIN",
				"played": "2",
				"won": "0",
				"dif": "-386"
			}, {
				"name": "WAL",
				"played": "2",
				"won": "1",
				"dif": "-132"
			}]
		}, {
			"name": "Orange",
			"teams": [{
				"name": "BEL",
				"played": "3",
				"won": "1",
				"dif": "-98"
			}, {
				"name": "CAN",
				"played": "3",
				"won": "3",
				"dif": "775"
			}, {
				"name": "SCO",
				"played": "3",
				"won": "2",
				"dif": "-12"
			}, {
				"name": "JPN",
				"played": "3",
				"won": "0",
				"dif": "-665"
			}]
		}, {
			"name": "Green",
			"teams": [{
				"name": "ARG",
				"played": "3",
				"won": "2",
				"dif": "80"
			}, {
				"name": "ENG",
				"played": "3",
				"won": "3",
				"dif": "704"
			}, {
				"name": "SWE",
				"played": "3",
				"won": "0",
				"dif": "-509"
			}, {
				"name": "NED",
				"played": "3",
				"won": "1",
				"dif": "-364"
			}]
		}, {
			"name": "Blue",
			"teams": [{
				"name": "FRA",
				"played": "3",
				"won": "3",
				"dif": "412"
			}, {
				"name": "IRE",
				"played": "3",
				"won": "1",
				"dif": "-121"
			}, {
				"name": "GER",
				"played": "3",
				"won": "0",
				"dif": "-497"
			}, {
				"name": "AUS",
				"played": "3",
				"won": "2",
				"dif": "206"
			}]
		}],
		"rounds": [{
			"bouts": [{
				"number": 1,
				"title": "Bout 1",
				"a": "<strong>IRE 416</strong>",
				"b": "JPN 85",
				"details": "Saturday 10:00 (RDC)"
			}, {
				"number": 2,
				"title": "Bout 2",
				"a": "BEL 163",
				"b": "<strong>GER 213</strong>",
				"details": "Saturday 10:30 (QSS)"
			}, {
				"number": 3,
				"title": "Bout 3",
				"a": "<strong>FIN 316</strong>",
				"b": "SWE 135",
				"details": "Saturday 12:00 (RDC)"
			}, {
				"number": 4,
				"title": "Quarter-final (Bout 4)",
				"a": "<strong>FRA 310</strong>",
				"b": "ARG 102",
				"details": "Saturday 12:30 (QSS)"
			}, {
				"number": 5,
				"title": "Quarter-final (Bout 5)",
				"a": "<strong>CAN 281</strong>",
				"b": "WAL 46",
				"details": "Saturday 14:00 (RDC)"
			}, {
				"number": 6,
				"title": "Quarter-final (Bout 6)",
				"a": "<strong>ENG 388</strong>",
				"b": "AUS 138",
				"details": "Saturday 14:30 (QSS)"
			}, {
				"number": 7,
				"title": "Quarter-final (Bout 7)",
				"a": "<strong>USA 557</strong>",
				"b": "SCO 40",
				"details": "Saturday 16:00 (RDC)"
			}]
		}, {
			"bouts": [{
				"number": 8,
				"title": "Bout 8",
				"a": "JPN 132",
				"b": "<strong>BEL 297</strong>",
				"details": "Saturday 16:30 (QSS)"
			}, {
				"number": 9,
				"title": "Bout 9",
				"a": "<strong>IRE 216</strong>",
				"b": "GER 74",
				"details": "Saturday 18:00 (RDC)"
			}, {
				"number": 10,
				"title": "Bout 10",
				"a": "<strong>FIN 303</strong>",
				"b": "NED 85",
				"details": "Saturday 18:30 (QSS)"
			}, {
				"number": 11,
				"title": "Bout 11",
				"a": "<strong>AUS 252</strong>",
				"b": "ARG 238",
				"details": "Sunday 09:00 (RDC)"
			}, {
				"number": 12,
				"title": "Bout 12",
				"a": "<strong>WAL 245</strong>",
				"b": "SCO 123",
				"details": "Sunday 09:30 (QSS)"
			}, {
				"number": 13,
				"title": "Semi-final (Bout 13)",
				"a": "FRA 114",
				"b": "<strong>ENG 227</strong>",
				"details": "Sunday 11:00 (RDC)"
			}, {
				"number": 14,
				"title": "Semi-final (Bout 14)",
				"a": "CAN 127",
				"b": "<strong>USA 307</strong>",
				"details": "Sunday 11:30 (QSS)"
			}]
		}, {
			"bouts": [{
				"number": 19,
				"title": "CUP (Bout 19)",
				"a": "<strong>USA 260</strong>",
				"b": "ENG 71",
				"details": "<strong>[NEW TIME]</strong> Sunday 17:00 (RDC)"
			}, {
				"number": 17,
				"title": "3rd Place (Bout 17)",
				"a": "FRA 111",
				"b": "<strong>CAN 196</strong>",
				"details": "Sunday 15:30 (QSS)"
			}, {
				"number": 18,
				"title": "Plate (Bout 18)",
				"a": "<strong>AUS 201</strong>",
				"b": "WAL 200",
				"details": "<strong>[NEW TIME]</strong> Sunday 15:00 (RDC)"
			}, {
				"number": 16,
				"title": "Bowl (Bout 16)",
				"a": "IRE 163",
				"b": "<strong>FIN 232</strong>",
				"details": "<strong>[NEW TIME]</strong> Sunday 13:30 (QSS)"
			}, {
				"number": 15,
				"title": "Jug (Bout 15)",
				"a": "<strong>BEL 240</strong>",
				"b": "SWE 126",
				"details": "Sunday 13:00 (RDC)"
			}]
		}]
	}
};

app.get('/state', function (request, response) {
	response.contentType('json');
	response.send(fakeState);
});

// app.get('/state', function (request, response) {

// 	response.contentType('json');

// 	db.state.findOne({
// 		_id: "state"
// 	}, function (err, state) {
// 		response.send(state);
// 	});

// });

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Listening on " + port);
});