/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	http = require('http');

require('chai').should();


describe('Given I get the current state', function(done) {

	it("then the page loads fine and I can get state data", function(done) {
		http.get('http://localhost:3000/state', function(res) {
			console.log("Got response: " + res.statusCode);

			assert.equal(res.statusCode, 200);

			res.on("data", function(chunk) {
				data = JSON.parse(chunk);

				assert.equal(res.statusCode, 200);

				done();

			});
		});
	});
});