define(['bootstrap', 'achievements/_achievement'], function (bs, Achievement) {

    /**
    * An achievement gained by killing a certain number of fish in one level.
    *
    * @class FishKiller
    * @extends Achievement
    * @constructor
    */
    var FishKiller = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="fishKiller";
    }

    /**
    * Check if the achievement has been achieved.
    *
    * @override
    * @method checkAchieved
    */
    FishKiller.prototype.checkAchieved = function() {
    	if(fish_killed >= 10) {
    		this.setAchieved(true);
    		this.saveAchieved(true);
    	}
    }

    return FishKiller;

});