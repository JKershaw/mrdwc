var assert = require('assert'),
	TracksStateBuilder = require('../../lib/TracksStateBuilder'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config"]);


test("Given two games, the tracks state builder returns valid JSON", function (done) {

	var expectedState = {
		rdc: {
			title: "France vs Japan",
			a: {
				name: "France",
				score: "765"
			},
			b: {
				name: "Japan",
				score: "3621"
			},
			period: 1,
			jam: 3,
			time: "1:14",
			period_time: "12:34"

		},
		qss: {
			title: "Foo vs Bar",
			a: {
				name: "Foo",
				score: "76589"
			},
			b: {
				name: "Bar",
				score: "2434"
			},
			period: 2,
			jam: 3,
			time: "1:14",
			period_time: "12:34"
		}
	};

	var rdc_game_id = "1234",
		qss_game_id = "5678";

	var tracksStateBuilder = new TracksStateBuilder(fakeRequest);

	tracksStateBuilder.build(rdc_game_id, qss_game_id, function (actualState) {
		assert.deepEqual(expectedState, actualState);
		done();
	});
});


var fakeRequest = function (url, callback) {

	var fakeRDNationgameStateRDC = {
		"game": {
			"StartTime": "\/Date(1366589463047)\/",
			"GameId": "4bff5e2e1b0e4546ac7d766537da79ca",
			"GameName": "Derby Ink Game 12",
			"Team1Name": "France",
			"Team1LinkName": null,
			"Team2LinkName": null,
			"Team1LogoUrl": null,
			"Team2Name": "Japan",
			"Team2LogoUrl": null,
			"Team1Score": 765,
			"Team2Score": 3621,
			"PeriodTimeLeft": 754000,
			"JamTimeLeft": 74000,
			"JamNumberHuman": "J0",
			"JamNumber": 3,
			"PeriodNumberHuman": "P0",
			"PeriodNumber": 1,
			"RuleSet": "CUSTOM",
			"IsLiveStreaming": false,
			"GameUrl": "https://rdnation.com/roller-derby-game/4bff5e2e1b0e4546ac7d766537da79ca/Derby-Ink-Game-12/Harm-City/Shove-City",
			"GameLocationFrom": 0,
			"GameHeader": "21/4: Final",
			"HasGameEnded": true
		}
	};
	var fakeRDNationgameStateQSS = {
		"game": {
			"StartTime": "\/Date(1366589463047)\/",
			"GameId": "4bff5e2e1b0e4546ac7d766537da79ca",
			"GameName": "Derby Ink Game 12",
			"Team1Name": "Foo",
			"Team1LinkName": null,
			"Team2LinkName": null,
			"Team1LogoUrl": null,
			"Team2Name": "Bar",
			"Team2LogoUrl": null,
			"Team1Score": 76589,
			"Team2Score": 2434,
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

	if (url == "https://api.rdnation.com/LiveGame/GameJsonMin?id=1234") {
		response = {
			statusCode: 200
		};
		error = null;
		body = JSON.stringify(fakeRDNationgameStateRDC);
	}

	if (url == "https://api.rdnation.com/LiveGame/GameJsonMin?id=5678") {
		response = {
			statusCode: 200
		};
		error = null;
		body = JSON.stringify(fakeRDNationgameStateQSS);
	}

	callback(error, response, body);
};