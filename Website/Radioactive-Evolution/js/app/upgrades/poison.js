define(['bootstrap', 'upgrades/_upgrade'], function (bs, Upgrade) {

	/**
	* Purchasing the poison ability allows the user to left-click on the canvas to leave behind 
	* toxins of poison. If other fish swim into this poison, they immediately die, turn blue and 
	* float to the surface of the water, in an animation I'm unashamedly proud of.
	*
	* @class UpgradePoison
	* @extends Upgrade
	* @constructor
	*/
	var UpgradePoison = function () {
		var self = this;
		bs.extend(Upgrade, this);

		var construct = function () {
			self.maxLevel = 5;
			self.title = "Poison";
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
					this.cost = 20;
					this.description = "Left-click to produce a poison that kills other fish.";
					break;
				case 1:
					this.cost = 25;
					this.description = "Produce up to 2 poisons at a time!";
					break;
				case 2:
					this.cost = 30;
					this.description = "Produce up to 3 poisons at a time.";
					break;
				case 3:
					this.cost = 35;
					this.description = "Produce up to 5 poisons at a time.";
					break;
				case 4:
					this.cost = 50;
					this.description = "Produce up to 7 poisons at a time.";
					break;
			}
		}

		/**
		* Increases the number of poison the player can have in the water at any one time.
		*
		* @override
		* @method specificUpgrades
		*/
		this.specificUpgrades = function() {
			switch(this.currentLevel) {
				case 0:
					number_of_poison = 0;
					break;
				case 1:
					number_of_poison = 1;
					break;
				case 2:
					number_of_poison = 2;
					break;
				case 3:
					number_of_poison = 3;
					break;
				case 4:
					number_of_poison = 5;
					break;
				case 5:
					number_of_poison = 7;
					break;
			}
		}

		construct();
	};

	return UpgradePoison;
});