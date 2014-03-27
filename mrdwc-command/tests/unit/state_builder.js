var assert = require('assert'),
	StateBuilder = require('../../lib/StateBuilder'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["livebracket", "livetable", "admin-config"]);

test("Given known information, the state builder returns valid JSON", function (done) {

	var editedBout = {
		number: 5,
		title: "Bout 5 Woop",
		a: "England",
		b: "France",
		details: "Foo"
	};

	var config = {
		_id: "refresh_wait_time",
		value: 10000
	};

	var rdc_track_config = {
		_id: "rdc_track_id",
		value: ""
	};

	var qss_track_config = {
		_id: "rdc_track_id",
		value: ""
	};


	var config_qss = {
		_id: "qss_alt_lang",
		value: "Alternate"
	};

	var config_rdc = {
		_id: "rdc_alt_lang",
		value: "Alternate"
	};

	var tablearg = {
		_id: "ARG",
		played: 7,
		won: 5,
		dif: 66
	};

	db.livetable.save(tablearg, function () {
		db['admin-config'].save(config, function () {
			db['admin-config'].save(rdc_track_config, function () {
				db['admin-config'].save(qss_track_config, function () {
					db['admin-config'].save(config_qss, function () {
						db['admin-config'].save(config_rdc, function () {
							db.livebracket.save(editedBout, function () {

								var stateBuilder = new StateBuilder();
								stateBuilder.build(function (actualState) {

									assert.deepEqual(expectedState._id, actualState._id);
									assert.deepEqual(expectedState.tracks, actualState.tracks);
									assert.deepEqual(expectedState.config, actualState.config);
									assert.deepEqual(expectedState.score.groups[2], actualState.score.groups[2]);
									assert.deepEqual(expectedState.score.rounds[0].bouts[1], actualState.score.rounds[0].bouts[1]);

									done();
								});

							});
						});
					});
				});
			});
		});
	});
});

var expectedState = {
	"_id": "state",
	"tracks": {
		"rdc": {
			"title": "",
			"a": {
				"name": "Team Name",
				"score": "0"
			},
			"b": {
				"name": "Team Name",
				"score": "0"
			},
			"period": 0,
			"jam": 0,
			"time": "0:00",
			"period_time": "0:00"
		},
		"qss": {
			"title": "",
			"a": {
				"name": "Team Name",
				"score": "0"
			},
			"b": {
				"name": "Team Name",
				"score": "0"
			},
			"period": 0,
			"jam": 0,
			"time": "0:00",
			"period_time": "0:00"
		}
	},
	"config": {
		"refreshWaitTime": 10000,
		"qss_alt_lang": "Alternate",
		"rdc_alt_lang": "Alternate"
	},
	"score": {
		"groups": [{
			"name": "Red",
			"teams": [{
				"name": "USA",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "FIN",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "WAL",
				"played": 0,
				"won": 0,
				"dif": 0
			}]
		}, {
			"name": "Orange",
			"teams": [{
				"name": "BEL",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "CAN",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "SCO",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "JAP",
				"played": 0,
				"won": 0,
				"dif": 0
			}]
		}, {
			"name": "Green",
			"teams": [{
				"name": "ARG",
				"played": 7,
				"won": 5,
				"dif": 66
			}, {
				"name": "ENG",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "SWE",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "NED",
				"played": 0,
				"won": 0,
				"dif": 0
			}]
		}, {
			"name": "Blue",
			"teams": [{
				"name": "FRA",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "IRE",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "GER",
				"played": 0,
				"won": 0,
				"dif": 0
			}, {
				"name": "AUS",
				"played": 0,
				"won": 0,
				"dif": 0
			}]
		}],
		"rounds": [{
			"bouts": [{
				"number": 1,
				"title": "Bout 1",
				"a": "Blue 3",
				"b": "Orange 4",
				"details": "Saturday 10:00 (RDC)"
			}, {
				"number": 2,
				"title": "Bout 2",
				"a": "Orange 3",
				"b": "Blue 4",
				"details": "Saturday 10:30 (QSS)"
			}, {
				"number": 3,
				"title": "Bout 3",
				"a": "Red 3",
				"b": "Green 4",
				"details": "Saturday 12:00 (RDC)"
			}, {
				"number": 4,
				"title": "Quarter-final (Bout 4)",
				"a": "Blue 3",
				"b": "Orange 4",
				"details": "Saturday 12:30 (QSS)"
			}, {
				"number": 5,
				"title": "Bout 5 Woop",
				"a": "England",
				"b": "France",
				"details": "Saturday 14:00 (RDC)"
			}, {
				"number": 6,
				"title": "Quarter-final (Bout 6)",
				"a": "Blue 1",
				"b": "Green 2",
				"details": "Saturday 14:30 (QSS)"
			}, {
				"number": 7,
				"title": "Quarter-final (Bout 7)",
				"a": "Red 1",
				"b": "Orange 2",
				"details": "Saturday 16:00 (RDC)"
			}]
		}, {
			"bouts": [{
				"number": 13,
				"title": "Semi-final (Bout 13)",
				"a": "Winner 6",
				"b": "Winner 4",
				"details": "Sunday 11:00 (RDC)"
			}, {
				"number": 14,
				"title": "Semi-final (Bout 14)",
				"a": "Winner 7",
				"b": "Winner 5",
				"details": "Sunday 11:30 (QSS)"
			}, {
				"number": 8,
				"title": "Bout 8",
				"a": "Loser 1",
				"b": "Loser 2",
				"details": "Saturday 16:30 (QSS)"
			}, {
				"number": 9,
				"title": "Bout 9",
				"a": "Winner 1",
				"b": "Winner 2",
				"details": "Saturday 18:00 (RDC)"
			}, {
				"number": 10,
				"title": "Bout 10",
				"a": "Winner 3",
				"b": "Green 3",
				"details": "Saturday 18:30 (QSS)"
			}, {
				"number": 11,
				"title": "Bout 11",
				"a": "Loser 6",
				"b": "Loser 4",
				"details": "Sunday 09:00 (RDC)"
			}, {
				"number": 12,
				"title": "Bout 12",
				"a": "Loser 7",
				"b": "Loser 5",
				"details": "Sunday 09:30 (QSS)"
			}]
		}, {
			"bouts": [{
				"number": 19,
				"title": "CUP (Bout 19)",
				"a": "Winner 13",
				"b": "Winner 14",
				"details": "Sunday 19:00 (RDC)"
			}, {
				"number": 17,
				"title": "3rd Place (Bout 17)",
				"a": "Loser 13",
				"b": "Loser 14",
				"details": "Sunday 15:30 (QSS)"
			}, {
				"number": 18,
				"title": "Plate (Bout 18)",
				"a": "Winner 11",
				"b": "Winner 12",
				"details": "Sunday 17:00 (RDC)"
			}, {
				"number": 16,
				"title": "Bowl (Bout 16)",
				"a": "Winner 9",
				"b": "Winner 10",
				"details": "Sunday 15:00 (RDC)"
			}, {
				"number": 15,
				"title": "Jug (Bout 15)",
				"a": "Winner 8",
				"b": "Loser 3",
				"details": "Sunday 13:00 (RDC)"
			}]
		}]
	}
};