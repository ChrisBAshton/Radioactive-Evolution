define(['bootstrap', 'module/model/ClassExtender', 'upgrades/_upgrade', 'creatures/user'], function (bs, Extender, Upgrade, user) {

	/**
	* Growing, as the name suggests, increases the player's fish size. As the player can eat any fish
	* they're bigger than, this upgrade is obviously useful for survival.
	*
	* @class UpgradeGrow
	* @extends Upgrade
	* @constructor
	*/
	var UpgradeGrow = function () {
		// call the parent constructor
		Extender.extend(Upgrade, this);

		// initialise variables
		this.maxLevel = 4;
		this.title = "Grow";
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
					this.cost = 10;
					this.description = "Grow bigger and start eating fish that are smaller than you!";
					break;
				case 1:
					this.cost = 15;
					break;
				case 2:
					this.cost = 20;
					break;
				case 3:
					this.cost = 25;
					break;
			}
		}

		/**
		* Updates the size of the player.
		*
		* @override
		* @method specificUpgrades
		*/
		this.specificUpgrades = function() {	
			var width, height;
			switch(this.currentLevel) {
				case 0:
					width = 20;
					break;
				case 1:
					width = 30;
					break;
				case 2:
					width = 50;
					break;
				case 3:
					width = 80;
					break;
				case 4:
					width = 120;
					break;
			}
			height = Math.floor(width/2);
			user.setSize(width, height);
		}

	};

	return new UpgradeGrow();

});