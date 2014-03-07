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

		var construct = function () {
			self.maxLevel = 1;
			self.title = "Camouflage";
			self.updateCost();
		};

		/**
		* Updates the cost of the upgrade based on the current level.
		*
		* @override
		* @method updateCost
		*/
		this.updateCost = function() {
			switch(self.currentLevel) {
				case 0:
					self.cost = 25;
					self.description = "Blend into the sand to evade your enemy!";
			}
		}

		construct();
	};

	return UpgradeCamouflage;
});