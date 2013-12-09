/**
* An achievement gained by reaching level 5.
*
* @class Level5
* @extends Achievement
* @constructor
*/
function Level5 () {
	// call the parent constructor
	Achievement.call(this);
	this.title="level5";
}

// inherit from Achievement
Level5.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
Level5.prototype.checkAchieved = function() {
	if(level >= 5) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}