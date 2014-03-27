var tracksState = {
	rdc: {
		title: "England vs U.S.A",
		a: {
			name: "England",
			score: "123"
		},
		b: {
			name: "U.S.A.",
			score: "321"
		},
		period: 1,
		jam: 3,
		time: "1:23",
		period_time: "12:34"

	},
	qss: {
		title: "Wales vs Ireland",
		a: {
			name: "Wales",
			score: "789"
		},
		b: {
			name: "Ireland",
			score: "234"
		},
		period: 2,
		jam: 35,
		time: "3:23",
		period_time: "18:92"
	}
},
	configState = {
		refreshWaitTime: 1001,
		qss_alt_lang: "French",
		rdc_alt_lang: "German"
	},
	scoreState = {
		groups: [{
			name: "Red",
			teams: [{
				name: "USA",
				played: 3,
				won: 2,
				dif: 100
			}, {
				name: "FIN",
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
				name: "SCO",
				played: 0,
				won: 0,
				dif: 0
			}, {
				name: "JPN",
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
				name: "SWE",
				played: 0,
				won: 0,
				dif: 0
			}, {
				name: "NED",
				played: 0,
				won: 0,
				dif: 0
			}]
		}, {
			name: "Blue",
			teams: [{
				name: "FRA",
				played: 0,
				won: 0,
				dif: 0
			}, {
				name: "IRE",
				played: 0,
				won: 0,
				dif: 0
			}, {
				name: "GER",
				played: 0,
				won: 0,
				dif: 0
			}, {
				name: "AUS",
				played: 0,
				won: 0,
				dif: 0
			}]
		}],
		rounds: [{
			bouts: [{
				number: 4,
				title: "Quarter-final (Bout 4)",
				a: "England",
				b: "France",
				details: "Saturday 12:30 (QSS)"
			}, {
				number: 5,
				title: "Quarter-final (Bout 5)",
				a: "Orange 1",
				b: "Red 2",
				details: "Saturday 14:00 (RDC)"
			}, {
				number: 6,
				title: "Quarter-final (Bout 6)",
				a: "Green 1",
				b: "Blue 2",
				details: "Saturday 14:30 (QSS)"
			}, {
				number: 7,
				title: "Quarter-final (Bout 7)",
				a: "Red 1",
				b: "Orange 2",
				details: "Saturday 16:00 (RDC)"
			}, {
				number: 1,
				title: "Bout 1",
				a: "Blue 3",
				b: "Orange 4",
				details: "Saturday 10:00 (RDC)"
			}, {
				number: 2,
				title: "Bout 2",
				a: "Orange 3",
				b: "Blue 4",
				details: "Saturday 10:30 (QSS)"
			}, {
				number: 3,
				title: "Bout 3",
				a: "Red 3",
				b: "Green 4",
				details: "Saturday 12:00 (RDC)"
			}]
		}, {
			bouts: [{
				number: 13,
				title: "Semi-final (Bout 13)",
				a: "Winner 6",
				b: "Winner 4",
				details: "Sunday 11:00 (RDC)"
			}, {
				number: 14,
				title: "Semi-final (Bout 14)",
				a: "Winner 7",
				b: "Winner 5",
				details: "Sunday 11:30 (QSS)"
			}, {
				number: 8,
				title: "Bout 8",
				a: "Loser 1",
				b: "Loser 2",
				details: "Saturday 16:30 (QSS)"
			}, {
				number: 9,
				title: "Bout 9",
				a: "Winner 1",
				b: "Winner 2",
				details: "Saturday 18:00 (RDC)"
			}, {
				number: 10,
				title: "Bout 10",
				a: "Winner 3",
				b: "Green 3",
				details: "Saturday 18:30 (QSS)"
			}, {
				number: 11,
				title: "Bout 11",
				a: "Loser 6",
				b: "Loser 4",
				details: "Sunday 09:00 (RDC)"
			}, {
				number: 12,
				title: "Bout 12",
				a: "Loser 7",
				b: "Loser 5",
				details: "Sunday 09:30 (QSS)"
			}]
		}, {
			bouts: [{
				number: 19,
				title: "CUP (Bout 19)",
				a: "Winner 13",
				b: "Winner 14",
				details: "Sunday 19:00 (RDC)"
			}, {
				number: 17,
				title: "3rd Place (Bout 17)",
				a: "Loser 13",
				b: "Loser 14",
				details: "Sunday 15:30 (QSS)"
			}, {
				number: 18,
				title: "Plate (Bout 18)",
				a: "Winner 11",
				b: "Winner 12",
				details: "Sunday 17:00 (RDC)"
			}, {
				number: 16,
				title: "Bowl (Bout 16)",
				a: "Winner 9",
				b: "Winner 10",
				details: "Sunday 15:00 (RDC)"
			}, {
				number: 15,
				title: "Jug (Bout 15)",
				a: "Winner 8",
				b: "Loser 3",
				details: "Sunday 13:00 (RDC)"
			}]
		}]
	};

var fakeState = {
	tracks: tracksState,
	config: configState,
	score: scoreState
};


