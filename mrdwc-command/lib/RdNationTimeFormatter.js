var RdNationTimeFormatter = function () {

	function format(input_time_ms) {
		if (!input_time_ms) {
			input_time_ms = 0;
		}

		var input_time = Math.round(input_time_ms / 1000);
		var seconds = input_time % 60;

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		var minutes = Math.floor(input_time / 60);
		var outputString = minutes + ":" + seconds;

		return outputString;
	}
	return {
		format: format
	}
}

module.exports = RdNationTimeFormatter;