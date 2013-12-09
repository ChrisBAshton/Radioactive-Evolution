/**
* An achievement gained by killing a certain number of fish in one level.
*
* @class FishKiller
* @extends Achievement
* @constructor
*/
function FishKiller () {
	// call the parent constructor
	Achievement.call(this);
	this.title="fishKiller";
}

// inherit from Achievement
FishKiller.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
FishKiller.prototype.checkAchieved = function() {
	if(fish_killed >= 10) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}