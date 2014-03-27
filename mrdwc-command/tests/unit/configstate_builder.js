var assert = require('assert'),
	ConfigStateBuilder = require('../../lib/ConfigStateBuilder'),
	mongojs = require('mongojs'),
	db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config"]);

test("Given known config, the config state builder returns valid JSON", function (done) {

	var expectedState = {
		refreshWaitTime: 9001,
		qss_alt_lang: "French",
		rdc_alt_lang: "German"
	};

	var config_rwt = {
		_id: "refresh_wait_time",
		value: 9001
	};

	var config_qss = {
		_id: "qss_alt_lang",
		value: "French"
	};

	var config_rdc = {
		_id: "rdc_alt_lang",
		value: "German"
	};

	db['admin-config'].save(config_rwt, function () {
		db['admin-config'].save(config_qss, function () {
			db['admin-config'].save(config_rdc, function () {

				var configStateBuilder = new ConfigStateBuilder();
				configStateBuilder.build(function (actualState) {
					assert.deepEqual(expectedState, actualState);
					done();
				});
			});
		});
	});
});