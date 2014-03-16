define(['bootstrap', 'achievements/_achievement', 'upgrades/grow'], function (bs, Achievement, upgrade_grow) {

    /**
    * An achievement gained by purchasing all of the growth upgrades.
    *
    * @class AllGrowth
    * @extends Achievement
    * @constructor
    */
    var AllGrowth = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="allGrowth";
        
        bs.pubsub.addListener('regame:upgrade:purchased', function (upgradeName, cost, newLevel) {
            if (upgradeName === 'Grow' && upgrade_grow.currentLevel === upgrade_grow.maxLevel) {
                self.updateStatus(true);
            }
        });

    }

    return AllGrowth;

});