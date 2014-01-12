define(['Upgrades/Upgrade'], function (Upgrade) {

/**
* With the flying fish ability, the user can move their fish above the surface level of the water,
* avoiding the powerless predators below the water!
*
* @class UpgradeFlyingFish
* @extends Upgrade
* @constructor
*/
function UpgradeFlyingFish() {
	// call the parent constructor
	Upgrade.call(this);
	// initialise variables
	this.maxLevel = 1;
	this.title = "Flying Fish";
	this.updateCost();
}

// inherit from Upgrade
UpgradeFlyingFish.prototype = Object.create(Upgrade.prototype);

/**
* Updates the cost of the upgrade based on the current level.
*
* @override
* @method updateCost
*/
UpgradeFlyingFish.prototype.updateCost = function() {
	switch(this.currentLevel) {
		case 0:
			this.cost = 50;
			this.description = "Leap above the surface of the water to avoid your predators!";
	}
}


	return new UpgradeFlyingFish();

});