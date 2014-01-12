define(['module/model/Layout'], function (layout) {


/**
* Defines a fish.
*
* @class Fish
* @extends Creature
* @constructor
*/
var Fish = function () {
	// call the parent constructor
	Creature.call(this);
	// set properties
	this.reset();
}

// inherit from Creature
Fish.prototype = Object.create(Creature.prototype);

/**
* Resets all of the fish's variables
*
* @method reset
*/
Fish.prototype.reset = function() {
	var widths = new Array(25, 40, 65, 100, 140);
	var speeds = new Array(1,2);
	var ranges = new Array(120,140,160,180,200,220);
	// these colors are picked from images of real fish!
	var colors = new Array("#FF9233", "#00FF9C", "#F2530F", "#2E2B3E", "#FE5D62", "#E7E8ED", "#FBF221", "#9D48C9");
	
	// appearance
	this.width = widths[Math.floor(Math.random()*widths.length)];
	this.height = Math.floor(this.width/2);
	this.color = colors[Math.floor(Math.random()*colors.length)];
	// set eye color, making sure it's different from the body color
	this.eyecolor = this.color;
	do {
		this.eyecolor = colors[Math.floor(Math.random()*colors.length)];
	} while(this.eyecolor == this.color);
	// technical abilities
	this.xp = Math.floor((this.width + this.height)/20);
	this.speed = speeds[Math.floor(Math.random()*speeds.length)];
	this.range = ranges[Math.floor(Math.random()*ranges.length)];
	
	// position
	var spawningOnUser = true;
	do {
		// give the fish some coordinates
		this.y = Math.floor(Math.random() * (layout.getHeight()-layout.getWaterLevel()-(layout.getHeight()-layout.getSandLevel())))+layout.getWaterLevel();
		var dir = Math.random();	// come from right or left, 50/50 chance
		this.x = (dir > 0.5) ? 0:layout.getWidth();
		// check if fish has spawned on top of user
		if(!collision(this, user)) {
			// fish hasn't spawned on user, so these coordinates are fine
			spawningOnUser = false;
		}	
	} while(spawningOnUser);
	// miscellaneous
	this.direction = (this.x == 0) ? "right":"left";
	// give him life!
	this.alive = true;
}

/**
* Returns the XP that the fish is worth if eaten by the user.
*
* @method getXP
* @return {Number}	The XP that the fish is worth.
*/
Fish.prototype.getXP = function() {
	return this.xp;
}

/**
* Checks the fish's status: dead/alive.
*
* @method isAlive
* @return {Boolean}	True if the fish is alive
*/
Fish.prototype.isAlive = function() {
	return this.alive;
}

/**
* If the fish hits poison, it invokes this function.
* Kills the fish and changes its appearance to be more... dead.
*
* @method eatPoison
*/
Fish.prototype.eatPoison = function() {
	this.alive = false;
	this.color = "#0000FF";
	this.eyecolor = "#FFFFFF";
}

/**
* Moves the fish, taking into account its environment. For example,
* smaller fish will swim away from the user, larger fish will swim 
* towards the user, and fish who aren't in range of the user will
* merrily swim back and forth with no purpose.
*
* @method move
*/
Fish.prototype.move = function() {
	// only let the fish move if it's alive- obviously!
	if(this.alive) {
		// check user is near fish. This is the beauty of x,y being the CENTRAL coordinates
		if( !user.camouflaged() && (Math.abs(this.x - user.getX()) < this.range) && (Math.abs(this.y - user.getY()) < this.range) ) {
		
			// fish is near the user
			
			if((this.width * this.height) > (user.getWidth() * user.getHeight())) {
				// fish is bigger than the user and will hunt him down!
				
				if( Math.abs(this.x - user.getX()) <= this.speed) {
					// x-axis is sufficiently close. 
					// Set to user's x to avoid "jittery" effect caused by this.speed being more than the difference
					this.x = user.getX();
				} else if(this.x < user.getX()) {
					this.direction = "right";
					this.x += this.speed;
				} else if(this.x > user.getX()) {
					this.direction = "left";
					this.x -= this.speed;
				}
				
				if( Math.abs(this.y - user.getY()) <= this.speed) {
					// y-axis is sufficiently close. set to user's y to avoid "jittery" effect.
					this.y = user.getY();
				} else if(this.y < user.getY()) {
					this.y += this.speed;
				} else if(this.y > user.getY()) {
					this.y -= this.speed;
				}
			} else {
				// user is bigger than the fish, so fish will swim away
				if(this.x < user.getX()) {
					this.direction = "left";
					this.x -= this.speed;
				} else if(this.x > user.getX()) {
					this.direction = "right";
					this.x += this.speed;
				} else {
					// fish is at same x level as user and will escape in the direction it is travelling
					if(this.direction == "left") {
						this.x -= this.speed;
					} else {
						this.x += this.speed;
					}
				}
				
				if(this.y < user.getY()) {
					this.y -= this.speed;
				} else if(this.y >= user.getY()) {
					this.y += this.speed;
				}
			}
		} else {
			// fish hasn't seen the user so will continue on its journey
			if(this.direction == "left") {
				this.x -= this.speed;
			} else {
				this.x += this.speed;
			}
		}
		
		// do some limit checking to ensure fish stays within confines of the water
		if(this.x <= 0) {
			this.direction = "right";
			this.x = 0;
		} else if(this.x >= layout.getWidth()) {
			this.direction = "left";
			this.x = layout.getWidth();
		}
		// if fish has followed user "above" water level (user has flying fish ability) then force fish below water level
		if(this.y <= layout.getWaterLevel()) {
			this.y = layout.getWaterLevel();
		} else if(this.y >= layout.getSandLevel()) {
			this.y = layout.getSandLevel();
		}
	} else {
		// fish is dead- make it float to the surface
		if(this.y < layout.getWaterLevel()) {
			this.y++;
		} else if(this.y > layout.getWaterLevel()) {
			this.y--;
		}
	}
}

	return Fish;

});