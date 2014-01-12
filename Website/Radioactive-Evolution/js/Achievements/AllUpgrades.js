define(['module/controller/pubsub', 'module/model/ClassExtender', 'Achievements/Achievement', 'Upgrades/UpgradeCamouflage', 'Upgrades/UpgradeGrow', 'Upgrades/UpgradeMurkyWater', 'Upgrades/UpgradePoison'], function (pubsub, Extender, Achievement, upgrade_camouflage, upgrade_flying, upgrade_grow, upgrade_murkyWater, upgrade_poison) {

	/**
	* An achievement gained by purchasing all upgrades in one play-through session.
	*
	* @class AllUpgrades
	* @extends Achievement
	* @constructor
	*/
	var AllUpgrades = function () {
        var self = this;
        Extender.extend(Achievement, this);
		this.title="allUpgrades";
	}

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

	return AllUpgrades;

});