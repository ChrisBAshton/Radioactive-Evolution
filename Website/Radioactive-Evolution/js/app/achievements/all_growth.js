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
    }

    /**
    * Check if the achievement has been achieved.
    *
    * @override
    * @method checkAchieved
    */
    AllGrowth.prototype.checkAchieved = function() {
    	if(!upgrade_grow.canUpgrade()) {
    		this.setAchieved(true);
    		this.saveAchieved(true);
    	}
    }

    return AllGrowth;

});