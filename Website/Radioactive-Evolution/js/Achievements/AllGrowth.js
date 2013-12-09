/**
* An achievement gained by purchasing all of the growth upgrades.
*
* @class AllGrowth
* @extends Achievement
* @constructor
*/
function AllGrowth () {
	// call the parent constructor
	Achievement.call(this);
	this.title="allGrowth";
}

// inherit from Achievement
AllGrowth.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
AllGrowth.prototype.checkAchieved = function() {
	if(!upgrade_grow.canUpgrade()) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}