define(['bootstrap', 'upgrades/_upgrade'], function (bs, Upgrade) {

	/**
	* With the flying fish ability, the user can move their fish above the surface level of the water,
	* avoiding the powerless predators below the water!
	*
	* @class UpgradeFlyingFish
	* @extends Upgrade
	* @constructor
	*/
	var UpgradeFlyingFish = function () {
		var self = this;
		bs.extend(Upgrade, this);

		var construct = function () {
			self.maxLevel = 1;
			self.title = "Flying Fish";
			self.updateCost();
		};

		/**
		* Updates the cost of the upgrade based on the current level.
		*
		* @override
		* @method updateCost
		*/
		this.updateCost = function() {
			switch(this.currentLevel) {
				case 0:
					this.cost = 50;
					this.description = "Leap above the surface of the water to avoid your predators!";
			}
		}

		construct();
	};


	return UpgradeFlyingFish;

});