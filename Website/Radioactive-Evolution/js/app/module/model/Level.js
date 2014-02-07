/*

TODO - remove the vars from this class and point to config.js instead

*/




define(['bootstrap', 'creatures/fish', 'creatures/plankton', 'creatures/user', 'module/model/Countdown'], function (bs, Fish, Plankton, user, countdown) {

    var level,
        xp,
        plankton,
        fish,
        poison;



    /**
    * Gaming variables
    // */
    // // level variables
    // var level;
    // var final_score;
    // var xp;
    // var fish_killed;
    // // "real world" objects
    // var poison = new Array();
    // var plankton = new Array();
    // var fish = new Array();
    // // upgrades
    // var upgrade_camouflage;
    // var upgrade_flying;
    // var upgrade_grow;
    // var upgrade_murkyWater;
    // var upgrade_poison;
    // // achievements are stored in this array
    // var achievements;
    // // "functional" objects
    // var notification;

    var Level = function () {

        var self = this;

        /**
        * Move all creatures and paint results to canvas.
        * If countdown reaches zero, trigger LevelMenu.
        *
        * @method animate
        */
        this.animate = function () {
            
            // move user if appropriate keyboard key is down
            user.keyboardMove();
            
            var i;

            i = plankton.length;
            while (i-- > 0) {
                plankton[i].move();
                plankton[i].glow();
            }

            i = poison.length;
            while (i-- > 0) {
                poison[i].move();
            }

            i = fish.length;
            while (i-- > 0) {
                fish[i].move();
            }

            countdown.nextFrame();
            if(countdown.secondsLeft() <= 0) {
                // user survived the level and now has the opportunity to purchase upgrades
                bs.pubsub.emitEvent('regame:game:stop');
                bs.pubsub.emitEvent('regame:menu:new', ['level']);
            } else {
                // calculate collisions etc
                self.calculate();
                bs.pubsub.emitEvent('regame:paint:redraw');
            }
        };

        /**
        * Generate all of the creatures for the level.
        */
        this.reset = function () {
            level    = 1;
            xp       = 0;
            fish     = [];
            plankton = [];
            poison   = [];

            var loop;

            loop = bs.config.game.minFish;
            while (loop-- > 0) {
                fish.push(new Fish());
            }
            loop = bs.config.game.minPlankton;
            while (loop-- > 0) {
                plankton.push(new Plankton());
            }
            loop = bs.config.game.minPoison;
            while (loop-- > 0) {
                poison.push(new Poison());
            }
        };

        this.drawCreatures = function () {

            var i;

            i = plankton.length;
            while (i-- > 0) {
                plankton[i].draw();
            }
            i = poison.length;
            while (i-- > 0) {
                poison[i].draw();
            }
            i = fish.length;
            while (i-- > 0) {
                fish[i].draw();
            }
        };

        /**
        * Check for collisions and process the impact of any such collisions,
        * e.g. the user swimming into plankton.
        *
        * @method calculate
        */
        this.calculate = function () {
            var i;

            // check user has eaten plankton
            i = plankton.length;
            while (i-- > 0) {
                if(collision(user, plankton[i])) {
                    // play crunch sound. Reset time to zero so that sound plays multiple times if user hits multiple plankton in short time frame
                    sound_crunch.currentTime=0;
                    sound_crunch.play();
                    // remove plankton and gain XP
                    xp++;
                    final_score++;
                    plankton[i].reset();
                }
            }

            i = poison.length;
            while (i-- > 0) {
                if(poison[i] !== null) {
                    // poison has been placed by the user- check against other fish coordinates
                    for(var j=0; j < fish.length; j++) {
                        // check fish is alive- a dead fish can't eat poison!
                        if(fish[j].isAlive()) {
                            // if fish comes into contact with poison
                            if(collision(fish[j], poison[i])) {
                                // fish dies, remove poison
                                fish[j].eatPoison();
                                fish_killed++;
                                poison[i] = null;
                                break;
                            }
                        }
                    }
                }                
            }
            
            // check user has touched a fish
            i = fish.length;
            while (i-- > 0) {
                if(collision(user, fish[i])) {
                    if(fish[i].isAlive()) {
                        // check which fish is bigger
                        if( (user.getWidth() * user.getHeight()) > (fish[i].getWidth() * fish[i].getHeight()) ) {
                            // user is bigger, so eats the other fish
                            sound_crunch.play();
                            xp += fish[i].getXP();
                            final_score += fish[i].getXP();
                            fish[i].reset();
                            fish_killed++;
                        } else {
                            // user is dead
                            bs.pubsub.emitEvent('regame:game:stop');
                            bs.pubsub.emitEvent('regame:menu:new', ['death']);
                        }
                    } else {
                        // player eats the dead fish and gets some XP (but not as much as if they'd eaten the fish directly)
                        var gain = Math.floor((fish[i].getXP())/2);
                        xp += gain;
                        final_score += gain;
                        fish[i].reset();
                    }
                }
            }
        }

        /**
        * Check two creatures' co-ordinates and sizes, return true if the two objects overlap.
        *
        * @method collision
        * @param {Creature} obj1    The first object
        * @param {Creature} obj2    The second object
        * @return {Boolean}         True if the two objects have collided
        */
        var collision = function (obj1, obj2) {
            // x,y are the CENTRAL coordinates of the object
            // calculate side coordinates
            var obj1_left = obj1.getX() - (obj1.getWidth()/2);
            var obj1_right = obj1.getX() + (obj1.getWidth()/2);
            var obj1_top = obj1.getY() - (obj1.getHeight()/2);
            var obj1_bottom = obj1.getY() + (obj1.getHeight()/2);
            
            var obj2_left = obj2.getX() - (obj2.getWidth()/2);
            var obj2_right = obj2.getX() + (obj2.getWidth()/2);
            var obj2_top = obj2.getY() - (obj2.getHeight()/2);
            var obj2_bottom = obj2.getY() + (obj2.getHeight()/2);
            
            var Xoverlap = (obj1_right >= obj2_left && obj1_left <= obj2_right);
            var Yoverlap = (obj1_bottom >= obj2_top && obj1_top <= obj2_bottom);
            
            return (Xoverlap && Yoverlap);
        };

    };

    return new Level();


});