define([], function () {

	var Achievements = function () {

		var achievements;

		/**
		* Checks local storage for previously achieved achievements.
		*
		* @method loadAchievements
		*/
		this.load = function () {

			var title,
				isAlreadyAchieved;

			_initialiseAchievements();
			
			for(var i = 0; i < achievements.length; i++) {

				title = achievements[i].getTitle();
				isAlreadyAchieved = _isAchieved(title);
				
				if(isAlreadyAchieved) {
					achievements[i].setAchieved(true);
				} else {
					// first time user, so achievements haven't been earned- save this in local storage
					localStorage[title] = false;
				}
			}
		}

		/**
		 * Initialises the array of achievements with Achievement objects.
		 */
		var _initialiseAchievements = function () {
			achievements = new Array(
				new Level3(),
				new Level5(),
				new Level10(),
				new EarlyDeath(),
				new BigEarner(),
				new FishKiller(),
				new AllGrowth(),
				new AllPoison(),
				new AllUpgrades()
			);
		};

		/**
		 * Checks if the given achievement is already in local storage.
		 *
		 * @param achievementTitle {String} The name of the achievement.
		 * @return {Boolean} 				True if set, false if not.
		 */
		var _isAchieved = function (achievementTitle) {
			return localStorage[achievementTitle] == null ? false:true;
		};

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