define(['module/view/Menu_Main', 'module/view/Menu_Level', 'module/view/Menu_Death', 'module/view/Menu_Achievements', 'module/view/Menu_Help'], function (MainMenu, LevelMenu, DeathMenu, AchievementsMenu, HelpMenu) {

	var MenuInstance = function () {

		var instance = null;

		this.set = function (menu) {
			switch (menu) {
			case 'main':
				instance = new MainMenu();
				break;
			case 'level':
				instance = new LevelMenu();
				break;
			case 'death':
				instance = new DeathMenu();
				break;
			case 'achievements':
				instance = new AchievementsMenu();
				break;
			case 'help':
				instance = new HelpMenu();
				break;
			}
		};

		this.get = function () {
			return instance;
		}

		this.init = function () {
			this.set('main');
			instance.draw();
		};

	};

	return new MenuInstance();
});