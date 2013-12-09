/**
*	A script containing almost all of the global variables used throughout the program.
*/

/**
* Countdown/animation variables, etc.
*/
var countdown = new Countdown();
// handler to the animate() interval
var loop;

/**
* Event listeners, key listeners etc
*/
// listen for mouse movements/clicks
define(['IO/EventListener'], function (event) {
	canvas.addEventListener("mousemove",event.mouseMoved,false);
	canvas.addEventListener("mousedown",event.mouseClicked,false);
	// sound event listener
	sound_bg.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
});

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
var user = new User();
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
var painter = new Painter();
var notification;
var menu;