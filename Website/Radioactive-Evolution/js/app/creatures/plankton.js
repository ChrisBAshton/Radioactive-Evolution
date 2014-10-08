define(['bootstrap', 'creatures/_creature', 'module/model/countdown'], function (bs, Creature, countdown) {

	/**
	* Defines a plankton.
	*
	* @class Plankton
	* @extends Creature
	* @constructor
	*/
	var Plankton = function () {
        var self = this;
        bs.extend(Creature, this);

		/**
		* Resets all of the plankton's variables
		*
		* @method reset
		*/
		this.reset = function() {
			this.x = Math.floor(Math.random() * bs.config.canvas.width);
			this.y = Math.floor(Math.random() * (bs.config.canvas.height-bs.config.canvas.elements.water-(bs.config.canvas.height-bs.config.canvas.elements.sand)))+bs.config.canvas.elements.water;
			this.width = 5;
			this.height = 5;
			this.color = "green";
		}

		/**
		* Make the plankton flash green. It's radioactive, you know.
		*
		* @method glow
		*/
		this.glow = function() {
			this.color = (countdown.secondsLeft() % 2 == 0) ? "green":"lime";
		}

		/**
		* Plankton aren't fish, so we override the Creature draw() method to draw
		* something more plankton-like.
		*
		* @override
		* @method draw
		*/
		this.draw = function() {
			this.context.fillStyle = this.color;
			this.context.beginPath();
			this.context.arc(this.x, this.y, (this.width/2), 0, 2 * Math.PI, false);
			this.context.closePath();
			this.context.fill();
		}

		/**
		* Makes the plankton float around the water a little.
		*
		* @method move
		*/
		this.move = function() {
			var random = Math.random() * 100;
			// 30% chance of movement, to ensure that movement isn't too frantic.
			if(random > 30) {
				// choose direction
				var move = 0;
				var direction = Math.random() * 100;
				if(direction > 50) {
					move = 1;
				} else {
					move = -1;
				}
				
				// move plankton
				if(random > 60) {
					this.x += move;
				} else {
					this.y += move;
				}
			}
			
			// check plankton isn't out of bounds
			if(this.x > bs.config.canvas.width) {
				this.x--;
			} else if(this.x < 0) {
				this.x++;
			}
			if(this.y > bs.config.canvas.height) {
				this.y--;
			} else if(this.y <= bs.config.canvas.elements.water) {
				this.y++;
			} else if(this.y >= bs.config.canvas.elements.sand) {
				this.y--;
			}
		}

		self.reset();
	}

	return Plankton;

});