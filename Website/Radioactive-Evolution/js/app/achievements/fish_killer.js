define(['bootstrap', 'achievements/_achievement'], function (bs, Achievement) {

    /**
    * An achievement gained by killing a certain number of fish in one level.
    *
    * @class FishKiller
    * @extends Achievement
    * @constructor
    */
    var FishKiller = function () {
        var self = this,
            fish_killed = 0;
        bs.extend(Achievement, this);
    	this.title="fishKiller";

        bs.pubsub.addListener('regame:action:killed_fish', function () {
            fish_killed++;

            if (fish_killed >= 10) {
                self.updateStatus(true);
            }
        });

        bs.pubsub.addListener('regame:nextLevel', function () {
            fish_killed = 0;
        });
    }

    return FishKiller;

});