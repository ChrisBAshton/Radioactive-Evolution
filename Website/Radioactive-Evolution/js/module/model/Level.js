define(['module/controller/pubsub', 'Creatures/Fish', 'Creatures/User'], function (pubsub, Fish, user) {


/**
* Countdown/animation variables, etc.
*/
var countdown = new Countdown();
// handler to the animate() interval
var loop;

/**
* Gaming variables
*/
// level variables
var level;
var final_score;
var xp;
var fish_killed;
var number_of_plankton;
var number_of_fish;
var number_of_poison;
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
var menu;

/**
* Move all creatures and paint results to canvas.
* If countdown reaches zero, trigger LevelMenu.
*
* @method animate
*/
function animate() {
    // move user if appropriate keyboard key is down
    user.keyboardMove();
    
    // move plankton
    for(var i=0; i < number_of_plankton; i++) {
        plankton[i].move();
        plankton[i].glow();
    }
    // move poison
    for(var i=0; i < number_of_poison; i++) {
        if(poison[i] !== null) {
            poison[i].move();
        }
    }
    // move fish
    for(var i=0; i < number_of_fish; i++) {
        fish[i].move();
    }
    countdown.nextFrame();
    if(countdown.secondsLeft() <= 0) {
        // user survived the level and now has the opportunity to purchase upgrades
        menu = new LevelMenu();
        stop_game();
    }
    // calculate collisions etc
    calculate();
    painter.redraw();
}

/**
* Generate all of the creatures for the level.
*
* @method populate
*/
function populate() {
    if(level === 1) {
        number_of_fish = 3;
    } else {
        number_of_fish++;
    }
    // reset creatures between levels
    for(var i=0; i < number_of_plankton; i++) {
        plankton[i] = new Plankton();
    }
    for(var i=0; i < number_of_fish; i++) {
        fish[i] = new Fish();
    }
    for(var i=0; i < number_of_poison; i++) {
        poison[i] = null;
    }
}


});