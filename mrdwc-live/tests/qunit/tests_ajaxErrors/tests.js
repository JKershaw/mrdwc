asyncTest("If the ajax call returns an error, nothing is updated and the timeout waits 30 seconds", 6, function () {

	$('#track_rdc .a_side_name').text("Ireland");
	$('#track_rdc .a_side_score').text("673");
	$('#track_rdc .b_side_name').text("Wales");
	$('#track_rdc .b_side_score').text("12");

	var mrdwcStateBuilder = new MrdwcStateBuilder(fakeBrokenJax, fakeWindow);

	mrdwcStateBuilder.buildState(function (state) {
		equal(fakeJaxParameters.url, 'http://mrdwc-query.herokuapp.com/state');

		equal($('#track_rdc .a_side_name').text(), "Ireland");
		equal($('#track_rdc .a_side_score').text(), "673");
		equal($('#track_rdc .b_side_name').text(), "Wales");
		equal($('#track_rdc .b_side_score').text(), "12");

		equal(timeUntilRefresh, 30000);

		start();
	});
});

asyncTest("If the ajax call returns invalid JSON, nothing is updated and the timeout waits 30 seconds", 6, function () {

	$('#track_rdc .a_side_name').text("Ireland");
	$('#track_rdc .a_side_score').text("673");
	$('#track_rdc .b_side_name').text("Wales");
	$('#track_rdc .b_side_score').text("12");

	var mrdwcStateBuilder = new MrdwcStateBuilder(fakeBrokenJsonJax, fakeWindow);

	mrdwcStateBuilder.buildState(function (state) {
		equal(fakeJaxParameters.url, 'http://mrdwc-query.herokuapp.com/state');

		equal($('#track_rdc .a_side_name').text(), "Ireland");
		equal($('#track_rdc .a_side_score').text(), "673");
		equal($('#track_rdc .b_side_name').text(), "Wales");
		equal($('#track_rdc .b_side_score').text(), "12");

		equal(timeUntilRefresh, 30000);

		start();
	});
});

var fakeJaxParameters, timeUntilRefresh;

var fakeWindow = {
	setTimeout: function (functionname, milliseconds) {
		timeUntilRefresh = milliseconds;
	}

};

var fakeBrokenJax = function (parameters) {
	fakeJaxParameters = parameters;

	var fakeXhr = {
		status: 500,
		responseText: JSON.stringify({})
	};

	parameters.complete(fakeXhr, "error");
}

var fakeBrokenJsonJax = function (parameters) {
	fakeJaxParameters = parameters;

	var fakeXhr = {
		status: 200,
		responseText: "Not JSON"
	};

	parameters.complete(fakeXhr, "success");
}