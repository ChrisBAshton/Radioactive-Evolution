/* @TODO - combine with other level_x.js files */

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

        bs.pubsub.addListener('regame:nextLevel', function (level) {
            if (level === 3) {
                self.updateStatus(true);
            }
        });
    }

    return Level3;

});