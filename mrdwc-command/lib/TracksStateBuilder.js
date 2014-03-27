var GameStateLoader = require('./GameStateLoader');

var TracksStateBuilder = function (request) {

	var gameStateLoader = new GameStateLoader(request);

	function build(rdc_game_id, qss_game_id, callback) {

		gameStateLoader.load(rdc_game_id, function (rdc_track_state) {
			gameStateLoader.load(qss_game_id, function (qss_track_state) {
				var state = {
					rdc: rdc_track_state,
					qss: qss_track_state
				};

				callback(state);

			});
		});
	}
	return {
		build: build
	};
};

module.exports = TracksStateBuilder;