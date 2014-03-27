var assert = require('assert'),
	RdNationStateParser = require("../../lib/RdNationStateParser");

var sample_RDNation_state = {
	"game": {
		"StartTime": "\/Date(1366589463047)\/",
		"GameId": "4bff5e2e1b0e4546ac7d766537da79ca",
		"GameName": "Derby Ink Game 12",
		"Team1Name": "England",
		"Team1LinkName": null,
		"Team2LinkName": null,
		"Team1LogoUrl": null,
		"Team2Name": "U.S.A.",
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

var expectedGameState = {
	title: "England vs U.S.A.",
	a: {
		name: "England",
		score: "34"
	},
	b: {
		name: "U.S.A.",
		score: "82"
	},
	period: 2,
	jam: 3,
	time: "1:14",
	period_time: "12:34"
};

test("Given an RDNation game state, return an MRDWC state", function (done) {

	var rdNationStateParser = new RdNationStateParser();

	var returnedGameState = rdNationStateParser.parse(sample_RDNation_state);
	assert.deepEqual(returnedGameState, expectedGameState);
	done();
});