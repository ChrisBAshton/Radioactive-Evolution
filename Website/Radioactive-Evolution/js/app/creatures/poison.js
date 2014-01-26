/**
* Defines a poison.
*
* @class Poison
* @extends Creature
* @constructor
* @param {Number} x		x co-ordinate of the poison
* @param {Number} y		y co-ordinate of the poison
*/
function Poison(x,y) {
	// call the parent constructor
	Creature.call(this);
	// set properties
	this.x = x;
	this.y = y;
	this.width = 5;
	this.height = 5;
	this.color = "red";
}

// inherit from Creature
Poison.prototype = Object.create(Creature.prototype);

/**
* Override the Creature draw() method.
*
* @override
* @method draw
*/
Poison.prototype.draw = function() {
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
Poison.prototype.move = function() {
	var random = Math.random() * 100;
	// 30% chance of movement
	if(random > 30) {
		// choose direction
		var move = 0;
		var direction = Math.random() * 100;
		if(direction > 50) {
			move = 1;
		} else {
			move = -1;
		}
		
		// move poison
		if(random > 60) {
			this.x += move;
		} else {
			this.y += move;
		}
	}
	
	// check poison isn't out of bounds
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