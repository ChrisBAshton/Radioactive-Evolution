define(['bootstrap', 'achievements/_achievement', 'module/controller/upgrade_controller'], function (bs, Achievement, upgrades) {

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

        bs.pubsub.addListener('regame:upgrade:purchased', function (title, cost, currentLevel) {
        	self.checkAchieved();
        });

        this.checkAchieved = function () {

            for(var i = 0; i < upgrades.upgrades.length; i++) {
                if (upgrades.upgrades[i].canUpgrade()) {
                    return false;
                }
            }

        	self.updateStatus(true);
        }
    }

    return AllUpgrades;

});