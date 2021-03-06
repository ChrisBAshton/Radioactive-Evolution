/**
* Defines a plankton.
*
* @class Plankton
* @extends Creature
* @constructor
*/
function Plankton() {
	// call the parent constructor
	Creature.call(this);
	// set properties
	this.reset();
}

// inherit from Creature
Plankton.prototype = Object.create(Creature.prototype);

/**
* Resets all of the plankton's variables
*
* @method reset
*/
Plankton.prototype.reset = function() {
	this.x = Math.floor(Math.random() * layout.getWidth());
	this.y = Math.floor(Math.random() * (layout.getHeight()-layout.getWaterLevel()-(layout.getHeight()-layout.getSandLevel())))+layout.getWaterLevel();
	this.width = 5;
	this.height = 5;
	this.color = "green";
}

/**
* Make the plankton flash green. It's radioactive, you know.
*
* @method glow
*/
Plankton.prototype.glow = function() {
	this.color = (countdown.secondsLeft() % 2 == 0) ? "green":"lime";
}

/**
* Plankton aren't fish, so we override the Creature draw() method to draw
* something more plankton-like.
*
* @override
* @method draw
*/
Plankton.prototype.draw = function() {
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.x, this.y, (this.width/2), 0, 2 * Math.PI, false);
	context.closePath();
	context.fill();
}

/**
* Makes the plankton float around the water a little.
*
* @method move
*/
Plankton.prototype.move = function() {
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
	if(this.x > layout.getWidth()) {
		this.x--;
	} else if(this.x < 0) {
		this.x++;
	}
	if(this.y > layout.getHeight()) {
		this.y--;
	} else if(this.y <= layout.getWaterLevel()) {
		this.y++;
	} else if(this.y >= layout.getSandLevel()) {
		this.y--;
	}
}