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
			_id: "tournament_id",
			value: "1234-5678-91012"
		};

		db['admin-config'].save(config, function () {
			browser.visit('/', done);
		});

	});

	it("then I can see the current tournament ID", function () {
		expect(browser.text('#tournament_id')).to.equal("1234-5678-91012");
	});
	
	describe('Given I edit the tournament id', function (done) {

		var new_tournament_id = "9876-4567";
		before(function (done) {
			browser.fill('#edit_tournament_id', new_tournament_id).pressButton("Save tournament id", done);
		});

		it("then I can see the new tournament id", function () {
			expect(browser.text('#tournament_id')).to.equal(new_tournament_id);
		});
	});

});