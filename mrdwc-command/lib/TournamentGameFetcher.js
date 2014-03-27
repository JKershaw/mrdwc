var TournamentGameFetcher = function (request) {

	function fetch(tournamentID, callback) {

		var rdNationUri = "https://api.rdnation.com/LiveGame/Tournament?id=" + tournamentID;

		request(rdNationUri, function (error, response, body) {

			var state = [];

			if (!error && response && response.statusCode == 200) {

				try {
					var rdNation_tournament_state = JSON.parse(body);

					for (var i = 0; i < rdNation_tournament_state.Tournament.Games.length; i++) {

						var game = rdNation_tournament_state.Tournament.Games[i];
						var title = game.Team1Name + " vs " + game.Team2Name + " (" + game.Team1ScoreTotal + " : " + game.Team2ScoreTotal + ")";

						var game_info = {
							gameID: game.GameId,
							title: title
						};
						state.push(game_info);
					}

				} catch (err) {
					console.log("======= Error tournament state", err);
				}
			}
			callback(state);
		});
	}

	return {
		fetch: fetch
	};
};

module.exports = TournamentGameFetcher;