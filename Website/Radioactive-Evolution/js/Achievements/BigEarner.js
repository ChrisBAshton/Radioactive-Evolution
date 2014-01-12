define(['module/controller/pubsub', 'module/model/ClassExtender', 'Achievements/Achievement'], function (pubsub, Extender, Achievement) {

    /**
    * An achievement gained by earning a certain amount of XP in one play-through.
    *
    * @class BigEarner
    * @extends Achievement
    * @constructor
    */
    var BigEarner = function () {
        var self = this;
        Extender.extend(Achievement, this);
    	this.title="bigEarner";
    }

    /**
    * Check if the achievement has been achieved.
    *
    * @override
    * @method checkAchieved
    */
    BigEarner.prototype.checkAchieved = function() {
    	if(final_score >= 200) {
    		this.setAchieved(true);
    		this.saveAchieved(true);
    	}
    }

    return BigEarner;

});