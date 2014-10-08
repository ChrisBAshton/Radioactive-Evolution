define(['bootstrap'], function (bs) {

	/**
	* A creature is a "living" thing that exists within a player's level.
	* 
	* This class is an abstract Creature, defining attributes and methods shared between all menus that extend it.
	*
	* @class Creature
	* @constructor
	*/
	var Creature = function () {
		
		this.context = bs.canvas.getContext("2d");

		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.color = "white";
		this.eyecolor = "black";

		/**
		* Returns the x co-ordinate of the creature.
		*
		* @method getX
		* @return {Number}	The x co-ordinate
		*/
		this.getX = function() {
			return this.x;
		}

		/**
		* Returns the y co-ordinate of the creature.
		*
		* @method getY
		* @return {Number}	The y co-ordinate
		*/
		this.getY = function() {
			return this.y;
		}

		/**
		* Returns the width of the creature.
		*
		* @method getWidth
		* @return {Number}	The creature's width
		*/
		this.getWidth = function() {
			return this.width;
		}

		/**
		* Returns the height of the creature.
		*
		* @method getHeight
		* @return {Number}	The creature's height
		*/
		this.getHeight = function() {
			return this.height;
		}

		/**
		* Draws the creature. Assumes that the creature is a fish shape.
		*
		* @method draw
		*/
		this.draw = function() {
			
			// draw the body
			this.context.fillStyle = this.color;
			this.drawEllipse((this.x - (this.width/2)), (this.y - (this.height/2)), this.width, this.height);
			this.context.fill();
			// draw the eye in different positions depending on direction
			var eye_x = (this.direction == "left") ? (this.x - (this.width/4)):(this.x + (this.width/4));
			this.context.beginPath();
			this.context.arc(eye_x, this.y, 2, 0, 2 * Math.PI, false);
			this.context.fillStyle = this.eyecolor;
			this.context.closePath();
			this.context.fill();
			
			// draw the tail
			this.context.fillStyle = this.color;
			var temp = (this.direction == "left") ? (this.width):(-(this.width));
			this.context.beginPath();
			this.context.moveTo((this.x + temp), this.y);
			this.context.lineTo((this.x + temp), (this.y - (this.height)/2));
			this.context.lineTo(this.x, this.y);
			this.context.lineTo((this.x + temp), this.y);
			this.context.closePath();
			this.context.fill();
			this.context.beginPath();
			this.context.moveTo((this.x + temp), this.y);
			this.context.lineTo((this.x + temp), (this.y + (this.height)/2));
			this.context.lineTo(this.x, this.y);
			this.context.lineTo((this.x + temp), this.y);
			this.context.closePath();
			this.context.fill();
			
		}

		/**
		* Draws an ellipse, as a circle isn't very realistic for a fish!
		* Code taken from the following link:
		* http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
		*
		* @method drawEllipse
		* @param {Number} x		The creature's x co-ordinate
		* @param {Number} y		The creature's y co-ordinate
		* @param {Number} w		The creature's width
		* @param {Number} h		The creature's height
		*/
		this.drawEllipse = function (x, y, w, h) {
			var kappa = .5522848,
			  ox = (w / 2) * kappa, // control point offset horizontal
			  oy = (h / 2) * kappa, // control point offset vertical
			  xe = x + w,           // x-end
			  ye = y + h,           // y-end
			  xm = x + w / 2,       // x-middle
			  ym = y + h / 2;       // y-middle

			this.context.lineWidth = 2;
			this.context.strokeStyle="black";
			this.context.beginPath();
			this.context.moveTo(x, ym);
			this.context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
			this.context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
			this.context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
			this.context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
			this.context.closePath();
			this.context.stroke();
		}
	}

	return Creature;

});