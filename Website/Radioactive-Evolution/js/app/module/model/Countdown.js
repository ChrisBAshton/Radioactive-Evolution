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
        self.millisecondsBetweenFrames = 20;
        self.framesPerSecond = 1000 / self.millisecondsBetweenFrames; // framerate

        /**
        * Returns the number of milliseconds required to wait between frames
        *
        * @method getFrameInterval
        * @return {Number}  The number of milliseconds
        */
        this.getFrameInterval = function() {
            return this.millisecondsBetweenFrames;
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
            this.frameCount++;
            if (aSecondHasPassed()) {
                this.countdown--;
                this.frameCount = 0;
                updateTimeLeft();
            }
        }

        var aSecondHasPassed = function () {
            return self.frameCount >= self.framesPerSecond;
        };

        var updateTimeLeft = function () {
            bs.pubsub.emitEvent('regame:status', ["Time left: " + self.countdown]);
        };

        /**
        * Resets the countdown (called at the beginning of each level).
        *
        * @method reset
        */
        this.reset = function() {
            this.countdown = bs.config.game.countdown;
            this.frameCount = 0;
            updateTimeLeft();
        }
    }

    return new Countdown();
});