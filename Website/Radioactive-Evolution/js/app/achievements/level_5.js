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
}

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
Level5.prototype.checkAchieved = function() {
	if(level >= 5) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}

return Level5;

});