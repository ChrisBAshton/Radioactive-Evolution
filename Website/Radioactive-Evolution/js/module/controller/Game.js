define(['module/controller/pubsub', 'module/controller/Achievements', 'module/view/Painter', 'module/model/Countdown', 'module/model/Level'], function (pubsub, achievements, Painter, countdown, level) {

	var Game = function () {

		var self = this,
			fish = new Array(),
			loop;

		this.init = function () {
			_listen();
			this.reset();
		};

		var _listen = function () {
			pubsub.addListener('regame:game:reset', function () {
				self.reset();
			});
			pubsub.addListener('regame:game:start', function () {
				self.start();
			});
			pubsub.addListener('regame:game:stop', function () {
				self.stop();
			});
			pubsub.addListener('regame:game:pause', function () {
				self.pause();
			});
			pubsub.addListener('regame:game:resume', function () {
				self.resume();
			});
		};

		/**
		* Called before stop_game(). Resets all of the vital game variables, including
		* level, XP earned, etc.
		*
		* @method reset_game
		*/
		this.reset = function () {
			// reset level variables
			notification = "";
			xp = 0;
			final_score = 0;
			fish_killed = 0;
			//level = 1;
		}

		/**
		* Starts the game, not necessarily from scratch. This method is called both from the main
		* menu when a game is first started, and from the level menu when the user chooses to progress
		* to the next level.
		*
		* @method start_game
		*/
		this.start = function () {
			// check achievements have been achieved
			achievements.check();
			// hide the cursor
			Painter.changeCursor("none");
			// start game animation
			loop = setInterval(function(){level.animate()}, countdown.getFrameInterval());
			
			// generate fish and plankton
			level.populate();
			// reset countdown timer
			countdown.reset();

			// start background noise
			//sound_bg.play();
			// draw the first game frame
			Painter.redraw();
		}

		/**
		* Stops the game, either from the user dying or the user reaching the LevelMenu. Does
		* the same calculations either way.
		* Stops game procedure and draws the appropriate menu.
		*
		* @method stop_game
		*/
		this.stop = function () {
			// stop background noise
			sound_bg.currentTime = 0;
			sound_bg.pause();
			// stop animation
			clearInterval(loop);
			// check for any new achievements gained
			checkAchievements();
			// give the user their cursor back!
			Painter.changeCursor("default");
			// draw the menu
			// glitch - for some obscure reason, calling menu.draw() directly doesn't work 
			// in this instance, so we get the setTimeout function to call it
			setTimeout(function(){menu.draw();}, 0);
		}

		/**
		* Pauses the game and brings up the help menu.
		*
		* @method pause_game
		*/
		this.pause = function () {
			// stop animation
			clearInterval(loop);
			// create help menu
			menu = new HelpMenu();
			// draw menu
			menu.draw();
		}

		/**
		* Resumes the game, hiding the help menu and restarting the gaming animation.
		*
		* @method resume_game()
		*/
		this.resume = function() {
			// resume animation
			loop = setInterval(function(){level.animate()}, countdown.getFrameInterval());
			// remove menu
			menu = null;
			// hide cursor
			Painter.changeCursor("none");
			// paint game
			painter.redraw();
		}

	};

	return new Game();
});