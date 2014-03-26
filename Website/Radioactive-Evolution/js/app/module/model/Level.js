define(['bootstrap', 'creatures/fish', 'creatures/plankton', 'creatures/poison', 'creatures/user', 'module/model/Countdown', '_helpers/object_helper'], function (bs, Fish, Plankton, Poison, user, countdown, objects) {

    var Level = function () {

        var self = this,
            level,
            evolution_points,
            score,
            plankton,
            fish,
            poison,
            number_of_fish,
            number_of_poison,
            number_of_plankton;

        bs.pubsub.addListener('regame:nextLevel', function () {
            self.nextLevel();
        });

        bs.pubsub.addListener('regame:upgrade:planktonCountChanged', function (newTotal) {
            number_of_plankton = newTotal;
        });

        bs.pubsub.addListener('regame:upgrade:poisonCountChanged', function (newTotal) {
            number_of_poison = newTotal;
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

        this.nextLevel = function () {
            level++;
            number_of_fish++;
            self.populate();
        };

        /**
        * Generate all of the creatures for the level.
        */
        this.reset = function () {
            level            = 1;
            score            = 0;
            evolution_points = 0;
            number_of_fish     = bs.config.game.minFish;
            number_of_plankton = bs.config.game.minPlankton;
            number_of_poison   = bs.config.game.minPoison;
            self.populate();
        };

        this.populate = function () {
            fish = populateArray(Fish, number_of_fish);
            plankton = populateArray(Plankton, number_of_plankton);
            poison = [];//populateArray(Poison, number_of_poison);
        };

        var populateArray = function (objectName, numberOfTimes) {
            var myArray = [];
            while (numberOfTimes-- > 0) {
                myArray.push(new objectName());
            }
            return myArray;
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
        * @TODO - move out into separate functions, reuse the looping code.
        */
        this.calculate = function () {
            var i;

            // check user has eaten plankton
            i = plankton.length;
            while (i-- > 0) {
                if(objects.collide(user, plankton[i])) {
                    // play crunch sound. Reset time to zero so that sound plays multiple times if user hits multiple plankton in short time frame
                    bs.pubsub.emitEvent('regame:action:ate_plankton');

                    // remove plankton and gain XP
                    evolution_points += bs.config.game.planktonXP;
                    score++;
                    plankton[i].reset();
                }
            }

            i = poison.length;
            while (i-- > 0) {
                //if(poison[i] !== null) {
                    // poison has been placed by the user- check against other fish coordinates
                    for(var j=0; j < fish.length; j++) {
                        // check fish is alive- a dead fish can't eat poison!
                        if(fish[j].isAlive()) {
                            // if fish comes into contact with poison
                            if(objects.collide(fish[j], poison[i])) {
                                // fish dies, remove poison
                                fish[j].eatPoison();
                                bs.pubsub.emitEvent('regame:action:killed_fish');
                                poison[i].remove();// = null;
                                break;
                            }
                        }
                    }
                //}                
            }
            
            // check user has touched a fish
            i = fish.length;
            while (i-- > 0) {
                if(objects.collide(user, fish[i])) {
                    if(fish[i].isAlive()) {
                        // check which fish is bigger
                        if( (user.getWidth() * user.getHeight()) > (fish[i].getWidth() * fish[i].getHeight()) ) {
                            // @TODO - get all below actions to be invoked by this event
                            bs.pubsub.emitEvent('regame:action:killed_fish');
                            // user is bigger, so eats the other fish
                            evolution_points += fish[i].getXP();
                            score += fish[i].getXP();
                            fish[i].reset();
                        } else {
                            // user is dead
                            bs.pubsub.emitEvent('regame:action:user_died', [level, score]);
                            // @todo - remove this and respond to above event instead
                            bs.pubsub.emitEvent('regame:game:stop');
                            bs.pubsub.emitEvent('regame:status', ["You died! Final Score: " + score]);
                            bs.pubsub.emitEvent('regame:menu:new', ['death']);
                        }
                    } else {
                        // player eats the dead fish and gets some XP (but not as much as if they'd eaten the fish directly)
                        var gain = Math.floor((fish[i].getXP())/2);
                        evolution_points += gain;
                        score += gain;
                        fish[i].reset();
                    }
                }
            }
        }

        this.attemptToDropPoison = function (mouseX, mouseY) {
            console.log('lowercase "level" - why?');
            if (number_of_poison > poison.length) {
                poison.push(new Poison(mouseX, mouseY));
            }
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