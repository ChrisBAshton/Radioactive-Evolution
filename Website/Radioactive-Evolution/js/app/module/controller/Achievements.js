define(['achievements/level_3', 'achievements/level_5', 'achievements/level_10', 'achievements/all_growth', 'achievements/all_poison', 'achievements/all_upgrades', 'achievements/big_earner', 'achievements/early_death', 'achievements/fish_killer'], function (Level3, Level5, Level10, AllGrowth, AllPoison, AllUpgrades, BigEarner, EarlyDeath, FishKiller) {

	var Achievements = function () {

		var self = this,
			achievements;

		/**
		 * Initialises the array of achievements with Achievement objects.
		 */
		var _instantiateAchievements = function () {
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
		* Checks local storage for previously achieved achievements.
		*
		* @method loadAchievements
		*/
		this.load = function () {

			_instantiateAchievements();

			var allAchievements = achievements.length;

			while (allAchievements-- > 0) {
				achievements[allAchievements].setup();
			}
		}

		/**
		* Loop through all achievements and check each of them to see if they've been achieved.
		*
		* @method check
		*/
		this.check = function () {
			for(var i = 0; i < achievements.length; i++) {
				// only check achievements that have not yet been achieved
				if(!achievements[i].isAlreadyAchieved()) {
					achievements[i].checkAchieved();
				}
			}
		}

		/**
		* Get instance of the achievement, given its name.
		*
		* @method getAchievementInstance
		* @param {String} achievementName	Name of the achievement
		* @return {Achievement|Null} 		Instantiated achievement object.
		*/
		this.getAchievementInstance = function(achievementName) {
			for(var i = 0; i < achievements.length; i++) {
				if(achievements[i].getTitle() == achievementName) {
					return achievements[i];
				}
			}
			return null
		}

		this.reset = function () {
			localStorage.clear();
			self.load();
		}
	}

	return new Achievements();
});