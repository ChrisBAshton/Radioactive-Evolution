// @TODO - use requestAnimationFrame instead: https://developer.mozilla.org/en/docs/Web/API/window.requestAnimationFrame


define(['bootstrap', 'module/controller/achievements', 'module/model/countdown', 'module/model/level'], function (bs, achievements, countdown, level) {

	var Game = function () {

		var self = this;

		this.playing = false;

		this.init = function () {
			_listen();
			self.reset();
		};

		var _listen = function () {
			bs.pubsub.addListener('regame:game:reset', function (callback) {
				self.reset();
				if (typeof callback === 'function') {
					callback();
				}
				self.playing = false;
			});
			bs.pubsub.addListener('regame:game:start', function () {
				self.start();
				self.playing = true;
			});
			bs.pubsub.addListener('regame:game:stop', function () {
				self.stop();
				self.playing = false;
			});
			bs.pubsub.addListener('regame:game:togglePause', function () {
				
				if (self.playing) {
					self.pause();
					self.playing = false;
				} else {
					self.resume();
					self.playing = true;
				}
			});
		};

		/**
		* Called before stop_game(). Resets all of the vital game variables, including
		* level, XP earned, etc.
		*
		* @method reset_game
		*/
		this.reset = function () {
			level.reset();
		}

		/**
		* Starts the game, not necessarily from scratch. This method is called both from the main
		* menu when a game is first started, and from the level menu when the user chooses to progress
		* to the next level.
		*
		* @method start_game
		*/
		this.start = function () {
			achievements.check();
			startAnimating();
			countdown.reset();
		}

		/**
		* Stops the game, either from the user dying or the user reaching the LevelMenu. Does
		* the same calculations either way.
		* Stops game procedure and draws the appropriate menu.
		*
		* @method stop_game
		*/
		this.stop = function () {
			stopAnimating();
			achievements.check();
		}

		/**
		* Pauses the game and brings up the help menu.
		*
		* @method pause_game
		*/
		this.pause = function () {
			stopAnimating();
			bs.pubsub.emitEvent('regame:menu:new', ['help']);
		}

		/**
		* Resumes the game, hiding the help menu and restarting the gaming animation.
		*
		* @method resume_game()
		*/
		this.resume = function() {
			bs.pubsub.emitEvent('regame:game:resume');
			startAnimating();
		}

		var startAnimating = function () {
			self.loop = setInterval(
				function() {
					level.animate();
				},
				countdown.getFrameInterval()
			);
		};

		var stopAnimating = function () {
			clearInterval(self.loop);
		};

	};

	return new Game();
});
