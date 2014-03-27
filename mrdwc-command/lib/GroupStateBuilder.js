var mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["livetable"]);

var GroupStateBuilder = function (request) {

	function build(callback) {

		db.livetable.find({}, function (err, livetable_objects) {

			var state = [{
				"name": "Red",
				"teams": [
					get_livetable_country(livetable_objects, "USA"),
					get_livetable_country(livetable_objects, "FIN"),
					get_livetable_country(livetable_objects, "WAL")
					]
			}, {
				"name": "Orange",
				"teams": [
					get_livetable_country(livetable_objects, "BEL"),
					get_livetable_country(livetable_objects, "CAN"),
					get_livetable_country(livetable_objects, "SCO"),
					get_livetable_country(livetable_objects, "JPN")
					]
			}, {
				"name": "Green",
				"teams": [
					get_livetable_country(livetable_objects, "ARG"),
					get_livetable_country(livetable_objects, "ENG"),
					get_livetable_country(livetable_objects, "SWE"),
					get_livetable_country(livetable_objects, "NED")
					]
			}, {
				"name": "Blue",
				"teams": [
					get_livetable_country(livetable_objects, "FRA"),
					get_livetable_country(livetable_objects, "IRE"),
					get_livetable_country(livetable_objects, "GER"),
					get_livetable_country(livetable_objects, "AUS")
					]
			}];

			callback(state);
		});
	}

	function get_livetable_data(livetable_objects, country, param) {
		var value = 0;
		for (var i = 0; i < livetable_objects.length; i++) {
			if (livetable_objects[i]._id == country) {
				value = livetable_objects[i][param];
			}
		}
		return value;
	}

	function get_livetable_country(livetable_objects, country) {
		return {
			"name": country,
			"played": get_livetable_data(livetable_objects, country, "played"),
			"won": get_livetable_data(livetable_objects, country, "won"),
			"dif": get_livetable_data(livetable_objects, country, "dif")
		}
	}


	return {
		build: build
	};
};

module.exports = GroupStateBuilder;