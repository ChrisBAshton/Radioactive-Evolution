define(['bootstrap', 'module/controller/achievements', 'module/controller/game', 'module/controller/menu_instance', 'module/controller/audio_controller', 'IO/event_listener', 'IO/keyboard_control'], function (bs, achievements, game, menu, sound, event) {

	var App = function () {

		/**
		* Starts the application. Loads the achievements stored in HTML5 local storage,
		* sets the game variables and creates and draws the main menu.
		*
		* @method start_app
		*/
		this.init = function (canvas) {

			// listen for mouse movements/clicks
		    canvas.addEventListener("mousemove",event.mouseMoved,false);
		    canvas.addEventListener("mousedown",event.mouseClicked,false);

			achievements.load();
			game.init();
			menu.init();
			sound.init();
		};

	};

	return new App();
});