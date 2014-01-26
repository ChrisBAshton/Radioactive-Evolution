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
    }

    /**
    * Check if the achievement has been achieved.
    *
    * @override
    * @method checkAchieved
    */
    AllPoison.prototype.checkAchieved = function() {
    	if(!upgrade_poison.canUpgrade()) {
    		this.setAchieved(true);
    		this.saveAchieved(true);
    	}
    }

    return AllPoison;

});