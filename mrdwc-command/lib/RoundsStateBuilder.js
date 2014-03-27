var mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["livebracket"]);

var RoundsStateBuilder = function (request) {

	function build(callback) {

		db.livebracket.find({}, function (err, livebracket_objects) {

			var state = [{
				bouts: [{
					number: 1,
					title: (get_livetable_data(livebracket_objects, 1, "title") || "Bout 1"),
					a: (get_livetable_data(livebracket_objects, 1, "a") || "Blue 3"),
					b: (get_livetable_data(livebracket_objects, 1, "b") || "Orange 4"),
					details: (get_livetable_data(livebracket_objects, 1, "details") || "Saturday 10:00 (RDC)")
				}, {
					number: 2,
					title: (get_livetable_data(livebracket_objects, 2, "title") || "Bout 2"),
					a: (get_livetable_data(livebracket_objects, 2, "a") || "Orange 3"),
					b: (get_livetable_data(livebracket_objects, 2, "b") || "Blue 4"),
					details: (get_livetable_data(livebracket_objects, 2, "details") || "Saturday 10:30 (QSS)")
				}, {
					number: 3,
					title: (get_livetable_data(livebracket_objects, 3, "title") || "Bout 3"),
					a: (get_livetable_data(livebracket_objects, 3, "a") || "Red 3"),
					b: (get_livetable_data(livebracket_objects, 3, "b") || "Green 4"),
					details: (get_livetable_data(livebracket_objects, 3, "details") || "Saturday 12:00 (RDC)")
				}, {
					number: 4,
					title: (get_livetable_data(livebracket_objects, 4, "title") || "Quarter-final (Bout 4)"),
					a: (get_livetable_data(livebracket_objects, 4, "a") || "Blue 1"),
					b: (get_livetable_data(livebracket_objects, 4, "b") || "Green 2"),
					details: (get_livetable_data(livebracket_objects, 4, "details") || "Saturday 12:30 (QSS)")
				}, {
					number: 5,
					title: (get_livetable_data(livebracket_objects, 5, "title") || "Quarter-final (Bout 5)"),
					a: (get_livetable_data(livebracket_objects, 5, "a") || "Orange 1"),
					b: (get_livetable_data(livebracket_objects, 5, "b") || "Red 2"),
					details: (get_livetable_data(livebracket_objects, 5, "details") || "Saturday 14:00 (RDC)")
				}, {
					number: 6,
					title: (get_livetable_data(livebracket_objects, 6, "title") || "Quarter-final (Bout 6)"),
					a: (get_livetable_data(livebracket_objects, 6, "a") || "Green 1"),
					b: (get_livetable_data(livebracket_objects, 6, "b") || "Blue 2"),
					details: (get_livetable_data(livebracket_objects, 6, "details") || "Saturday 14:30 (QSS)")
				}, {
					number: 7,
					title: (get_livetable_data(livebracket_objects, 7, "title") || "Quarter-final (Bout 7)"),
					a: (get_livetable_data(livebracket_objects, 7, "a") || "Red 1"),
					b: (get_livetable_data(livebracket_objects, 7, "b") || "Orange 2"),
					details: (get_livetable_data(livebracket_objects, 7, "details") || "Saturday 16:00 (RDC)")
				}]
			}, {
				bouts: [{
					number: 8,
					title: (get_livetable_data(livebracket_objects, 8, "title") || "Bout 8"),
					a: (get_livetable_data(livebracket_objects, 8, "a") || "Loser 1"),
					b: (get_livetable_data(livebracket_objects, 8, "b") || "Loser 2"),
					details: (get_livetable_data(livebracket_objects, 8, "details") || "Saturday 16:30 (QSS)")
				}, {
					number: 9,
					title: (get_livetable_data(livebracket_objects, 9, "title") || "Bout 9"),
					a: (get_livetable_data(livebracket_objects, 9, "a") || "Winner 1"),
					b: (get_livetable_data(livebracket_objects, 9, "b") || "Winner 2"),
					details: (get_livetable_data(livebracket_objects, 9, "details") || "Saturday 18:00 (RDC)")
				}, {
					number: 10,
					title: (get_livetable_data(livebracket_objects, 10, "title") || "Bout 10"),
					a: (get_livetable_data(livebracket_objects, 10, "a") || "Winner 3"),
					b: (get_livetable_data(livebracket_objects, 10, "b") || "Green 3"),
					details: (get_livetable_data(livebracket_objects, 10, "details") || "Saturday 18:30 (QSS)")
				}, {
					number: 11,
					title: (get_livetable_data(livebracket_objects, 11, "title") || "Bout 11"),
					a: (get_livetable_data(livebracket_objects, 11, "a") || "Loser 6"),
					b: (get_livetable_data(livebracket_objects, 11, "b") || "Loser 4"),
					details: (get_livetable_data(livebracket_objects, 11, "details") || "Sunday 09:00 (RDC)")
				}, {
					number: 12,
					title: (get_livetable_data(livebracket_objects, 12, "title") || "Bout 12"),
					a: (get_livetable_data(livebracket_objects, 12, "a") || "Loser 7"),
					b: (get_livetable_data(livebracket_objects, 12, "b") || "Loser 5"),
					details: (get_livetable_data(livebracket_objects, 12, "details") || "Sunday 09:30 (QSS)")
				}, {
					number: 13,
					title: (get_livetable_data(livebracket_objects, 13, "title") || "Semi-final (Bout 13)"),
					a: (get_livetable_data(livebracket_objects, 13, "a") || "Winner 6"),
					b: (get_livetable_data(livebracket_objects, 13, "b") || "Winner 4"),
					details: (get_livetable_data(livebracket_objects, 13, "details") || "Sunday 11:00 (RDC)")
				}, {
					number: 14,
					title: (get_livetable_data(livebracket_objects, 14, "title") || "Semi-final (Bout 14)"),
					a: (get_livetable_data(livebracket_objects, 14, "a") || "Winner 7"),
					b: (get_livetable_data(livebracket_objects, 14, "b") || "Winner 5"),
					details: (get_livetable_data(livebracket_objects, 14, "details") || "Sunday 11:30 (QSS)")
				}]
			}, {
				bouts: [{
					number: 19,
					title: (get_livetable_data(livebracket_objects, 19, "title") || "CUP (Bout 19)"),
					a: (get_livetable_data(livebracket_objects, 19, "a") || "Winner 13"),
					b: (get_livetable_data(livebracket_objects, 19, "b") || "Winner 14"),
					details: (get_livetable_data(livebracket_objects, 19, "details") || "Sunday 19:00 (RDC)")
				}, {
					number: 17,
					title: (get_livetable_data(livebracket_objects, 17, "title") || "3rd Place (Bout 17)"),
					a: (get_livetable_data(livebracket_objects, 17, "a") || "Loser 13"),
					b: (get_livetable_data(livebracket_objects, 17, "b") || "Loser 14"),
					details: (get_livetable_data(livebracket_objects, 17, "details") || "Sunday 15:30 (QSS)")
				}, {
					number: 18,
					title: (get_livetable_data(livebracket_objects, 18, "title") || "Plate (Bout 18)"),
					a: (get_livetable_data(livebracket_objects, 18, "a") || "Winner 11"),
					b: (get_livetable_data(livebracket_objects, 18, "b") || "Winner 12"),
					details: (get_livetable_data(livebracket_objects, 18, "details") || "Sunday 17:00 (RDC)")
				}, {
					number: 16,
					title: (get_livetable_data(livebracket_objects, 16, "title") || "Bowl (Bout 16)"),
					a: (get_livetable_data(livebracket_objects, 16, "a") || "Winner 9"),
					b: (get_livetable_data(livebracket_objects, 16, "b") || "Winner 10"),
					details: (get_livetable_data(livebracket_objects, 16, "details") || "Sunday 15:00 (RDC)")
				}, {
					number: 15,
					title: (get_livetable_data(livebracket_objects, 15, "title") || "Jug (Bout 15)"),
					a: (get_livetable_data(livebracket_objects, 15, "a") || "Winner 8"),
					b: (get_livetable_data(livebracket_objects, 15, "b") || "Loser 3"),
					details: (get_livetable_data(livebracket_objects, 15, "details") || "Sunday 13:00 (RDC)")
				}]
			}];

			callback(state);
		});
	}

	function get_livetable_data(livebracket_objects, number, param) {
		var value = false;
		for (var i = 0; i < livebracket_objects.length; i++) {
			if (livebracket_objects[i].number == number) {
				value = livebracket_objects[i][param];
			}
		}
		return value;
	}


	return {
		build: build
	};
};

module.exports = RoundsStateBuilder;