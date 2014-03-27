/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

var browser = new Browser({
	site: "http://localhost:3000"
});

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGO_CONNECTION_STRING, ["state"]);


browser.authenticate().basic("mrdwc", process.env.SECRET_PASSWORD);


var state = {
	_id: "state"
};

describe('Given the state is rubbish', function (done) {

	before(function (done) {


		db.state.save(state, function () {
			done();
		});
	});

	it("then the state loads fine", function () {
		db.state.findOne({
			_id: "state"
		}, function (err, state) {
			expect(state).to.equal(state);
		});
	});

	describe('Given I visit the state URL', function (done) {

		before(function (done) {
			browser.visit('/state', done);
		});

		it("then the state loads fine", function () {
			expect(browser.statusCode).to.equal(200);
		});

		it("then the state is different", function () {
			db.state.findOne({
				_id: "state"
			}, function (err, newstate) {
				expect(newstate).to.not.equal(state);
			});
		});

	});

});