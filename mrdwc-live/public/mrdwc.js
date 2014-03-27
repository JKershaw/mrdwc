var MrdwcUi = function (ajax, window) {

	var mrdwcStateBuilder = new MrdwcStateBuilder(ajax, window);

	function refresh(callback) {

		$('#reloading_state').show();

		try {

			mrdwcStateBuilder.buildState(function (state) {

				if (state) {

					$('.track_rdc_title').text(state.tracks.rdc.title);
					$('.track_qss_title').text(state.tracks.qss.title);

					$('#track_rdc .a_side_name').text(state.tracks.rdc.a.name);
					$('#track_rdc .a_side_score').text(state.tracks.rdc.a.score);
					$('#track_rdc .b_side_name').text(state.tracks.rdc.b.name);
					$('#track_rdc .b_side_score').text(state.tracks.rdc.b.score);
					$('#track_rdc .game_period').text(state.tracks.rdc.period);
					$('#track_rdc .game_jam').text(state.tracks.rdc.jam);
					$('#track_rdc .game_time').text(state.tracks.rdc.time);
					$('#track_rdc .game_period_time').text(state.tracks.rdc.period_time);

					$('#track_qss .a_side_name').text(state.tracks.qss.a.name);
					$('#track_qss .a_side_score').text(state.tracks.qss.a.score);
					$('#track_qss .b_side_name').text(state.tracks.qss.b.name);
					$('#track_qss .b_side_score').text(state.tracks.qss.b.score);
					$('#track_qss .game_period').text(state.tracks.qss.period);
					$('#track_qss .game_jam').text(state.tracks.qss.jam);
					$('#track_qss .game_time').text(state.tracks.qss.time);
					$('#track_qss .game_period_time').text(state.tracks.qss.period_time);

					for (var group_id = 0; group_id < state.score.groups.length; group_id++) {
						for (var team_id = 0; team_id < state.score.groups[group_id].teams.length; team_id++) {

							var groupName = state.score.groups[group_id].name,
								teamName = state.score.groups[group_id].teams[team_id].name,
								played = state.score.groups[group_id].teams[team_id].played,
								won = state.score.groups[group_id].teams[team_id].won,
								dif = state.score.groups[group_id].teams[team_id].dif;

							$('.group_' + groupName + ' .' + teamName + ' .group_team_played').text(played);
							$('.group_' + groupName + ' .' + teamName + ' .group_team_won').text(won);
							$('.group_' + groupName + ' .' + teamName + ' .group_team_dif').text(dif);
						}


						reorderTable(groupName + "_table", function () {});
					}

					for (var round_id = 0; round_id < state.score.rounds.length; round_id++) {
						for (var bout_id = 0; bout_id < state.score.rounds[round_id].bouts.length; bout_id++) {

							var boutNumber = state.score.rounds[round_id].bouts[bout_id].number,
								team_a = state.score.rounds[round_id].bouts[bout_id].a,
								team_b = state.score.rounds[round_id].bouts[bout_id].b;

							$('.bout_' + boutNumber + ' .team_a').html(team_a);
							$('.bout_' + boutNumber + ' .team_b').html(team_b);
						}
					}

					$('#qss_button_a').html(state.config.qss_alt_lang);
					$('#rdc_button_a').html(state.config.rdc_alt_lang);


				}

				$('#reloading_state').hide();

				callback();
			});

		} catch (err) {
			if (!err) {
				err = "Unknown error";
			}
			if (window.console && console && console.log) {
				console.log("Error caught: ", err);
			}
			if (Rollbar) {
				Rollbar.error(err);
			}
			callback();
		}
	}

	return {
		refresh: refresh
	};
};

var MrdwcStateBuilder = function (ajax, window) {

	function buildState(callback) {
		getState(function (state) {
			callback(state);
		});

	}

	function getState(callback) {
		ajax({
			url: 'http://mrdwc-query.herokuapp.com/state',
			type: 'GET',
			contentType: 'application/json',
			complete: function (xhr, status) {
				handle_complete(xhr, status, callback);
			}
		});
	}

	function handle_complete(xhr, status, callback) {

		var state = false,
			nextRefreshTime = 30000;

		if (status == "success") {
			try {
				state = JSON.parse(xhr.responseText);
				nextRefreshTime = state.config.refreshWaitTime;
			} catch (err) {
				if (!err) {
					err = "handle_complete had a problem either with JSON.parse or setting nextRefreshTime";
				}
				if (window.console && console && console.log) {
					console.log("Parsing got an error: ", err);
				}
				if (typeof Rollbar !== "undefined") {
					Rollbar.error(err);
				}
			}
		} else {
			if (window.console && console && console.log) {
				console.log("Ajax returned an error: ", status);
			}
			if (typeof Rollbar !== "undefined") {
				Rollbar.error(xhr);
			}
		}

		window.setTimeout(function () {
			refresh(ajax, window, function () {})
		}, nextRefreshTime);

		callback(state);
	}

	return {
		buildState: buildState
	};
};

function refresh(ajax, window, callback) {
	mrdwcUi = new MrdwcUi(ajax, window);
	mrdwcUi.refresh(callback);
};


function reorderTable(tableID, callback) {

	var row_objects = [];

	$("table#" + tableID + " > tbody > tr").each(function () {
		$this = $(this)
		var wins = $this.find(".group_team_won").html();
		var dif = $this.find(".group_team_dif").html();
		var name = $this.find(".group_team_name").html();
		var played = $this.find(".group_team_played").html();

		if (typeof wins !== "undefined") {

			row_objects.push({
				name: name,
				wins: wins,
				dif: dif,
				played: played
			});

			$(this).remove();
		}

	});

	row_objects.sort(function (a, b) {

		if (b.wins != a.wins) {
			return b.wins - a.wins;
		}

		if (b.dif != a.dif) {
			return b.dif - a.dif;
		}

		if (a.name < b.name)
			return -1;
		if (a.name > b.name)
			return 1;

		return 0;
	});

	for (var i = 0; i < row_objects.length; i++) {
		$("table#" + tableID + " > tbody").append("<tr class=\"" + row_objects[i].name + "\"><td class=\"group_team_name\">" + row_objects[i].name + "</td><td class=\"group_team_played\">" + row_objects[i].played + "</td><td class=\"group_team_won\">" + row_objects[i].wins + "</td><td class=\"group_team_dif\">" + row_objects[i].dif + "</td></tr>");
	}

	callback();
}