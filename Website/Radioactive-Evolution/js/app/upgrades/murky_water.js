define(['bootstrap', 'upgrades/_upgrade'], function (bs, Upgrade) {

	/**
	* Investing in murky water increases the level of plankton in the water, making it quicker and easier 
	* for the user to gain XP.
	*
	* @class UpgradeMurkyWater
	* @extends Upgrade
	* @constructor
	*/
	var UpgradeMurkyWater = function () {
		bs.extend(Upgrade, this);
		// initialise variables
		this.maxLevel = 5;
		this.title = "Murky Water";
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
					this.cost = 5;
					this.description = "Produce more carbon dioxide to increase the water's plankton levels.";
					break;
				case 1:
					this.cost = 8;
					this.description = "Increase number of plankton to 6.";
					break;
				case 2:
					this.cost = 14;
					this.description = "Increase number of plankton to 8.";
					break;
				case 3:
					this.cost = 20;
					this.description = "Increase number of plankton to 10.";
					break;
				case 4:
					this.cost = 26;
					this.description = "Increase number of plankton to 12.";
					break;
			}
		}

		/**
		* Increases the number of plankton in the water.
		*
		* @override
		* @method specificUpgrades
		*/
		this.specificUpgrades = function() {
			switch(this.currentLevel) {
				case 0:
					number_of_plankton = 3;
					break;
				case 1:
					number_of_plankton = 4;
					break;
				case 2:
					number_of_plankton = 6;
					break;
				case 3:
					number_of_plankton = 8;
					break;
				case 4:
					number_of_plankton = 10;
					break;
				case 5:
					number_of_plankton = 12;
					break;
			}
		}
	}

	return UpgradeMurkyWater;

});