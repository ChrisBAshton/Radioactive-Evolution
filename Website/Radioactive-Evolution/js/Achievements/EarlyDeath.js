define(['module/controller/pubsub', 'module/model/ClassExtender', 'Achievements/Achievement'], function (pubsub, Extender, Achievement) {

    /**
    * An achievement gained by completely failing and dying within a few seconds (on any level).
    *
    * @class EarlyDeath
    * @extends Achievement
    * @constructor
    */
    var EarlyDeath = function () {
        var self = this;
        Extender.extend(Achievement, this);
    	this.title="earlyDeath";
    }

    /**
    * Check if the achievement has been achieved.
    *
    * @override
    * @method checkAchieved
    */
    EarlyDeath.prototype.checkAchieved = function() {
    	// if >= 25 seconds left, user died within 5 seconds
    	if((countdown.levelDuration() - countdown.secondsLeft()) <= 5) {
    		this.setAchieved(true);
    		this.saveAchieved(true);
    	}
    }

    return EarlyDeath;

});