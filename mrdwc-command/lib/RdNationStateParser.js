var RdNationTimeFormatter = require("./RdNationTimeFormatter")

var RdNationStateParser = function () {

	var rdNationTimeFormatter = new RdNationTimeFormatter();

	function parse(rdnState) {

		var team_a_name = rdnState.game.Team1Name,
			team_b_name = rdnState.game.Team2Name,
			game_title = team_a_name + " vs " + team_b_name,
			team_a_score = rdnState.game.Team1Score,
			team_b_score = rdnState.game.Team2Score,
			period_number = rdnState.game.PeriodNumber,
			jam_number = rdnState.game.JamNumber,
			period_time = rdNationTimeFormatter.format(rdnState.game.PeriodTimeLeft),
			jam_time = rdNationTimeFormatter.format(rdnState.game.JamTimeLeft);

		return {
			title: game_title,
			a: {
				name: team_a_name,
				score: team_a_score
			},
			b: {
				name: team_b_name,
				score: team_b_score
			},
			period: period_number,
			jam: jam_number,
			time: jam_time,
			period_time: period_time
		};
	}

	return {
		parse: parse
	};
};

module.exports = RdNationStateParser;