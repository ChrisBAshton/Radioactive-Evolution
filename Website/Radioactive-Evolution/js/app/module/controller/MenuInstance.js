define(['bootstrap', 'menu/main', 'menu/level', 'menu/death', 'menu/achievements', 'menu/help'], function (bs, MainMenu, LevelMenu, DeathMenu, AchievementsMenu, HelpMenu) {

	var MenuInstance = function () {

		var instance = null,
			self = this;

		this.init = function () {
			_listen();
			self.set('main');
		};

		var _listen = function () {
			bs.pubsub.addListener('regame:menu:new', function (menu) {
				self.set(menu);
			});
			bs.pubsub.addListener('regame:game:start', function () {
				instance = null;
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

		this.menu = function () {
			return instance;
		}

		this.exists = function () {
			return instance !== null;
		}

	};

	return new MenuInstance();
});