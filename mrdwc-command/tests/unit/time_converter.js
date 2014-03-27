var assert = require('assert'),
	RdNationTimeFormatter = require("../../lib/RdNationTimeFormatter");

test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 59000,
		expected_output = "0:59",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});


test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 12000,
		expected_output = "0:12",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});


test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 2000,
		expected_output = "0:02",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});


test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 62000,
		expected_output = "1:02",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});


test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 632000,
		expected_output = "10:32",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});

test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 3600000,
		expected_output = "60:00",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});

test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 0,
		expected_output = "0:00",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});

test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time,
		expected_output = "0:00",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});

test("Given a ms, the time converter returns the time in minutes and seconds", function () {
	var rdNationTimeFormatter = new RdNationTimeFormatter();

	var input_time = 754000,
		expected_output = "12:34",
		actual_output = rdNationTimeFormatter.format(input_time);

	assert.equal(expected_output, actual_output);
});


