define(['bootstrap'], function (bs) {

    /**
    * Class defining number of seconds per level, and other variables
    * related to the framerate of the animation.
    *
    * @class Countdown
    * @constructor
    */
    var Countdown = function () {
        var self = this;

        this.init = function () {
            // number of seconds per level
            self.LEVEL_DURATION = bs.config.game.countdown;
            // sets the number of milliseconds between frames
            self.frameInterval = 20;
            // therefore calculates the number of frames per second
            self.framesPerSecond = 1000 / this.frameInterval;

            self.reset();  
        }

        /**
        * Returns the total number of seconds per level.
        *
        * @method levelDuration
        * @return {Number}  The number of seconds.
        */
        this.levelDuration = function() {
            return this.LEVEL_DURATION;
        }

        /**
        * Returns the number of milliseconds required to wait between frames
        *
        * @method getFrameInterval
        * @return {Number}  The number of milliseconds
        */
        this.getFrameInterval = function() {
            return this.frameInterval;
        }

        /**
        * Returns the number of seconds left on the current level.
        *
        * @method secondsLeft
        * @return {Number}  The number of seconds left.
        */
        this.secondsLeft = function() {
            return this.countdown;
        }

        /**
        * Every frame of the animation calls this function.
        * Gradually increases the frame count so that the number of 
        * seconds left counts down.
        *
        * @method nextFrame
        */
        this.nextFrame = function() {
            if (this.frameCount === 0) {
                bs.pubsub.emitEvent('regame:status', ["Time left: " + self.countdown]);
            }
            this.frameCount++;
            if(this.frameCount >= this.framesPerSecond) {
                // a second has passed
                this.countdown--;
                this.frameCount = 0;
                bs.pubsub.emitEvent('regame:status', ["Time left: " + self.countdown]);
            }
        }

        /**
        * Resets the countdown (called at the beginning of each level).
        *
        * @method reset
        */
        this.reset = function() {
            // framerate, seconds per level, etc
            this.countdown = this.LEVEL_DURATION;   // tracks seconds left until end of level
            this.frameCount = 0;                    // tracks "current" position in the frame
        }
    }

    var countdown = new Countdown();
    countdown.init();
    return countdown;

});