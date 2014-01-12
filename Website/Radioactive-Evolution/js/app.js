define(['module/controller/Achievements', 'module/controller/Game', 'module/controller/MenuInstance', 'IO/EventListener'], function (achievements, game, menu, event) {

	var App = function () {

		// listen for mouse movements/clicks
	    canvas.addEventListener("mousemove",event.mouseMoved,false);
	    canvas.addEventListener("mousedown",event.mouseClicked,false);
	    // sound event listener
	    // sound_bg.addEventListener('ended', function() {
	    //  this.currentTime = 0;
	    //  this.play();
	    // }, false);

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