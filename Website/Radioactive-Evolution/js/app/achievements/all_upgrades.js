define(['bootstrap', 'achievements/_achievement'], function (bs, Achievement) {

    /**
    * An achievement gained by buying all possible game upgrades.
    *
    * @class AllUpgrades
    * @extends Achievement
    * @constructor
    */
    var AllUpgrades = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="allUpgrades";

        var allCamouflage = false,
        	allFlyingFish = false,
        	allGrow       = false,
        	allMurkyWater = false,
        	allPoison     = false;


        // @TODO - come up with a less coupled way of checking all upgrades have been purchased.
        bs.pubsub.addListener('regame:upgrade:purchased', function (title, cost, currentLevel) {

        	if (title === "Camouflage" && currentLevel === 1) {
        		allCamouflage = true;
        	}
        	else if (title === "Flying Fish" && currentLevel === 1) {
        		allFlyingFish = true;
        	}
        	else if (title === "Grow" && currentLevel === 4) {
        		allGrow = true;
        	}
        	else if (title === "Murky Water" && currentLevel === 5) {
        		allMurkyWater = true;
        	}
        	else if (title === "Poison" && currentLevel === 5) {
        		allPoison = true;
        	}

        	self.checkAchieved();
        });

        this.checkAchieved = function () {

        	if (allCamouflage && allFlyingFish && allGrow && allMurkyWater && allPoison) {
        		self.updateStatus(true);
        	}
        }
    }

    return AllUpgrades;

});