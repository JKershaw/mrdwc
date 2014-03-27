/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

var browser = new Browser({
	site: "http://localhost:3000"
});

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_CONNECTION_STRING, ["admin-config"]);


browser.authenticate().basic("mrdwc", process.env.SECRET_PASSWORD);

describe('Given I visit the root URL', function (done) {

	before(function (done) {

		var config = {
			_id: "rdc_track_id",
			value: "No id selected"
		};

		db['admin-config'].save(config, function () {
			config = {
				_id: "qss_track_id",
				value: "No id selected"
			};

			db['admin-config'].save(config, function () {
				browser.visit('/', done);
			});
		});

	});

	it("then I can see the current track game ids", function () {
		expect(browser.text('#rdc_track_id')).to.equal("No id selected");
		expect(browser.text('#qss_track_id')).to.equal("No id selected");
	});

	describe('Given I edit the RDC track id', function (done) {

		var new_rdc_id = "http://id_here";
		before(function (done) {
			browser.fill('#edit_rdc_track_id', 'http://id_here').pressButton("Save RDC id", done);
		});

		it("then I can see the new track game ids", function () {
			expect(browser.text('#rdc_track_id')).to.equal(new_rdc_id);
		});


		describe('Given I edit the QSS track id', function (done) {

			var new_rdc_id = "http://id_here";
			before(function (done) {
				browser.fill('#edit_qss_track_id', 'http://id_here').pressButton("Save QSS id", done);
			});

			it("then I can see the new track game ids", function () {
				expect(browser.text('#qss_track_id')).to.equal(new_rdc_id);
			});
		});
	});

});