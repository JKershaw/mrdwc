var assert = require('assert'),
	GameStateLoader = require('../../lib/GameStateLoader'),
	request = require('request'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config"]);

test('The state loader returns a basic state', function (done) {

	var expectedGameState = {
		title: "France vs Wales",
		a: {
			name: "France",
			score: "34"
		},
		b: {
			name: "Wales",
			score: "82"
		},
		period: 2,
		jam: 3,
		time: "1:14",
		period_time: "12:34"
	};

	var gameStateLoader = new GameStateLoader(fakeRequest);

	var gameID = "12345678-1234-1234-1234-1234567891011";

	gameStateLoader.load(gameID, function (state) {
		assert.deepEqual(state, expectedGameState);
		done();
	});

});

test('The state loader returns error state on a 500', function (done) {

	var expectedGameState = {
		title: "(Error connecting to RDNation)",
		a: {
			name: "",
			score: ""
		},
		b: {
			name: "",
			score: ""
		},
		period: "",
		jam: "",
		time: "",
		period_time: ""
	};

	var gameStateLoader = new GameStateLoader(fakeRequest);

	var gameID = "500";

	gameStateLoader.load(gameID, function (state) {
		assert.deepEqual(state, expectedGameState);
		done();
	});

});

test('The state loader returns error state on a parse error', function (done) {

	var expectedGameState = {
		title: "(Error reading RDNation)",
		a: {
			name: "",
			score: ""
		},
		b: {
			name: "",
			score: ""
		},
		period: "",
		jam: "",
		time: "",
		period_time: ""
	};

	var gameStateLoader = new GameStateLoader(fakeRequest);

	var gameID = "badJsonPlease";

	gameStateLoader.load(gameID, function (state) {
		assert.deepEqual(state, expectedGameState);
		done();
	});

});

test('The state loader returns state when given a real game ID', function (done) {

	var expectedGameState = {
		title: 'Derby Mercs vs Hooligans',
		a: {
			name: 'Derby Mercs',
			score: 145
		},
		b: {
			name: 'Hooligans',
			score: 22
		},
		period: 0,
		jam: 0,
		time: '0:00',
		period_time: '0:00'
	};

	var gameStateLoader = new GameStateLoader(request);

	var gameID = "9994790d-7df7-4994-8f5e-e82bfa716a6c";

	gameStateLoader.load(gameID, function (state) {
		assert.deepEqual(state, expectedGameState);
		done();
	});

});

test('The state loader returns enpty when given no game ID', function (done) {

	var expectedGameState = {
		title: '',
		a: {
			name: 'Team Name',
			score: 0
		},
		b: {
			name: 'Team Name',
			score: 0
		},
		period: 0,
		jam: 0,
		time: '0:00',
		period_time: '0:00'
	};

	var gameStateLoader = new GameStateLoader(request);

	var gameID = "";

	gameStateLoader.load(gameID, function (state) {
		assert.deepEqual(state, expectedGameState);
		done();
	});

});



test('The state loader returns manual state when given manual_rdc', function (done) {

	var expectedGameState = {
		title: 'Manual RDC Game Title',
		a: {
			name: 'Manual Team Name',
			score: 1
		},
		b: {
			name: 'Manual Team Name',
			score: 2
		},
		period: "-",
		jam: "-",
		time: "-",
		period_time: "-"
	};

	var config_rdc = {
		_id: "manual_rdc",
		state: expectedGameState
	};

	var gameStateLoader = new GameStateLoader(fakeRequest);

	var gameID = "manual_rdc";


	db['admin-config'].save(config_rdc, function () {
		gameStateLoader.load(gameID, function (state) {
			assert.deepEqual(state, expectedGameState);
			done();
		});
	});

});


test('The state loader returns manual state when given manual_qss', function (done) {

	var expectedGameState = {
		title: 'Manual QSS Game Title',
		a: {
			name: 'Manual Team Name',
			score: 1
		},
		b: {
			name: 'Manual Team Name',
			score: 2
		},
		period: "-",
		jam: "-",
		time: "-",
		period_time: "-"
	};

	var config_qss = {
		_id: "manual_qss",
		state: expectedGameState
	};

	var gameStateLoader = new GameStateLoader(fakeRequest);

	var gameID = "manual_qss";

	db['admin-config'].save(config_qss, function () {
		gameStateLoader.load(gameID, function (state) {
			assert.deepEqual(state, expectedGameState);
			done();
		});
	});

});

var fakeRequest = function (url, callback) {

	var fakeRDNationgameState = {
		"game": {
			"StartTime": "\/Date(1366589463047)\/",
			"GameId": "4bff5e2e1b0e4546ac7d766537da79ca",
			"GameName": "Derby Ink Game 12",
			"Team1Name": "France",
			"Team1LinkName": null,
			"Team2LinkName": null,
			"Team1LogoUrl": null,
			"Team2Name": "Wales",
			"Team2LogoUrl": null,
			"Team1Score": 34,
			"Team2Score": 82,
			"PeriodTimeLeft": 754000,
			"JamTimeLeft": 74000,
			"JamNumberHuman": "J0",
			"JamNumber": 3,
			"PeriodNumberHuman": "P0",
			"PeriodNumber": 2,
			"RuleSet": "CUSTOM",
			"IsLiveStreaming": false,
			"GameUrl": "https://rdnation.com/roller-derby-game/4bff5e2e1b0e4546ac7d766537da79ca/Derby-Ink-Game-12/Harm-City/Shove-City",
			"GameLocationFrom": 0,
			"GameHeader": "21/4: Final",
			"HasGameEnded": true
		}
	};

	var response = {
		statusCode: 500
	},
		error = null,
		body = null;

	if (url == "https://api.rdnation.com/LiveGame/GameJsonMin?id=12345678-1234-1234-1234-1234567891011") {
		response = {
			statusCode: 200
		};
		error = null;
		body = JSON.stringify(fakeRDNationgameState);
	}

	if (url == "https://api.rdnation.com/LiveGame/GameJsonMin?id=badJsonPlease") {
		response = {
			statusCode: 200
		};
		error = null;
		body = "here{}some crap JSON; {:";
	}

	callback(error, response, body);
};