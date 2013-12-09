/**
* An achievement gained by earning a certain amount of XP in one play-through.
*
* @class BigEarner
* @extends Achievement
* @constructor
*/
function BigEarner () {
	// call the parent constructor
	Achievement.call(this);
	this.title="bigEarner";
}

// inherit from Achievement
BigEarner.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
BigEarner.prototype.checkAchieved = function() {
	if(final_score >= 200) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}