define([], function () {

    /**
    * An achievement is gained through skilled (or unskilled!) gameplay.
    * 
    * This class is an abstract Achievement, defining attributes and methods shared between all achievements that extend it.
    *
    * @class Achievement
    * @constructor
    */
    var Achievement = function () {
    	this.title = "not yet defined";
    
        this.setup = function () {
            if (localStorage.getItem(this.title) === null) {
                localStorage[this.title] = false;
            } 
        };

        /**
        * Returns the title of the achivement.
        *
        * @method getTitle
        * @return {String} The title
        */
        this.getTitle = function() {
        	return this.title;
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
        * @param {Boolean} bool		True or false
        */
        this.updateStatus = function(bool) {
        	localStorage[this.title] = bool;
        }

        /**
        * Returns true if the achievement has been achieved.
        *
        * @method isAlreadyAchieved
        * @return {Boolean} True if the achievement has been achieved.
        */
        this.isAlreadyAchieved = function() {
            // check for false because don't want to check for 'true' AND true
        	return !(localStorage[this.title] === 'false');
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
        this.checkAchieved = function() {

        }
    }
    
    return Achievement;

});