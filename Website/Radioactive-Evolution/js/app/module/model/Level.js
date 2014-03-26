/* @TODO there is a lot of computation in this class. Need to modularise betterer */

define(['bootstrap', 'module/model/Countdown', 'module/model/Population'], function (bs, countdown, population) {

    var Level = function () {

        var self = this,
            level,
            evolution_points,
            score;

        bs.pubsub.addListener('regame:nextLevel', function () {
            self.nextLevel();
        });

        bs.pubsub.addListener('regame:action:ate_plankton', function () {
            evolution_points += bs.config.game.planktonXP;
            score++;
            bs.pubsub.emitEvent('regame:status:score', [evolution_points]);    
        });

        bs.pubsub.emitEvent('regame:action:killed_fish', function (xpGained) {
            evolution_points += xpGained;
            score += xpGained;
            bs.pubsub.emitEvent('regame:status:score', [evolution_points]);
        });

        bs.pubsub.addListener('temporary-message-from-population.js', function () {
            bs.pubsub.emitEvent('regame:action:user_died', [level, score]);
            // @todo - remove this and respond to above event instead
            bs.pubsub.emitEvent('regame:game:stop');
            bs.pubsub.emitEvent('regame:status', ["You died! Final Score: " + score]);
            bs.pubsub.emitEvent('regame:menu:new', ['death']);            
        });


        this.level = function () {
            return level;
        };

        /**
        * Move all creatures and paint results to canvas.
        * If countdown reaches zero, trigger LevelMenu.
        *
        * @method animate
        */
        this.animate = function () {
            
            population.animate();

            countdown.nextFrame();
            if(countdown.secondsLeft() <= 0) {
                // user survived the level and now has the opportunity to purchase upgrades
                bs.pubsub.emitEvent('regame:game:stop');
                bs.pubsub.emitEvent('regame:menu:new', ['level']);
            } else {
                // calculate collisions etc
                population.calculate();
                bs.pubsub.emitEvent('regame:paint:redraw');
            }
        };

        this.nextLevel = function () {
            level++;
        };

        this.reset = function () {
            level            = 1;
            score            = 0;
            evolution_points = 0;
            bs.pubsub.emitEvent('regame:status:score', [evolution_points]);
            population.reset();
        };

        this.ep = function () {
            console.log('UPPERCASE "Level"');
            return evolution_points;
        };

        this.spendEp = function (amount) {
            evolution_points -= amount;
            if (evolution_points < 0) {
                throw new Exception ("MINUS POINTS");
            }
        };
    };

    return new Level();
});