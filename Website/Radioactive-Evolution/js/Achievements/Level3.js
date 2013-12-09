/**
* An achievement gained by reaching level 3.
*
* @class Level3
* @extends Achievement
* @constructor
*/
function Level3 () {
	// call the parent constructor
	Achievement.call(this);
	this.title="level3";
}

// inherit from Achievement
Level3.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
Level3.prototype.checkAchieved = function() {
	if(level >= 3) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}