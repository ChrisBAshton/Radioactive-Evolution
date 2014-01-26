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
			switch(this.currentLevel) {
				case 0:
					this.cost = 25;
					this.description = "Blend into the sand to evade your enemy!";
			}
		}
	};

	return new UpgradeCamouflage();
});