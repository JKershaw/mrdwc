/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
		site: "http://localhost:3000"
	});

describe('Given I visit the public knockout overlay URL', function(done) {

	before(function(done) {
		browser.visit('/knockout', done);
	});

	it("then the page loads fine", function() {
		browser.statusCode.should.equal(200);
		expect(browser.query("img")).to.exist;
	});
});

describe('Given I visit the knockout overlay URL', function(done) {

	before(function(done) {
		browser.visit('/overlay/knockout', done);
	});

	it("then the page loads fine", function() {
		browser.statusCode.should.equal(200);
		expect(browser.query("img")).to.exist;
	});
});

describe('Given I visit the table overlay URL', function(done) {

	before(function(done) {
		browser.visit('/overlay/table', done);
	});

	it("then the page loads fine", function() {
		browser.statusCode.should.equal(200);
	});
});