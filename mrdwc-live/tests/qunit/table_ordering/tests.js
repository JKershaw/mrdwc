asyncTest('After table has been re-ordered, its in the right order of wins', 8, function () {

	equal($("table#Red_table > tbody > tr:nth-child(2) > .group_team_name").html(), "BEL");
	equal($("table#Red_table > tbody > tr:nth-child(3) > .group_team_name").html(), "CAN");
	equal($("table#Red_table > tbody > tr:nth-child(4) > .group_team_name").html(), "IRE");
	equal($("table#Red_table > tbody > tr:nth-child(5) > .group_team_name").html(), "ENG");

	reorderTable("Red_table", function () {
		equal($("table#Red_table > tbody > tr:nth-child(2) > .group_team_name").html(), "IRE");
		equal($("table#Red_table > tbody > tr:nth-child(3) > .group_team_name").html(), "CAN");
		equal($("table#Red_table > tbody > tr:nth-child(4) > .group_team_name").html(), "BEL");
		equal($("table#Red_table > tbody > tr:nth-child(5) > .group_team_name").html(), "ENG");

		start();
	})

});

asyncTest('After table has been re-ordered, its in the right order alphabetically', 4, function () {

	reorderTable("Blue_table", function () {
		equal($("table#Blue_table > tbody > tr:nth-child(2) > .group_team_name").html(), "C");
		equal($("table#Blue_table > tbody > tr:nth-child(3) > .group_team_name").html(), "D");
		equal($("table#Blue_table > tbody > tr:nth-child(4) > .group_team_name").html(), "A");
		equal($("table#Blue_table > tbody > tr:nth-child(5) > .group_team_name").html(), "B");

		start();
	})

});

asyncTest('After table has been re-ordered, its in the right order with score dif', 4, function () {

	reorderTable("Green_table", function () {
		equal($("table#Green_table > tbody > tr:nth-child(2) > .group_team_name").html(), "D");
		equal($("table#Green_table > tbody > tr:nth-child(3) > .group_team_name").html(), "C");
		equal($("table#Green_table > tbody > tr:nth-child(4) > .group_team_name").html(), "A");
		equal($("table#Green_table > tbody > tr:nth-child(5) > .group_team_name").html(), "B");

		start();
	})

});