var express = require("express"),
	app = express(),
	IndexViewModelFactory = require('./lib/IndexViewModelFactory'),
	StateBuilder = require('./lib/StateBuilder');

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

app.use(express.basicAuth("mrdwc", process.env.SECRET_PASSWORD));

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config", "livetable", "livebracket", "state"]);

app.get('/state', function (request, response) {
	response.contentType('json');
	var stateBuilder = new StateBuilder();
	stateBuilder.build(function (state) {
		db['state'].save(state, function () {

			var config = {
				_id: "state_generated_timestamp",
				value: new Date().getTime()
			};

			db['admin-config'].save(config, function () {
				response.send(state);
			});

		});
	});
});


app.get('/', function (request, response) {
	var indexViewModelFactory = new IndexViewModelFactory();
	indexViewModelFactory.build(function (model) {
		response.render("index.ejs", model);
	});
});

app.get('/rdc', function (request, response) {
	var indexViewModelFactory = new IndexViewModelFactory();
	indexViewModelFactory.build(function (model) {
		response.render("manual_rdc.ejs", model);
	});
});

app.get('/qss', function (request, response) {
	var indexViewModelFactory = new IndexViewModelFactory();
	indexViewModelFactory.build(function (model) {
		response.render("manual_qss.ejs", model);
	});
});

app.post('/rdc_track_id', function (request, response) {
	var config = {
		_id: "rdc_track_id",
		value: request.body.edit_rdc_track_id
	};

	db['admin-config'].save(config, function () {
		response.redirect('/');
	});
});

app.post('/qss_track_id', function (request, response) {
	var config = {
		_id: "qss_track_id",
		value: request.body.edit_qss_track_id
	};

	db['admin-config'].save(config, function () {
		response.redirect('/');
	});
});

app.post('/tournament_id', function (request, response) {
	var config = {
		_id: "tournament_id",
		value: request.body.edit_tournament_id
	};

	db['admin-config'].save(config, function () {
		response.redirect('/');
	});
});

app.post('/refresh_wait_time', function (request, response) {
	var config = {
		_id: "refresh_wait_time",
		value: request.body.edit_refresh_wait_time
	};

	db['admin-config'].save(config, function () {
		response.redirect('/');
	});
});

app.post('/livetable/:country', function (request, response) {

	var liveTableData = {
		_id: request.params.country,
		played: request.body.played,
		won: request.body.won,
		dif: request.body.dif
	};

	db['livetable'].save(liveTableData, function () {
		response.redirect('/');
	});
});

app.post('/livebracket/:number', function (request, response) {

	var liveBracketData = {
		_id: request.params.number,
		number: request.params.number,
		title: request.body.title,
		a: request.body.a,
		b: request.body.b,
		details: request.body.details
	};

	db['livebracket'].save(liveBracketData, function () {
		response.redirect('/');
	});
});

app.post('/rdc_alt_lang', function (request, response) {
	var config = {
		_id: "rdc_alt_lang",
		value: request.body.edit_rdc_alt_lang
	};

	db['admin-config'].save(config, function () {
		response.redirect('/');
	});
});

app.post('/qss_alt_lang', function (request, response) {
	var config = {
		_id: "qss_alt_lang",
		value: request.body.edit_qss_alt_lang
	};

	db['admin-config'].save(config, function () {
		response.redirect('/');
	});
});



app.post('/manual_rdc_state', function (request, response) {
	
	var manual_state = {
		title: request.body.manual_rdc_title,
		a: {
			name: request.body.manual_rdc_a_name,
			score: request.body.manual_rdc_a_score
		},
		b: {
			name: request.body.manual_rdc_b_name,
			score: request.body.manual_rdc_b_score
		},
		period: "-",
		jam: "-",
		time: "-",
		period_time: "-"
	};

	var config = {
		_id: "manual_rdc",
		state: manual_state
	};

	db['admin-config'].save(config, function () {
		response.redirect('/rdc');
	});
});

app.post('/manual_qss_state', function (request, response) {
	
	var manual_state = {
		title: request.body.manual_qss_title,
		a: {
			name: request.body.manual_qss_a_name,
			score: request.body.manual_qss_a_score
		},
		b: {
			name: request.body.manual_qss_b_name,
			score: request.body.manual_qss_b_score
		},
		period: "-",
		jam: "-",
		time: "-",
		period_time: "-"
	};

	var config = {
		_id: "manual_qss",
		state: manual_state
	};

	db['admin-config'].save(config, function () {
		response.redirect('/qss');
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Listening on " + port);
});