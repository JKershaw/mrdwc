var assert = require('assert'),
	GroupStateBuilder = require('../../lib/GroupStateBuilder'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["livetable"]);

test("Given known groups setup, the group state builder returns valid JSON", function (done) {

	var expectedState = [{
		"name": "Red",
		"teams": [{
			"name": "USA",
			"played": 3,
			"won": 2,
			"dif": 100
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
			"name": "JPN",
			"played": 0,
			"won": 0,
			"dif": 0
		}]
	}, {
		"name": "Green",
		"teams": [{
			"name": "ARG",
			"played": 0,
			"won": 0,
			"dif": 0
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
			"played": 3,
			"won": 3,
			"dif": 145
		}, {
			"name": "IRE",
			"played": 2,
			"won": 1,
			"dif": 56
		}, {
			"name": "GER",
			"played": 3,
			"won": 4,
			"dif": -234
		}, {
			"name": "AUS",
			"played": 4,
			"won": 1,
			"dif": -456
		}]
	}];

	var tableusa = {
		_id: "USA",
		played: 3,
		won: 2,
		dif: 100
	};

	var tablefra = {
		_id: "FRA",
		played: 3,
		won: 3,
		dif: 145
	};

	var tableire = {
		_id: "IRE",
		played: 2,
		won: 1,
		dif: 56
	};

	var tableger = {
		_id: "GER",
		played: 3,
		won: 4,
		dif: -234
	};

	var tableaus = {
		_id: "AUS",
		played: 4,
		won: 1,
		dif: -456
	};

	db.livetable.save(tableusa, function () {
		db.livetable.save(tablefra, function () {
			db.livetable.save(tableire, function () {
				db.livetable.save(tableger, function () {
					db.livetable.save(tableaus, function () {

						var groupStateBuilder = new GroupStateBuilder();
						groupStateBuilder.build(function (actualState) {
							assert.deepEqual(expectedState[0], actualState[0]);
							assert.deepEqual(expectedState[1], actualState[1]);
							assert.deepEqual(expectedState[2], actualState[2]);
							assert.deepEqual(expectedState[3], actualState[3]);
							assert.deepEqual(expectedState, actualState);
							done();
						});
					});
				});
			});
		});
	});
});