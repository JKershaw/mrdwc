var RdNationStateParser = require('./RdNationStateParser'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config"]);

var GameStateLoader = function (request) {

	var rdNationStateParser = new RdNationStateParser();

	function load(gameID, callback) {

		if (!gameID) {
			blank_state(callback);
		} else {
			if (gameID == "manual_rdc") {
				manual_rdc_state(callback);
			} else if (gameID == "manual_qss") {
				manual_qss_state(callback);
			} else {
				live_state(gameID, callback);
			}
		}
	}

	function live_state(gameID, callback) {
		var rdNationUri = "https://api.rdnation.com/LiveGame/GameJsonMin?id=" + gameID;

		request(rdNationUri, function (error, response, body) {

			if (!error && response.statusCode == 200) {

				try {
					var rdNation_state = JSON.parse(body);
					var state = rdNationStateParser.parse(rdNation_state);
				} catch (err) {
					console.log(">>>>>>>>>>> Error parsing", err);
					var state = {
						title: "(Error reading RDNation)",
						a: {
							name: "",
							score: ""
						},
						b: {
							name: "",
							score: ""
						},
						period: "",
						jam: "",
						time: "",
						period_time: ""
					}
				}

				callback(state);

			} else {
				var responseCode = ":(";
				if (response) {
					responseCode = response.statusCode;
				}
				console.log(">>>>>>>>>>> OH NOES ERROR!", responseCode, error);

				var errorGameState = {
					title: "(Error connecting to RDNation)",
					a: {
						name: "",
						score: ""
					},
					b: {
						name: "",
						score: ""
					},
					period: "",
					jam: "",
					time: "",
					period_time: ""
				}
				callback(errorGameState);
			}
		});
	}

	function blank_state(callback) {
		var state = {
			title: "",
			a: {
				name: "Team Name",
				score: "0"
			},
			b: {
				name: "Team Name",
				score: "0"
			},
			period: "0",
			jam: "0",
			time: "0:00",
			period_time: "0:00"
		};
		callback(state);
	}

	function manual_qss_state(callback) {

		var query = {
			_id: "manual_qss"
		}

		db['admin-config'].find(query, function (err, manual_qss_objects) {
			if (manual_qss_objects.length > 0) {
				var state = manual_qss_objects[0].state;
				callback(state);
			} else {
				blank_state(callback);
			}
		});
	}

	function manual_rdc_state(callback) {

		var query = {
			_id: "manual_rdc"
		}

		db['admin-config'].find(query, function (err, manual_rdc_objects) {
			if (manual_rdc_objects.length > 0) {
				var state = manual_rdc_objects[0].state;
				callback(state);
			} else {
				blank_state(callback);
			}
		});
	}

	return {
		load: load
	};
};

module.exports = GameStateLoader;