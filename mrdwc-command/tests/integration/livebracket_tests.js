/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

var browser = new Browser({
	site: "http://localhost:3000"
});

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_CONNECTION_STRING, ["livescore"]);


browser.authenticate().basic("mrdwc", process.env.SECRET_PASSWORD);

describe('Given I visit the root URL', function (done) {

	before(function (done) {
		var liveScoreData = {
			_id: 15,
			number: 15,
			title: "Jug (Bout 15)",
			a: "Winner 8",
			b: "Loser 3",
			details: "Sunday 13:00 (RDC)"
		};

		db.livescore.save(liveScoreData, function () {
			browser.visit('/', done);
		});
	});

	it("then I can see Bout 15 in the livebracket", function () {
		expect(browser.query('.livebracket#bout15')).to.exist;
		expect(browser.query('.livebracket#bout15 .title').value).to.equal("Jug (Bout 15)");
		expect(browser.query('.livebracket#bout15 .a').value).to.equal("Winner 8");
		expect(browser.query('.livebracket#bout15 .b').value).to.equal("Loser 3");
		expect(browser.query('.livebracket#bout15 .details').value).to.equal("Sunday 13:00 (RDC)");
	});

	describe('Given I edit Englands livescore data', function (done) {

		var new_title = "Title here",
			new_a = "Foo",
			new_b = "Bar",
			new_details = "It happened";

		before(function (done) {
			browser.fill('.livebracket#bout15 .title', new_title);
			browser.fill('.livebracket#bout15 .a', new_a);
			browser.fill('.livebracket#bout15 .b', new_b);
			browser.fill('.livebracket#bout15 .details', new_details);
			browser.pressButton("input[value='Save Bout 15']", done);
		});

		it("then I can see Englands updated data in the live table", function () {
		expect(browser.query('.livebracket#bout15 .title').value).to.equal(new_title);
		expect(browser.query('.livebracket#bout15 .a').value).to.equal(new_a);
		expect(browser.query('.livebracket#bout15 .b').value).to.equal(new_b);
		expect(browser.query('.livebracket#bout15 .details').value).to.equal(new_details);
		});
	});
});