define(['module/controller/Achievements', 'module/controller/Game', 'module/controller/MenuInstance'], function (achievements, game, menu) {

	var App = function () {

		/**
		* This script defines many important gameplay functions.
		*/

		/**
		* Starts the application. Loads the achievements stored in HTML5 local storage,
		* sets the game variables and creates and draws the main menu.
		*
		* @method start_app
		*/
		this.init = function () {
			// load achievements from HTML5 local storage, if any
			achievements.load();
			// set game variables
			game.reset();
			// load menu
			menu.init();
		};

	};

	return new App();
});