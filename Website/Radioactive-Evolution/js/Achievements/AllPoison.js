define(['module/controller/pubsub', 'module/model/ClassExtender', 'Achievements/Achievement', 'Upgrades/UpgradePoison'], function (pubsub, Extender, Achievement, upgrade_poison) {

    /**
    * An achievement gained by purchasing all of the poison upgrades.
    *
    * @class AllPoison
    * @extends Achievement
    * @constructor
    */
    var AllPoison = function () {
        var self = this;
        Extender.extend(Achievement, this);
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