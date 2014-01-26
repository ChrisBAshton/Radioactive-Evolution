define(['bootstrap', 'achievements/_achievement'], function (bs, Achievement) {

    /**
    * An achievement gained by reaching level 3.
    *
    * @class Level3
    * @extends Achievement
    * @constructor
    */
    var Level3 = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="level3";
    }

    /**
    * Check if the achievement has been achieved.
    *
    * @override
    * @method checkAchieved
    */
    Level3.prototype.checkAchieved = function() {
    	if(level >= 3) {
    		this.setAchieved(true);
    		this.saveAchieved(true);
    	}
    }

    return Level3;

});