var request = require('request'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config"]),
	ConfigStateBuilder = require('./ConfigStateBuilder'),
	TracksStateBuilder = require('./TracksStateBuilder'),
	GroupStateBuilder = require('./GroupStateBuilder'),
	RoundsStateBuilder = require('./RoundsStateBuilder');

var StateBuilder = function () {

	function build(callback) {

		var configStateBuilder = new ConfigStateBuilder(),
			tracksStateBuilder = new TracksStateBuilder(request),
			groupStateBuilder = new GroupStateBuilder(),
			roundsStateBuilder = new RoundsStateBuilder();

		get_admin_config("rdc_track_id", function (rdc_game_id) {
			get_admin_config("qss_track_id", function (qss_game_id) {

				configStateBuilder.build(function (config) {
					tracksStateBuilder.build(rdc_game_id, qss_game_id, function (tracks) {
						groupStateBuilder.build(function (groups) {
							roundsStateBuilder.build(function (rounds) {

								var state = {
									_id: "state",
									tracks: tracks,
									config: config,
									score: {
										groups: groups,
										rounds: rounds
									}
								};

								callback(state);
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

	return {
		build: build
	};
};

module.exports = StateBuilder;