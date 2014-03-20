define(['bootstrap', 'achievements/_achievement', 'upgrades/poison'], function (bs, Achievement, upgrade_poison) {

    /**
    * An achievement gained by purchasing all of the poison upgrades.
    *
    * @class AllPoison
    * @extends Achievement
    * @constructor
    */
    var AllPoison = function () {
        var self = this;
        bs.extend(Achievement, this);
    	this.title="allPoison";

        bs.pubsub.addListener('regame:upgrade:purchased', function (upgradeName, cost, newLevel) {
            if (upgradeName === 'Poison' && upgrade_poison.currentLevel === upgrade_poison.maxLevel) {
                self.updateStatus(true);
            }
        });
    }

    return AllPoison;

});