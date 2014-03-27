var assert = require('assert'),
	RoundsStateBuilder = require('../../lib/RoundsStateBuilder'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["livebracket"]);

test("Given known rounds setup, the rounds state builder returns valid JSON", function (done) {

	var expectedState = [{
		bouts: [{
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
			title: "Bout 3 Woop",
			a: "England",
			b: "France",
			details: "Foo"
		}, {
			number: 4,
			title: "Quarter-final (Bout 4)",
			a: "Blue 1",
			b: "Green 2",
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
		}]
	}, {
		bouts: [{
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
		}, {
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
	}];

	var editedBout = {
		number: 3,
		title: "Bout 3 Woop",
		a: "England",
		b: "France",
		details: "Foo"
	};


	db.livebracket.save(editedBout, function () {

		var roundsStateBuilder = new RoundsStateBuilder();
		roundsStateBuilder.build(function (actualState) {
			assert.deepEqual(expectedState, actualState);
			done();
		});
	});

});