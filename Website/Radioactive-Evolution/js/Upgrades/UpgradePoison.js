/**
* Purchasing the poison ability allows the user to left-click on the canvas to leave behind 
* toxins of poison. If other fish swim into this poison, they immediately die, turn blue and 
* float to the surface of the water, in an animation I'm unashamedly proud of.
*
* @class UpgradePoison
* @extends Upgrade
* @constructor
*/
function UpgradePoison() {
	// call the parent constructor
	Upgrade.call(this);
	// initialise variables
	this.maxLevel = 5;
	this.title = "Poison";
	this.updateCost();
}

// inherit from Upgrade
UpgradePoison.prototype = Object.create(Upgrade.prototype);

/**
* Updates the cost of the upgrade based on the current level.
*
* @override
* @method updateCost
*/
UpgradePoison.prototype.updateCost = function() {
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
UpgradePoison.prototype.specificUpgrades = function() {
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