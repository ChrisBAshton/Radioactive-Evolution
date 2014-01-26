define(['module/controller/Achievements', 'module/controller/Game', 'module/controller/MenuInstance', 'IO/EventListener', 'IO/Sound'], function (achievements, game, menu, event, sound) {

	var App = function () {

		// listen for mouse movements/clicks
	    canvas.addEventListener("mousemove",event.mouseMoved,false);
	    canvas.addEventListener("mousedown",event.mouseClicked,false);

		/**
		* Starts the application. Loads the achievements stored in HTML5 local storage,
		* sets the game variables and creates and draws the main menu.
		*
		* @method start_app
		*/
		this.init = function () {
			achievements.load();
			game.init();
			menu.init();
			sound.init();
		};

	};

	return new App();
});