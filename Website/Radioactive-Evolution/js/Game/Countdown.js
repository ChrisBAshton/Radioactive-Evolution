/**
* Class defining number of seconds per level, and other variables
* related to the framerate of the animation.
*
* @class Countdown
* @constructor
*/
function Countdown() {
	// number of seconds per level
	this.LEVEL_DURATION = 30;
	// sets the number of milliseconds between frames
	this.frameInterval = 20;
	// therefore calculates the number of frames per second
	this.framesPerSecond = 1000 / this.frameInterval;
	this.reset();
}

/**
* Returns the total number of seconds per level.
*
* @method levelDuration
* @return {Number}	The number of seconds.
*/
Countdown.prototype.levelDuration = function() {
	return this.LEVEL_DURATION;
}

/**
* Returns the number of milliseconds required to wait between frames
*
* @method getFrameInterval
* @return {Number}	The number of milliseconds
*/
Countdown.prototype.getFrameInterval = function() {
	return this.frameInterval;
}

/**
* Returns the number of seconds left on the current level.
*
* @method secondsLeft
* @return {Number}	The number of seconds left.
*/
Countdown.prototype.secondsLeft = function() {
	return this.countdown;
}

/**
* Every frame of the animation calls this function.
* Gradually increases the frame count so that the number of 
* seconds left counts down.
*
* @method nextFrame
*/
Countdown.prototype.nextFrame = function() {
	this.frameCount++;
	if(this.frameCount >= this.framesPerSecond) {
		// a second has passed
		this.countdown--;
		this.frameCount = 0;
	}
}

/**
* Resets the countdown (called at the beginning of each level).
*
* @method reset
*/
Countdown.prototype.reset = function() {
	// framerate, seconds per level, etc
	this.countdown = this.LEVEL_DURATION;	// tracks seconds left until end of level
	this.frameCount = 0;					// tracks "current" position in the frame
}