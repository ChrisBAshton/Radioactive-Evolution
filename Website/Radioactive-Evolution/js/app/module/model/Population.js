define(['bootstrap', 'creatures/user', 'creatures/fish', 'creatures/plankton', 'creatures/poison', '_helpers/object_helper'], function (bs, user, Fish, Plankton, Poison, objects) {

    var plankton,
        fish,
        poison,
        number_of_fish,
        number_of_poison,
        number_of_plankton;

    bs.pubsub.addListener('regame:nextLevel', function () {
        nextLevel();
    });

    bs.pubsub.addListener('regame:upgrade:planktonCountChanged', function (newTotal) {
        number_of_plankton = newTotal;
    });

    bs.pubsub.addListener('regame:upgrade:poisonCountChanged', function (newTotal) {
        number_of_poison = newTotal;
    });

    var animate = function () {
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
    };

    var drawCreatures = function () {
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

    var nextLevel = function () {
        number_of_fish++;
        populate();
    };

    /**
    * Generate all of the creatures for the level.
    */
    this.reset = function () {
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

    /**
    * Check for collisions and process the impact of any such collisions,
    * e.g. the user swimming into plankton.
    *
    * @method calculate
    */
    this.calculate = function () {
        checkUserHasEatenPlankton();
        checkFishHasEatenPoison();
        checkUserAndFishCollision();
    }

    var checkUserHasEatenPlankton = function () {
        var i = plankton.length;
        while (i-- > 0) {
            if(objects.collide(user, plankton[i])) {
                // @TODO - play crunch sound. Reset time to zero so that sound plays multiple times if user hits multiple plankton in short time frame
                bs.pubsub.emitEvent('regame:action:ate_plankton');

                // remove plankton and gain XP
                plankton[i].reset();
            }
        }
    };

    var checkFishHasEatenPoison = function () {
        var i = poison.length;
        while (i-- > 0) {
            // poison has been placed by the user- check against other fish coordinates
            for(var j=0; j < fish.length; j++) {
                // check fish is alive- a dead fish can't eat poison!
                if(fish[j].isAlive()) {
                    // if fish comes into contact with poison
                    if(objects.collide(fish[j], poison[i])) {
                        fish[j].eatPoison();
                        poison.splice(i, 1);
                        break;
                    }
                }
            }         
        }
    };

    var checkUserAndFishCollision = function () {
        i = fish.length;
        while (i-- > 0) {
            if(objects.collide(user, fish[i])) {
                if(fish[i].isAlive()) {
                    // check which fish is bigger
                    if( (user.getWidth() * user.getHeight()) > (fish[i].getWidth() * fish[i].getHeight()) ) {
                        // @TODO - get all below actions to be invoked by this event
                        bs.pubsub.emitEvent('regame:action:killed_fish', [fish[i].getXP()]);
                        fish[i].reset();
                    } else {
                        // user is dead
                        bs.pubsub.emitEvent('temporary-message-from-population.js');
                    }
                } else {
                    // player eats the dead fish and gets some XP (but not as much as if they'd eaten the fish directly)
                    var gain = Math.floor((fish[i].getXP())/2);
                    bs.pubsub.emitEvent('regame:action:killed_fish', [gain]);
                    fish[i].reset();
                }
            }
        }
    };

    var attemptToDropPoison = function (mouseX, mouseY) {
        if (number_of_poison > poison.length) {
            poison.push(new Poison(mouseX, mouseY));
        }
    };

    return {
        animate: animate,
        reset: reset,
        calculate: calculate,
        drawCreatures: drawCreatures,
        attemptToDropPoison: attemptToDropPoison
    };

});