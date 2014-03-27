var mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config"]);

var ConfigStateBuilder = function (request) {

	function build(callback) {

		get_admin_config("refresh_wait_time", function (refresh_wait_time) {
			get_admin_config("qss_alt_lang", function (qss_alt_lang) {
				get_admin_config("rdc_alt_lang", function (rdc_alt_lang) {

					var state = {
						refreshWaitTime: refresh_wait_time,
						qss_alt_lang: qss_alt_lang,
						rdc_alt_lang: rdc_alt_lang
					};

					callback(state);

				});
			});
		});
	}

	function get_admin_config(name, callback) {

		var query = {
			_id: name
		}

		db['admin-config'].find(query, function (err, admin_config_object) {

			var admin_config_value = "30000";

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

module.exports = ConfigStateBuilder;