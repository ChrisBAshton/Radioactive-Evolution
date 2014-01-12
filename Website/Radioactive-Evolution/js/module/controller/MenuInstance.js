define(['module/controller/pubsub', 'module/view/Menu_Main', 'module/view/Menu_Level', 'module/view/Menu_Death', 'module/view/Menu_Achievements', 'module/view/Menu_Help'], function (pubsub, MainMenu, LevelMenu, DeathMenu, AchievementsMenu, HelpMenu) {

	var MenuInstance = function () {

		var instance = null,
			self = this;

		this.init = function () {
			_listen();
			self.set('main');
		};

		var _listen = function () {
			pubsub.addListener('regame:menu:new', function (menu) {
				self.set(menu);
			});
		}

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

			instance.draw();
		};

		this.get = function () {
			return instance;
		}

	};

	return new MenuInstance();
});