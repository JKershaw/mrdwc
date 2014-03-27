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

describe('Given I visit the root URL and intend to manually update rdc', function (done) {

	before(function (done) {

		browser.visit('/rdc', done);

	});

	describe('Given I edit the manual track title', function (done) {

		before(function (done) {
			browser.fill('#manual_rdc_title', "Manual RDC track title");
			browser.fill('#manual_rdc_a_name', "Foo");
			browser.fill('#manual_rdc_b_name', "Bar");
			browser.fill('#manual_rdc_a_score', "1");
			browser.fill('#manual_rdc_b_score', "2");
			browser.pressButton("Save manual RDC state", function () {
				browser.fill('#edit_rdc_track_id', 'manual_rdc').pressButton("Save RDC id", function(){
					browser.visit('/', done);
				});
			});
		});

		it("then I can see the correct manual track state", function () {

			expect(browser.query('#manual_rdc_title[value="Manual RDC track title"]')).to.exist;
			expect(browser.query('#manual_rdc_a_name[value="Foo"]')).to.exist;
			expect(browser.query('#manual_rdc_b_name[value="Bar"]')).to.exist;
			expect(browser.query('#manual_rdc_a_score[value="1"]')).to.exist;
			expect(browser.query('#manual_rdc_b_score[value="2"]')).to.exist;

			var expected_state = '{"title":"Manual RDC track title","a":{"name":"Foo","score":"1"},"b":{"name":"Bar","score":"2"},"period":"-","jam":"-","time":"-","period_time":"-"}';
			expect(browser.text('#rdc_state')).to.equal(expected_state);
		});
	});
});


describe('Given I visit the root URL and intend to manually update qss', function (done) {

	before(function (done) {

		browser.visit('/qss', done);

	});

	describe('Given I edit the manual track title', function (done) {

		before(function (done) {
			browser.fill('#manual_qss_title', "Manual qss track title");
			browser.fill('#manual_qss_a_name', "Choo");
			browser.fill('#manual_qss_b_name', "Bob");
			browser.fill('#manual_qss_a_score', "5");
			browser.fill('#manual_qss_b_score', "6");
			browser.pressButton("Save manual QSS state", function () {
				browser.fill('#edit_qss_track_id', 'manual_qss').pressButton("Save QSS id", function(){
					browser.visit('/', done);
				});
			});
		});

		it("then I can see the correct manual track state", function () {

			expect(browser.query('#manual_qss_title[value="Manual qss track title"]')).to.exist;
			expect(browser.query('#manual_qss_a_name[value="Choo"]')).to.exist;
			expect(browser.query('#manual_qss_b_name[value="Bob"]')).to.exist;
			expect(browser.query('#manual_qss_a_score[value="5"]')).to.exist;
			expect(browser.query('#manual_qss_b_score[value="6"]')).to.exist;

			var expected_state = '{"title":"Manual qss track title","a":{"name":"Choo","score":"5"},"b":{"name":"Bob","score":"6"},"period":"-","jam":"-","time":"-","period_time":"-"}';
			expect(browser.text('#qss_state')).to.equal(expected_state);
		});
	});
});