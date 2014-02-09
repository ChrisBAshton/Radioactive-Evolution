define(['bootstrap', 'upgrades/_upgrade'], function (bs, Upgrade) {

	/**
	* With the camouflage ability, the user will blend into the sand should they move close enough
	* to the sand level.
	*
	* @class UpgradeCamouflage
	* @extends Upgrade
	* @constructor
	*/
	var UpgradeCamouflage = function () {
		var self = this;
		bs.extend(Upgrade, this);
		// initialise variables
		this.maxLevel = 1;
		this.title = "Camouflage";
		this.updateCost();

		/**
		* Updates the cost of the upgrade based on the current level.
		*
		* @override
		* @method updateCost
		*/
		this.updateCost = function() {
			console.log("Console log should come from here. Oddly enough, once you upgrade past first level, this starts working.");
			switch(self.currentLevel) {
				case 0:
					self.cost = 25;
					self.description = "Blend into the sand to evade your enemy!";
			}
		}
	};

	return UpgradeCamouflage;
});