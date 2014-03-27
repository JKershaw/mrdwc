var assert = require('assert'),
	TournamentGameFetcher = require('../../lib/TournamentGameFetcher');

var fakeTournamentID = "4129d7a99e3b4b53b02ae72e8b690553";

var fakeTournbamentJSON = {
	"Tournament": {

		"Games": [{
			"GameId": "d0acbf81-ab71-4e8a-a24d-037f04e470f5",
			"Team1Name": "Wolf Pack",
			"Team2Name": "MADE All Stars",
			"Team1ScoreTotal": 12,
			"Team2ScoreTotal": 34
		}, {
			"GameId": "30ee6254-366e-4666-bf7f-23c4c288f37a",
			"Team1Name": "Rogue",
			"Team2Name": "Love City",
			"Team1ScoreTotal": 56,
			"Team2ScoreTotal": 78
		}, {
			"GameId": "27728d3c-fb80-4bb2-aebf-2a4ac3adb2ba",
			"Team1Name": "Penn Jersey",
			"Team2Name": "Love City",
			"Team1ScoreTotal": 90,
			"Team2ScoreTotal": 12
		}]
	}
};

test("Given a tournament ID I can get a list of games", function (done) {

	var expectedOutput = [{
		gameID: "d0acbf81-ab71-4e8a-a24d-037f04e470f5",
		title: "Wolf Pack vs MADE All Stars (12 : 34)"
	}, {
		gameID: "30ee6254-366e-4666-bf7f-23c4c288f37a",
		title: "Rogue vs Love City (56 : 78)"
	}, {
		gameID: "27728d3c-fb80-4bb2-aebf-2a4ac3adb2ba",
		title: "Penn Jersey vs Love City (90 : 12)"
	}];

	var tournamentGameFetcher = new TournamentGameFetcher(fakeRequest);

	tournamentGameFetcher.fetch(fakeTournamentID, function (actualOutput) {
		assert.deepEqual(expectedOutput, actualOutput);
		done();
	});
});


var fakeRequest = function (url, callback) {


	var response = {
		statusCode: 500
	},
		error = null,
		body = null;

	if (url == "https://api.rdnation.com/LiveGame/Tournament?id=4129d7a99e3b4b53b02ae72e8b690553") {
		response = {
			statusCode: 200
		};
		error = null;
		body = JSON.stringify(fakeTournbamentJSON);
	}

	callback(error, response, body);
};