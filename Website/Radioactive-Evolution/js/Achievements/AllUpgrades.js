/**
* An achievement gained by purchasing all upgrades in one play-through session.
*
* @class AllUpgrades
* @extends Achievement
* @constructor
*/
function AllUpgrades () {
	// call the parent constructor
	Achievement.call(this);
	this.title="allUpgrades";
}

// inherit from Achievement
AllUpgrades.prototype = Object.create(Achievement.prototype);

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
AllUpgrades.prototype.checkAchieved = function() {
	var unlockedAll = true;
	var upgrades = new Array(upgrade_camouflage, upgrade_flying, upgrade_grow, upgrade_murkyWater, upgrade_poison);
	for(var i = 0; i < upgrades.length; i++) {
		if(upgrades[i].canUpgrade()) {
			// user can still upgrade this upgrade
			unlockedAll = false;
			break;
		}
	}
	if(unlockedAll) {
		// user has unlocked all upgrades! Achievement!
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}