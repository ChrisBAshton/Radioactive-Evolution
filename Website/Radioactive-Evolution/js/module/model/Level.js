define(['module/controller/pubsub', 'module/model/LevelConfig', 'Creatures/Fish', 'Creatures/Plankton', 'Creatures/User', 'module/model/Countdown'], function (pubsub, LevelConfig, Fish, Plankton, user, countdown) {

    console.log(LevelConfig);

    /**
    * Gaming variables
    */
    // level variables
    var level;
    var final_score;
    var xp;
    var fish_killed;
    // "real world" objects
    var poison = new Array();
    var plankton = new Array();
    var fish = new Array();
    // upgrades
    var upgrade_camouflage;
    var upgrade_flying;
    var upgrade_grow;
    var upgrade_murkyWater;
    var upgrade_poison;
    // achievements are stored in this array
    var achievements;
    // "functional" objects
    var notification;

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
            
            // move plankton
            for(var i=0; i < LevelConfig.number_of_plankton; i++) {
                plankton[i].move();
                plankton[i].glow();
            }
            // move poison
            for(var i=0; i < LevelConfig.number_of_poison; i++) {
                if(poison[i] !== null) {
                    poison[i].move();
                }
            }
            // move fish
            for(var i=0; i < LevelConfig.number_of_fish; i++) {
                fish[i].move();
            }
            countdown.nextFrame();
            if(countdown.secondsLeft() <= 0) {
                // user survived the level and now has the opportunity to purchase upgrades
                menu = new LevelMenu();
                stop_game();
            }
            // calculate collisions etc
            self.calculate();
            painter.redraw();
        };

        /**
        * Generate all of the creatures for the level.
        *
        * @method populate
        */
        this.populate = function () {
            if(level === 1) {
                LevelConfig.update({number_of_fish: 3});
            } else {
                LevelConfig.update({number_of_fish: (LevelConfig.number_of_fish++)});
            }
            // reset creatures between levels
            for(var i=0; i < LevelConfig.number_of_plankton; i++) {
                plankton[i] = new Plankton();
            }
            console.log('DIES HERE:');
            for(var i=0; i < LevelConfig.number_of_fish; i++) {
                fish[i] = new Fish();
            }
            console.log('How about here?');
            for(var i=0; i < LevelConfig.number_of_poison; i++) {
                poison[i] = null;
            }
        };

        /**
        * Check for collisions and process the impact of any such collisions,
        * e.g. the user swimming into plankton.
        *
        * @method calculate
        */
        this.calculate = function () {
            // check user has eaten plankton
            for(var i=0; i < number_of_plankton; i++) {
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
            
            // check fish has wandered into poison
            for(var i=0; i < number_of_poison; i++) {
                if(poison[i] !== null) {
                    // poison has been placed by the user- check against other fish coordinates
                    for(var j=0; j < number_of_fish; j++) {
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
            for(var i=0; i < number_of_fish; i++) {
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
                            menu = new DeathMenu();
                            stop_game();
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
        this.collision = function (obj1, obj2) {
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

        this.fish = fish;

        this.poison = poison;

        this.plankton = plankton;

    };

    return new Level();


});