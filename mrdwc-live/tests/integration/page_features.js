/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

describe('Given I visit the root URL', function (done) {

	before(function (done) {
		browser.visit('/', done);
	});

	it("There is a title", function () {
		expect(browser.query('#title')).to.exist;
	});

	it("There is a score and team names for the RDC track", function () {
		expect(browser.query('#track_rdc .a_side_score')).to.exist;
		expect(browser.query('#track_rdc .b_side_score')).to.exist;
		expect(browser.query('#track_rdc .a_side_name')).to.exist;
		expect(browser.query('#track_rdc .b_side_name')).to.exist;

		browser.text('#track_rdc .a_side_score').should.equal("0");
		browser.text('#track_rdc .b_side_score').should.equal("0");
		browser.text('#track_rdc .a_side_name').should.equal("Team Name");
		browser.text('#track_rdc .b_side_name').should.equal("Team Name");
	});

	it("There is a score and team names for the qss track", function () {
		expect(browser.query('#track_qss .a_side_score')).to.exist;
		expect(browser.query('#track_qss .b_side_score')).to.exist;
		expect(browser.query('#track_qss .a_side_name')).to.exist;
		expect(browser.query('#track_qss .b_side_name')).to.exist;

		browser.text('#track_qss .a_side_score').should.equal("0");
		browser.text('#track_qss .b_side_score').should.equal("0");
		browser.text('#track_qss .a_side_name').should.equal("Team Name");
		browser.text('#track_qss .b_side_name').should.equal("Team Name");
	});
});