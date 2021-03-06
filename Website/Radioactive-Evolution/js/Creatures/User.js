/**
* Defines a User.
*
* @class User
* @extends Creature
* @constructor
*/
function User() {
	// call the parent constructor
	Creature.call(this);
	// set up for keyboard control
	this.keyboardMovement = "NO_KEY_DOWN";
	// set properties
	this.reset();
}

// inherit from Creature
User.prototype = Object.create(Creature.prototype);

/**
* Resets all of the user's variables
*
* @method reset
*/
User.prototype.reset = function() {
	this.width = 20;
	this.height = 10;
	this.direction = "right";
	this.color = "red";
	this.currentlyCamouflaged = false;
	// set evolutionary upgrades
	upgrade_camouflage = new UpgradeCamouflage();
	upgrade_flying = new UpgradeFlyingFish();
	upgrade_grow = new UpgradeGrow();
	upgrade_murkyWater = new UpgradeMurkyWater();
	upgrade_poison = new UpgradePoison();
}

/**
* Sets the width and height of the user.
*
* @method setSize
* @param {Number} width		Sets the width of the user
* @param {Number} height	Sets the height of the user
*/
User.prototype.setSize = function(width, height) {
	this.width = width;
	this.height = height;
}

/**
* Moves the user to the supplied co-ordinates.
*
* @method move
* @param {Number} x		The x co-ordinate
* @param {Number} y		The y co-ordinate
*/
User.prototype.move = function(x,y) {

	// calculate direction fish is facing
	if(x < this.x) {
		this.direction = "left";
	} else if (x > this.x) {
		this.direction = "right";
	}
	
	// impose limits on y-axis
	if(y > layout.getSandLevel()) {
		this.y = layout.getSandLevel();
	} else if(y > layout.getWaterLevel()) {
		this.y = y;
	} else if(y <= layout.getWaterLevel()) {
		// apply flying fish ability if user has unlocked it
		if(upgrade_flying.getLevel() == 1) {
			if(y >= layout.getSystemLevel()) {
				this.y = y;
			} else {
				this.y = layout.getSystemLevel();
			}
		} else {
			this.y = layout.getWaterLevel();
		}
	}
	// impose limits on x-axis
	if(x <= 0) {
		this.x = 0;
	} else if (x >= layout.getWidth()) {
		this.x = layout.getWidth();
	} else {
		this.x = x;
	}
	
	// apply camouflage if user has unlocked it and is near sand
	if(upgrade_camouflage.getLevel() == 1 && Math.abs((this.y - layout.getSandLevel())) < 6) {
		this.currentlyCamouflaged = true;
		this.color = "#CEB499";
	} else {
		this.currentlyCamouflaged = false;
		this.color = "red";
	}
}

/**
* Returns true if the user is currently camouflaged in the sand.
* Nice, efficient method for determining fish behaviour.
* 
* @method camouflaged
* @return {Boolean} 	True if currently camouflaged
*/
User.prototype.camouflaged = function() {
	return this.currentlyCamouflaged;
}

/*
	Below are some keyboard control functions. They've been implemented at best as possible, but are by no means perfect.
	Mouse control is definitely the recommended means of interaction.
*/

/**
* Updates the user's direction
*
* @method keyboardControl
* @param {String} direction		The direction for the user to travel in
*/
User.prototype.keyboardControl = function(direction) {
	// check if user is already moving in a direction- this allows for diagonal movement.
	if(this.keyboardMovement != "NO_KEY_DOWN") {
		if(this.keyboardMovement == "w") {
			if(direction == "a") {
				this.keyboardMovement = "northwest";
			} else if(direction == "d") {
				this.keyboardMovement = "northeast";
			} else {
				this.keyboardMovement = direction;
			}
		} else if(this.keyboardMovement == "s") {
			if(direction == "a") {
				this.keyboardMovement = "southwest";
			} else if(direction == "d") {
				this.keyboardMovement = "southeast";
			} else {
				this.keyboardMovement = direction;
			}
		} else if(this.keyboardMovement == "a") {
			if(direction == "w") {
				this.keyboardMovement = "northwest";
			} else if(direction == "s") {
				this.keyboardMovement = "southwest";
			} else {
				this.keyboardMovement = direction;
			}
		} else if(this.keyboardMovement == "d") {
			if(direction == "w") {
				this.keyboardMovement = "northeast";
			} else if(direction == "s") {
				this.keyboardMovement = "southeast";
			} else {
				this.keyboardMovement = direction;
			}
		} else {
			this.keyboardMovement = direction;
		}
	} else {
		// user was static before this keypress so should go in the given direction
		this.keyboardMovement = direction;
	}
}

/**
* Checks which way the user is moving (if any) as a result of keyboard presses,
* then moves in that direction.
*
* @method keyboardMove
*/
User.prototype.keyboardMove = function() {
	var speed = 4;
	switch(this.keyboardMovement) {
		case "NO_KEY_DOWN":
			break;
		case "w":
			this.move(this.x, this.y-speed);
			break;
		case "northwest":
			this.move(this.x-speed, this.y-speed);
			break;
		case "northeast":
			this.move(this.x+speed, this.y-speed);
			break;
		case "s":
			this.move(this.x, this.y+speed);
			break;
		case "southwest":
			this.move(this.x-speed, this.y+speed);
			break;
		case "southeast":
			this.move(this.x+speed, this.y+speed);
			break;
		case "a":
			this.move(this.x-speed, this.y);
			break;
		case "d":
			this.move(this.x+speed, this.y);
			break;
		default:
			console.log("Error- invalid movement key entered.");
	}	
}

/**
* Stops the user's movement. (Called when no key is being pressed).
*
* @method keyboardPause
*/
User.prototype.keyboardPause = function() {
	this.keyboardMovement = "NO_KEY_DOWN";
}