/**
* An achievement gained by purchasing all of the poison upgrades.
*
* @class AllPoison
* @extends Achievement
* @constructor
*/
function AllPoison () {
	// call the parent constructor
	Achievement.call(this);
	this.title="allPoison";
}

// inherit from Achievement
AllPoison.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
AllPoison.prototype.checkAchieved = function() {
	if(!upgrade_poison.canUpgrade()) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}