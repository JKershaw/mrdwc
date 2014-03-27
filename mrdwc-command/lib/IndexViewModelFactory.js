var GameStateLoader = require('./GameStateLoader'),
	TournamentGameFetcher = require('./TournamentGameFetcher'),
	request = require('request'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config", "livetable", "livebracket"]);

var IndexViewModelFactory = function () {


	function build(callback) {

		var gameStateLoader = new GameStateLoader(request);
		var tournamentGameFetcher = new TournamentGameFetcher(request);

		get_admin_config("rdc_track_id", function (rdc_track_id) {
			get_admin_config("qss_track_id", function (qss_track_id) {
				get_admin_config("tournament_id", function (tournament_id) {
					get_admin_config("refresh_wait_time", function (refresh_wait_time) {
						get_admin_config("rdc_alt_lang", function (rdc_alt_lang) {
							get_admin_config("qss_alt_lang", function (qss_alt_lang) {
								get_admin_config("state_generated_timestamp", function (state_generated_timestamp) {
									gameStateLoader.load(rdc_track_id, function (rdc_track_state) {
										gameStateLoader.load(qss_track_id, function (qss_track_state) {
											get_livetable_data(function (livetable) {
												get_livebracket_data(function (livebracket) {
													tournamentGameFetcher.fetch(tournament_id, function (tournamentGames) {

														var model = {
															rdc_track_id: rdc_track_id,
															rdc_track_state: rdc_track_state,
															qss_track_id: qss_track_id,
															qss_track_state: qss_track_state,
															tournament_id: tournament_id,
															refresh_wait_time: refresh_wait_time,
															livetable: livetable,
															livebracket: livebracket,
															rdc_alt_lang: rdc_alt_lang,
															qss_alt_lang: qss_alt_lang,
															state_age: (new Date().getTime() - state_generated_timestamp) / 1000,
															tournamentGames: tournamentGames


														};

														console.log(tournamentGames);

														callback(model);
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}

	function get_admin_config(name, callback) {

		var query = {
			_id: name
		}

		db['admin-config'].find(query, function (err, admin_config_object) {

			var admin_config_value = "";

			if (admin_config_object.length > 0) {
				admin_config_value = admin_config_object[0].value;
			}

			callback(admin_config_value);
		});
	}

	function get_livetable_data(callback) {

		var countries = ["FIN", "USA", "WAL", "BEL", "CAN", "JPN", "SCO", "ARG", "ENG", "NED", "SWE", "AUS", "FRA", "GER", "IRE"];

		db['livetable'].find({}).sort({
			_id: 1
		}, function (err, livetable_objects) {

			for (var i = 0; i < countries.length; i++) {
				var found_country = false;
				for (var j = 0; j < livetable_objects.length; j++) {
					if (livetable_objects[j]._id == countries[i]) {
						found_country = true;
					}
				}

				if (!found_country) {
					livetable_objects.push({
						_id: countries[i],
						played: 0,
						won: 0,
						dif: 0
					});
				}
			}

			callback(livetable_objects);
		});
	}

	function get_livebracket_data(callback) {


		var livebrackets = [{
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
		}, {
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
		}];

		db['livebracket'].find({}).sort({
			_id: 1
		}, function (err, livebracket_objects) {

			for (var i = 0; i < livebrackets.length; i++) {
				var found_bracket = false;
				for (var j = 0; j < livebracket_objects.length; j++) {
					if (livebracket_objects[j]._id == livebrackets[i].number) {
						found_bracket = true;
					}
				}

				if (!found_bracket) {
					livebracket_objects.push(livebrackets[i]);
				}
			}


			callback(livebracket_objects);
		});
	}

	return {
		build: build
	}
};

module.exports = IndexViewModelFactory;