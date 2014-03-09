define(['bootstrap', 'achievements/_achievement'], function (bs, Achievement) {

    /**
    * An achievement gained by reaching level 10.
    *
    * @class Level10
    * @extends Achievement
    * @constructor
    */
    var Level10 = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="level10";

        bs.pubsub.addListener('regame:nextLevel', function (level) {
            if (level === 10) {
                self.updateStatus(true);
            }
        });
    }

    return Level10;

});