define(['bootstrap', 'achievements/_achievement'], function (bs, Achievement) {

    /**
    * An achievement gained by earning a certain amount of XP in one play-through.
    *
    * @class BigEarner
    * @extends Achievement
    * @constructor
    */
    var BigEarner = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="bigEarner";

        bs.pubsub.addListener('regame:action:user_died', function (level, score) {
            if (score >= 200) {
                self.updateStatus(true);
            }
        });
    }

    return BigEarner;

});