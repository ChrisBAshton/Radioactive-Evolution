define(['module/controller/pubsub'], function (pubsub) {


/**
* An upgrade is an ability or property that the user is able to purchase, using XP, to improve their
* gaming experience and help them to meet the demands of the challenging later levels.
* 
* This class is an abstract Upgrade, defining attributes and methods shared between all upgrades that extend it.
*
* @class Upgrade
* @constructor
*/
var Upgrade = function () {

	var self = this;

	this.maxLevel = 0;
	this.currentLevel = 0;
	this.cost = 0;
	this.title = "";
	this.description = "";

	pubsub.addListener('regame:game:reset', function () {
		self.reset();
	});

	/**
	* Returns the current level of the upgrade.
	*
	* @method getLevel
	* @return {Number}	The current level
	*/
	this.getLevel = function() {
		return this.currentLevel;
	}

	/**
	* Returns the cost of improving the upgrade to the next level.
	*
	* @method getCost
	* @return {Number}	The cost in XP
	*/
	this.getCost = function() {
		return this.cost;
	}

	/**
	* Returns the title of the upgrade.
	*
	* @method getTitle
	* @return {String}	The title
	*/
	this.getTitle = function() {
		return this.title;
	}

	/**
	* Returns the description of the upgrade.
	*
	* @method getDescription
	* @return {String}	The description
	*/
	this.getDescription = function() {
		return this.description;
	}

	/**
	* Checks if the upgrade can be upgraded further, returning true if so.
	*
	* @method canUpgrade
	* @return {Boolean}		True if can upgrade, false if fully upgraded already.
	*/
	this.canUpgrade = function() {
		return !(this.currentLevel >= this.maxLevel);
	}

	/**
	* Checks if the user can afford the cost of upgrading to the next level.
	*
	* @method canAffordUpgrade
	* @return {Boolean}		True if can afford to upgrade
	*/
	this.canAffordUpgrade = function() {
		return (xp >= this.cost);
	}

	/**
	* Applies the upgrade- removes the user XP, updates all of the 
	* variables within this upgrade, and finally performs any actions
	* associated with the upgrade.
	*
	* @method applyUpgrade
	*/
	this.applyUpgrade = function() {
		// charge user
		xp -= this.cost;
		// increment level of upgrade
		this.currentLevel++;
		// calculate new cost of upgrade
		this.updateCost();
		// apply upgrade, if applicable
		this.specificUpgrades();
	}

	/**
	* Called when the user restarts the game and therefore needs a clean slate of upgrades
	* so that they aren't at an unfair advantage. Resets all of the upgrade's variables.
	*
	* @method reset
	*/
	this.reset = function() {
		// reset level of upgrade
		this.currentLevel = 0;
		// reset cost of upgrade based on current level
		this.updateCost();
		// reset effects of upgrades, if applicable
		this.specificUpgrades();
	}

	/**
	* To be implemented in subclasses - updates the cost of upgrading to the next
	* level of the upgrade.
	* e.g. if it costs 10 XP to go from level 0 to level 1, we need to update the cost
	* so that, for example, it costs 15 XP to go from level 1 to level 2
	*
	* @method updateCost
	*/
	this.updateCost = function() {
		// need to be defined in classes that inherit
	}

	/**
	* Some upgrades have their "effect" automatically, as the game logic will query the current level
	* and compute differently based on that. More complex upgrades might alter global variables, for
	* example. This method can be overriden for such upgrades.
	*
	* In other words, after performing all of the computations required for ANY upgrade,
	* applyUpgrade() calls this function which defines computations for a
	* SPECIFIC upgrade.
	* Objects inheriting from Upgrade can override this function and do some 
	* extra computations without having to redefine applyUpgrade().
	*
	* @method specificUpgrades
	*/
	this.specificUpgrades = function() {

	}
}

return Upgrade;

});