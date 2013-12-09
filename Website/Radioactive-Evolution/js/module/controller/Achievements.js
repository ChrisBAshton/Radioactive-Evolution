define([], function () {

	var Achievements = function () {

		/**
		* Checks local storage for previously achieved achievements.
		*
		* @method loadAchievements
		*/
		this.load = function () {
			achievements = new Array(new Level3(), new Level5(), new Level10(), new EarlyDeath(), new BigEarner(), new FishKiller(), new AllGrowth(), new AllPoison(), new AllUpgrades());
			for(var i = 0; i < achievements.length; i++) {
				// check local storage for achieved achievements
				var savedAchievement = localStorage[achievements[i].getTitle()];
				// first time user, so achievements haven't been earned- save this in local storage
				if(savedAchievement == null) {
					localStorage[achievements[i].getTitle()] = false;
				} else if(savedAchievement == true || savedAchievement == "true") {
					/*
						Cannot set boolean values, but W3C updated the spec in 2009 to accept booleans. I'm implementing
						backwards compatibility.
						http://stackoverflow.com/questions/3263161/cannot-set-boolean-values-in-localstorage
					*/
					// user has achieved achievement in the past, so update the achievement with this.
					achievements[i].setAchieved(true);
				}
			}
		}

		/**
		* Loop through all achievements and check each of them to see if they've been achieved.
		*
		* @method checkAchievements
		*/
		this.check = function () {
			for(var i = 0; i < achievements.length; i++) {
				// only check achievements that have not yet been achieved
				if(!achievements[i].isAchieved()) {
					achievements[i].checkAchieved();
				}
			}
		}
	}

	return new Achievements();
});