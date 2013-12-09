/**
* An achievement gained by completely failing and dying within a few seconds (on any level).
*
* @class EarlyDeath
* @extends Achievement
* @constructor
*/
function EarlyDeath () {
	// call the parent constructor
	Achievement.call(this);
	this.title="earlyDeath";
}

// inherit from Achievement
EarlyDeath.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
EarlyDeath.prototype.checkAchieved = function() {
	// if >= 25 seconds left, user died within 5 seconds
	if((countdown.levelDuration() - countdown.secondsLeft()) <= 5) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}