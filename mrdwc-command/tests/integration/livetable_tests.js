/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

var browser = new Browser({
	site: "http://localhost:3000"
});

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_CONNECTION_STRING, ["livetable"]);


browser.authenticate().basic("mrdwc", process.env.SECRET_PASSWORD);

describe('Given I visit the root URL', function (done) {

	before(function (done) {
		var liveTableData = {
			_id: "ENG",
			played: "0",
			won: "0",
			dif: "0"
		};

		db.livetable.save(liveTableData, function () {
			browser.visit('/', done);
		});
	});

	it("then I can see England in the live table", function () {
		expect(browser.query('.livetable#ENG')).to.exist;
		expect(browser.query('.livetable#ENG .played').value).to.equal("0");
		expect(browser.query('.livetable#ENG .won').value).to.equal("0");
		expect(browser.query('.livetable#ENG .dif').value).to.equal("0");
	});

	describe('Given I edit Englands LiveTable data', function (done) {

		var new_eng_played = "3",
			new_eng_won = "2",
			new_eng_dif = "450";

		before(function (done) {
			browser.fill('.livetable#ENG .played', new_eng_played);
			browser.fill('.livetable#ENG .won', new_eng_won);
			browser.fill('.livetable#ENG .dif', new_eng_dif);
			browser.pressButton("Save ENG", done);
		});

		it("then I can see Englands updated data in the live table", function () {
			expect(browser.query('.livetable#ENG')).to.exist;
			expect(browser.query('.livetable#ENG .played').value).to.equal("3");
			expect(browser.query('.livetable#ENG .won').value).to.equal("2");
			expect(browser.query('.livetable#ENG .dif').value).to.equal("450");
		});

	});

});