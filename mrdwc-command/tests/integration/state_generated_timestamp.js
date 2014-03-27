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

describe('Given I visit the root URL and look at the refresh timeout', function (done) {

	var age =0;

	before(function (done) {

		date = new Date();

		var config = {
			_id: "state_generated_timestamp",
			value: date.getTime() - 100000
		};

		db['admin-config'].save(config, function () {
			browser.visit('/', done);
		});

	});

	it("then I can see the current state age is 1000", function () {
		age = parseFloat(browser.text('#state_age'));
		assert.equal(age > 1, true);
	});

	describe('Given I visit the state URL', function (done) {

	before(function (done) {

		browser.visit("/state", function(){
			browser.visit('/', done);
		});

	});

	it("then I can see the current state age is less", function () {
		assert.equal(parseFloat(browser.text('#state_age')) < age, true);
	});

});


});
