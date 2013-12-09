/**
* An achievement is gained through skilled (or unskilled!) gameplay.
* 
* This class is an abstract Achievement, defining attributes and methods shared between all menus that extend it.
*
* @class Achievement
* @constructor
*/
function Achievement () {
	this.title = "not yet defined";
	this.achieved = false;
}

/**
* Returns the title of the achivement.
*
* @method getTitle
* @return {String} The title
*/
Achievement.prototype.getTitle = function() {
	return this.title;
}

/**
* Sets the 'achieved' property.
* Achievements are stored in two places- in HTML5 localStorage, and in the Achievement
* object in memory. This method updates the achievement in memory.
*
* @method setAchieved
* @param {Boolean} bool		True or false
*/
Achievement.prototype.setAchieved = function(bool) {
	this.achieved = bool;
}

/**
* Saves the achievement and its achieved status (true/false) in HTML5 localStorage.
* 
* Why haven't setAchieved() and saveAchieved() been combined?
* For versatility. Sure, when the user achieves a new achievement, the Achievement object
* and the localStorage both need updating. But when the user first loads up the game in 
* the browser, we read from localStorage and therefore need to update the achievement objects
* (and ONLY the achievement objects).
*
* @method saveAchieved
* @param {Boolean} bool		True or false
*/
Achievement.prototype.saveAchieved = function(bool) {
	localStorage[this.title] = bool;
}

/**
* Returns true if the achievement has been achieved.
*
* @method isAchieved
* @return {Boolean} True if the achievement has been achieved.
*/
Achievement.prototype.isAchieved = function() {
	return this.achieved;
}

/**
* Performs the necessary calculations to deduce whether or not the 
* achievement has been achieved.
*
* Differs from isAchieved() in that it actually checks the necessary
* global variables etc to see if the achievement has been achieved,
* rather than simply checking if the achievement has been achieved in
* the past.
*
* Needs to be implemented by subclasses.
*
* @method checkAchieved
*/
Achievement.prototype.checkAchieved = function() {

}