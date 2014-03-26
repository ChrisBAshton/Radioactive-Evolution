/* @TODO - combine with other level_x.js files */

define(['bootstrap', 'achievements/_achievement'], function (bs, Achievement) {

    /**
    * An achievement gained by reaching level 5.
    *
    * @class Level5
    * @extends Achievement
    * @constructor
    */
    var Level5 = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="level5";

        bs.pubsub.addListener('regame:nextLevel', function (level) {
            if (level === 5) {
                self.updateStatus(true);
            }
        });
    }

    return Level5;

});