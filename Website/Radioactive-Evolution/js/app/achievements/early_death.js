define(['bootstrap', 'achievements/_achievement', 'module/model/countdown'], function (bs, Achievement, countdown) {

    /**
    * An achievement gained by completely failing and dying within a few seconds (on any level).
    *
    * @class EarlyDeath
    * @extends Achievement
    * @constructor
    */
    var EarlyDeath = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="earlyDeath";

        bs.pubsub.addListener('regame:menu:new', function (menu) {
            if (menu === 'death') {
                if (diedWithinFiveSeconds()) {
                    self.updateStatus(true);
                }
            }
        });
    };

    var diedWithinFiveSeconds = function () {
        return (bs.config.game.countdown - countdown.secondsLeft()) <= 5;
    };

    return EarlyDeath;

});