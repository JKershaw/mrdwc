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

describe('Given I visit the root URL and intend to edit the refresh time', function (done) {

	before(function (done) {

		var config = {
			_id: "refresh_wait_time",
			value: "5000"
		};

		db['admin-config'].save(config, function () {
			browser.visit('/', done);
		});

	});

	it("then I can see the current admin cofig for refresh rate", function () {
		expect(browser.text('#config_refresh_wait_time')).to.equal("5000");
	});

	describe('Given I edit the refresh_wait_ime', function (done) {

		var new_refresh_wait_time = "10000";
		before(function (done) {
			browser.fill('#edit_refresh_wait_time', new_refresh_wait_time).pressButton("Save refresh time", done);
		});

		it("then I can see the new track game ids", function () {
			expect(browser.text('#config_refresh_wait_time')).to.equal(new_refresh_wait_time);
		});
	});

});

describe('Given I visit the root URL and intend to edit the rdc alt languadge lable', function (done) {

	before(function (done) {

		var config = {
			_id: "rdc_alt_lang",
			value: "French"
		};

		db['admin-config'].save(config, function () {
			browser.visit('/', done);
		});

	});

	it("then I can see the current admin config for the rdc alt languadge", function () {
		expect(browser.text('#config_rdc_alt_lang')).to.equal("French");
	});

	describe('Given I edit the rdc_alt_lang', function (done) {

		var new_rdc_alt_lang = "German";
		before(function (done) {
			browser.fill('#edit_rdc_alt_lang', new_rdc_alt_lang).pressButton("Save RDC alternate languadge", done);
		});

		it("then I can see the new rdc alt languadge", function () {
			expect(browser.text('#config_rdc_alt_lang')).to.equal(new_rdc_alt_lang);
		});
	});

});


describe('Given I visit the root URL and intend to edit the qss alt languadge lable', function (done) {

	before(function (done) {

		var config = {
			_id: "qss_alt_lang",
			value: "Japanese"
		};

		db['admin-config'].save(config, function () {
			browser.visit('/', done);
		});

	});

	it("then I can see the current admin config for the qss alt languadge", function () {
		expect(browser.text('#config_qss_alt_lang')).to.equal("Japanese");
	});

	describe('Given I edit the qss_alt_lang', function (done) {

		var new_qss_alt_lang = "Polish";
		before(function (done) {
			browser.fill('#edit_qss_alt_lang', new_qss_alt_lang).pressButton("Save QSS alternate languadge", done);
		});

		it("then I can see the new qss alt languadge", function () {
			expect(browser.text('#config_qss_alt_lang')).to.equal(new_qss_alt_lang);
		});
	});

});