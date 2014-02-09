define(['bootstrap', 'creatures/fish', 'creatures/plankton', 'creatures/poison', 'creatures/user', 'module/model/Countdown'], function (bs, Fish, Plankton, Poison, user, countdown) {

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
            poison = populateArray(Poison, number_of_poison);
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
        */
        this.calculate = function () {
            var i;

            // check user has eaten plankton
            i = plankton.length;
            while (i-- > 0) {
                if(collision(user, plankton[i])) {
                    // play crunch sound. Reset time to zero so that sound plays multiple times if user hits multiple plankton in short time frame
                    bs.pubsub.emitEvent('regame:sound:play', ['crunch']);
                    // remove plankton and gain XP
                    evolution_points++;
                    score++;
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
            // look for an "unused" poison object
            for(i=0; i < poison.length; i++) {
                if(poison[i] == null) {
                    // current poison object is unused, so we can create our poison
                    poison[i] = new Poison(mouseX,mouseY);
                    break;
                }
            }
        };

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

        this.ep = function () {
            return evolution_points;
        }

        this.spendEp = function (amount) {
            evolution_points -= amount;
            if (evolution_points < 0) {
                throw new Exception ("MINUS POINTS");
            }
        }

    };

    return new Level();


});