asyncTest("the state builder sends a request to the correct URI and gets back correct info", 5, function () {

	var mrdwcStateBuilder = new MrdwcStateBuilder(fakeJax, fakeWindow);

	mrdwcStateBuilder.buildState(function (state) {
		equal(fakeJaxParameters.url, 'http://mrdwc-query.herokuapp.com/state');

		equal(state.tracks.rdc.a.name, "England");
		equal(state.tracks.rdc.a.score, "123");
		equal(state.tracks.rdc.b.name, "U.S.A.");
		equal(state.tracks.rdc.b.score, "321");

		start();
	});
});


asyncTest("when refreshed, the UI contains the state information", 50, function () {

	equal($('#track_rdc_title').text(), "");
	equal($('#track_qss_title').text(), "");

	equal($('#track_rdc .a_side_name').text(), "Team Name");
	equal($('#track_rdc .a_side_score').text(), "0");
	equal($('#track_rdc .b_side_name').text(), "Team Name");
	equal($('#track_rdc .b_side_score').text(), "0");
	equal($('#track_rdc .game_period').text(), "1");
	equal($('#track_rdc .game_jam').text(), "1");
	equal($('#track_rdc .game_time').text(), "0:00");
	equal($('#track_rdc .game_period_time').text(), "30:00");

	equal($('#track_qss .a_side_name').text(), "Team Name");
	equal($('#track_qss .a_side_score').text(), "0");
	equal($('#track_qss .b_side_name').text(), "Team Name");
	equal($('#track_qss .b_side_score').text(), "0");
	equal($('#track_qss .game_period').text(), "1");
	equal($('#track_qss .game_jam').text(), "1");
	equal($('#track_qss .game_time').text(), "0:00");
	equal($('#track_qss .game_period_time').text(), "30:00");

	equal($('.group_Red .USA .group_team_played').text(), "0");
	equal($('.group_Red .USA .group_team_won').text(), "0");
	equal($('.group_Red .USA .group_team_dif').text(), "0");

	equal($('.bout_4 .team_a').text(), "Blue 1");
	equal($('.bout_4 .team_b').text(), "Green 2");

	equal($('#rdc_button_a').html(), "Alternate");
	equal($('#qss_button_a').html(), "Alternate");

	mrdwcUi = new MrdwcUi(fakeJax, fakeWindow);
	mrdwcUi.refresh(function () {

		equal($('.track_rdc_title').text(), fakeState.tracks.rdc.title);
		equal($('.track_qss_title').text(), fakeState.tracks.qss.title);

		equal($('#track_rdc .a_side_name').text(), fakeState.tracks.rdc.a.name);
		equal($('#track_rdc .a_side_score').text(), fakeState.tracks.rdc.a.score);
		equal($('#track_rdc .b_side_name').text(), fakeState.tracks.rdc.b.name);
		equal($('#track_rdc .b_side_score').text(), fakeState.tracks.rdc.b.score);
		equal($('#track_rdc .game_period').text(), fakeState.tracks.rdc.period);
		equal($('#track_rdc .game_jam').text(), fakeState.tracks.rdc.jam);
		equal($('#track_rdc .game_time').text(), fakeState.tracks.rdc.time);
		equal($('#track_rdc .game_period_time').text(), fakeState.tracks.rdc.period_time);

		equal($('#track_qss .a_side_name').text(), fakeState.tracks.qss.a.name);
		equal($('#track_qss .a_side_score').text(), fakeState.tracks.qss.a.score);
		equal($('#track_qss .b_side_name').text(), fakeState.tracks.qss.b.name);
		equal($('#track_qss .b_side_score').text(), fakeState.tracks.qss.b.score);
		equal($('#track_qss .game_period').text(), fakeState.tracks.qss.period);
		equal($('#track_qss .game_jam').text(), fakeState.tracks.qss.jam);
		equal($('#track_qss .game_time').text(), fakeState.tracks.qss.time);
		equal($('#track_qss .game_period_time').text(), fakeState.tracks.qss.period_time);

		equal($('.group_Red .USA .group_team_played').text(), "3");
		equal($('.group_Red .USA .group_team_won').text(), "2");
		equal($('.group_Red .USA .group_team_dif').text(), "100");

		equal($('.bout_4 .team_a').text(), "England");
		equal($('.bout_4 .team_b').text(), "France");

		equal($('#rdc_button_a').text(), "German");
		equal($('#qss_button_a').text(), "French");

		start();
	});
});

asyncTest("After a refresh, the refresh function is called again after a set amount of time", 1, function () {

	mrdwcUi = new MrdwcUi(fakeJax, fakeWindow);
	mrdwcUi.refresh(function () {

		equal(timeUntilRefresh, fakeState.config.refreshWaitTime);
		start();

	});

});

asyncTest("the refresh function refreshes the stats", 2, function () {

	equal($('#track_rdc .a_side_name').text(), "Team Name");

	refresh(fakeJax, fakeWindow, function () {
		equal($('#track_rdc .a_side_name').text(), fakeState.tracks.rdc.a.name);
		start();
	});
});

var fakeJaxParameters, timeUntilRefresh;

var fakeWindow = {
	setTimeout: function (functionname, milliseconds) {
		timeUntilRefresh = milliseconds;
	}

};

var fakeJax = function (parameters) {
	fakeJaxParameters = parameters;

	var fakeXhr = {
		status: 503
	};

	if (parameters.url == 'http://mrdwc-query.herokuapp.com/state') {
		fakeXhr = {
			status: 200,
			responseText: JSON.stringify(fakeState)
		};
	}

	parameters.complete(fakeXhr, "success");
}