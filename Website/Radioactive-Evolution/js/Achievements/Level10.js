/**
* An achievement gained by reaching level 10.
*
* @class Level10
* @extends Achievement
* @constructor
*/
function Level10 () {
	// call the parent constructor
	Achievement.call(this);
	this.title="level10";
}

// inherit from Achievement
Level10.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
Level10.prototype.checkAchieved = function() {
	if(level >= 10) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}