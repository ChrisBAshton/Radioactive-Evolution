/**
* With the camouflage ability, the user will blend into the sand should they move close enough
* to the sand level.
*
* @class UpgradeCamouflage
* @extends Upgrade
* @constructor
*/
function UpgradeCamouflage() {
	// call the parent constructor
	Upgrade.call(this);
	// initialise variables
	this.maxLevel = 1;
	this.title = "Camouflage";
	this.updateCost();
}

// inherit from Upgrade
UpgradeCamouflage.prototype = Object.create(Upgrade.prototype);

/**
* Updates the cost of the upgrade based on the current level.
*
* @override
* @method updateCost
*/
UpgradeCamouflage.prototype.updateCost = function() {
	switch(this.currentLevel) {
		case 0:
			this.cost = 25;
			this.description = "Blend into the sand to evade your enemy!";
	}
}