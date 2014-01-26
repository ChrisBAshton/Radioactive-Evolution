define(['bootstrap', 'module/model/ClassExtender', 'achievements/_achievement'], function (bs, Extender, Achievement) {

/**
* An achievement gained by reaching level 10.
*
* @class Level10
* @extends Achievement
* @constructor
*/
var Level10 = function () {
    var self = this;
    Extender.extend(Achievement, this);
	this.title="level10";
}

/**
* Check if the achievement has been achieved.
*
* @override
* @method checkAchieved
*/
Level10.prototype.checkAchieved = function() {
	if(level >= 10) {
		this.setAchieved(true);
		this.saveAchieved(true);
	}
}

return Level10;

});