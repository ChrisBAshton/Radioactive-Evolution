define(['bootstrap', 'creatures/_creature', 'creatures/user', '_helpers/object_helper'], function (bs, Creature, user, objects) {

	/**
	* Defines a fish.
	*
	* @class Fish
	* @extends Creature
	* @constructor
	*/
	var Fish = function () {
        var self = this;
        bs.extend(Creature, this);

        var randomElement = function (array) {
        	return array[Math.floor(Math.random() * array.length)];
        };

		/**
		* Resets all of the fish's variables
		*
		* @method reset
		*/
		this.reset = function() {
			var widths = [25, 40, 65, 100, 140],
				speeds = [1,2],
				ranges = [120,140,160,180,200,220],
				// these colors are picked from images of real fish!
				colors = ["#FF9233", "#00FF9C", "#F2530F", "#2E2B3E", "#FE5D62", "#E7E8ED", "#FBF221", "#9D48C9"];
			
			// appearance
			this.width = randomElement(widths);
			this.height = Math.floor(this.width/2);
			this.xp = Math.floor((this.width + this.height)/20);
			this.speed = randomElement(speeds);
			this.range = randomElement(ranges);
			this.color = randomElement(colors);
			// set eye color, making sure it's different from the body color
			do {
				this.eyecolor = randomElement(colors);
			} while (this.eyecolor == this.color);
			
			// @TODO - implement Chris 2014.
			var spawningOnUser = false;//true;
			do {
				// give the fish some coordinates
				this.y = Math.floor(Math.random() * (bs.config.canvas.height-bs.config.canvas.elements.water-(bs.config.canvas.height-bs.config.canvas.elements.sand)))+bs.config.canvas.elements.water;
				var dir = Math.random();	// come from right or left, 50/50 chance
				this.x = (dir > 0.5) ? 0:bs.config.canvas.width;
				// check if fish has spawned on top of user
				if(!objects.collide(self, user)) {
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
		this.getXP = function() {
			return this.xp;
		}

		/**
		* Checks the fish's status: dead/alive.
		*
		* @method isAlive
		* @return {Boolean}	True if the fish is alive
		*/
		this.isAlive = function() {
			return this.alive;
		}

		/**
		* If the fish hits poison, it invokes this function.
		* Kills the fish and changes its appearance to be more... dead.
		*
		* @method eatPoison
		*/
		this.eatPoison = function() {
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
		this.move = function() {
			if (self.alive) {
				makeFishSwim();
			} else {
				makeCarcasFloatToSurface();
			}
			stayInsideThePond();
		}

		var makeFishSwim = function () {
			if (fishCanSeeUser()) {
				reactToTheUser();
			} else {
				swimBackAndForth();
			}
		};

		var makeCarcasFloatToSurface = function () {
			if(self.y < bs.config.canvas.elements.water) {
				self.y++;
			} else if(self.y > bs.config.canvas.elements.water) {
				self.y--;
			}
		};

		// check user is near fish. This is the beauty of x,y being the CENTRAL coordinates
		var fishCanSeeUser = function () {
			return !user.camouflaged() && (Math.abs(self.x - user.getX()) < self.range) && (Math.abs(self.y - user.getY()) < self.range);
		};

		var reactToTheUser = function () {
			if(fishIsBiggerThanUser()) {
				huntUserDown();
			} else {
				swimAwayFromUser();
			}
		};

		var swimBackAndForth = function () {
			// fish hasn't seen the user so will continue on its journey
			if(self.direction == "left") {
				self.x -= self.speed;
			} else {
				self.x += self.speed;
			}
		};

		var stayInsideThePond = function () {
			// do some limit checking to ensure fish stays within confines of the water
			if(self.x <= 0) {
				self.direction = "right";
				self.x = 0;
			} else if(self.x >= bs.config.canvas.width) {
				self.direction = "left";
				self.x = bs.config.canvas.width;
			}
			// if fish has followed user "above" water level (user has flying fish ability) then force fish below water level
			if(self.y <= bs.config.canvas.elements.water) {
				self.y = bs.config.canvas.elements.water;
			} else if(self.y >= bs.config.canvas.elements.sand) {
				self.y = bs.config.canvas.elements.sand;
			}
		};

		var fishIsBiggerThanUser = function () {
			return (self.width * self.height) > (user.getWidth() * user.getHeight());
		};

		var huntUserDown = function () {
			if( Math.abs(self.x - user.getX()) <= self.speed) {
				// x-axis is sufficiently close. 
				// Set to user's x to avoid "jittery" effect caused by self.speed being more than the difference
				self.x = user.getX();
			} else if(self.x < user.getX()) {
				self.direction = "right";
				self.x += self.speed;
			} else if(self.x > user.getX()) {
				self.direction = "left";
				self.x -= self.speed;
			}
			
			if( Math.abs(self.y - user.getY()) <= self.speed) {
				// y-axis is sufficiently close. set to user's y to avoid "jittery" effect.
				self.y = user.getY();
			} else if(self.y < user.getY()) {
				self.y += self.speed;
			} else if(self.y > user.getY()) {
				self.y -= self.speed;
			}
		};

		var swimAwayFromUser = function () {
			if (self.x < user.getX()) {
				self.direction = "left";
				self.x -= self.speed;
			} else if (self.x > user.getX()) {
				self.direction = "right";
				self.x += self.speed;
			} else {
				// fish is at same x level as user and will escape in the direction it is travelling
				if(self.direction == "left") {
					self.x -= self.speed;
				} else {
					self.x += self.speed;
				}
			}
			
			if(self.y < user.getY()) {
				self.y -= self.speed;
			} else if(self.y >= user.getY()) {
				self.y += self.speed;
			}
		};

		self.reset();
	};

	return Fish;

});