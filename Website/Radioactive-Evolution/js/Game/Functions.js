/**
* This script defines many important gameplay functions.
*/

/**
* Starts the application. Loads the achievements stored in HTML5 local storage,
* sets the game variables and creates and draws the main menu.
*
* @method start_app
*/
function start_app() {
	// load achievements from HTML5 local storage, if any
	loadAchievements();
	// set game variables
	reset_game();
	// load menu
	menu = new MainMenu();
	menu.draw();
}

/**
* Starts the game, not necessarily from scratch. This method is called both from the main
* menu when a game is first started, and from the level menu when the user chooses to progress
* to the next level.
*
* @method start_game
*/
function start_game() {
	// check achievements have been achieved
	checkAchievements();
	// nullify the menu
	menu = null;
	// hide the cursor
	changeCursor("none");
	// start game animation
	loop = setInterval(function(){animate()}, countdown.getFrameInterval());
	// generate fish and plankton
	populate();
	// reset countdown timer
	countdown.reset();
	// start background noise
	sound_bg.play();
	// draw the first game frame
	painter.redraw();
}

/**
* Pauses the game and brings up the help menu.
*
* @method pause_game
*/
function pause_game() {
	// stop animation
	clearInterval(loop);
	// create help menu
	menu = new HelpMenu();
	// draw menu
	menu.draw();
}

/**
* Resumes the game, hiding the help menu and restarting the gaming animation.
*
* @method resume_game()
*/
function resume_game() {
	// resume animation
	loop = setInterval(function(){animate()}, countdown.getFrameInterval());
	// remove menu
	menu = null;
	// hide cursor
	changeCursor("none");
	// paint game
	painter.redraw();
}

/**
* Stops the game, either from the user dying or the user reaching the LevelMenu. Does
* the same calculations either way.
* Stops game procedure and draws the appropriate menu.
*
* @method stop_game
*/
function stop_game() {
	// stop background noise
	sound_bg.currentTime = 0;
	sound_bg.pause();
	// stop animation
	clearInterval(loop);
	// check for any new achievements gained
	checkAchievements();
	// give the user their cursor back!
	changeCursor("default");
	// draw the menu
	// glitch - for some obscure reason, calling menu.draw() directly doesn't work 
	// in this instance, so we get the setTimeout function to call it
	setTimeout(function(){menu.draw();}, 0);
}

/**
* Called before stop_game(). Resets all of the vital game variables, including
* level, XP earned, etc.
*
* @method reset_game
*/
function reset_game() {
	// reset level variables
	notification = "";
	xp = 0;
	final_score = 0;
	fish_killed = 0;
	level = 1;
	user.reset();
	// reset upgrades
	var upgrades = new Array(upgrade_camouflage, upgrade_flying, upgrade_grow, upgrade_murkyWater, upgrade_poison);
	for(var i = 0; i < upgrades.length; i++) {
		upgrades[i].reset();
	}
}

/**
* Changes the cursor to the specified type.
*
* @method changeCursor
* @param {String} cursor	The cursor to change to.
*/
function changeCursor(cursor) {
	switch(cursor) {
		case "none":
			// hide cursor (e.g. during gameplay)
			document.getElementById(CANVAS_NAME).style.cursor = "none";
			//document.getElementById(CANVAS_NAME).style.cursor = 'url("Radioactive-Evolution/images/blank.cur"), none';
			break;
		case "default":
			// show the cursor so that user can find their way around menu
			document.getElementById(CANVAS_NAME).style.cursor = "default";
			break;
			// turn cursor into hand to show that something is clickable
		case "pointer":
			document.getElementById(CANVAS_NAME).style.cursor = "pointer";
			break;
		default:
			document.getElementById(CANVAS_NAME).style.cursor = "auto";
	}
}

/**
* Checks local storage for previously achieved achievements.
*
* @method loadAchievements
*/
function loadAchievements() {
	achievements = new Array(new Level3(), new Level5(), new Level10(), new EarlyDeath(), new BigEarner(), new FishKiller(), new AllGrowth(), new AllPoison(), new AllUpgrades());
	for(var i = 0; i < achievements.length; i++) {
		// check local storage for achieved achievements
		var savedAchievement = localStorage[achievements[i].getTitle()];
		// first time user, so achievements haven't been earned- save this in local storage
		if(savedAchievement == null) {
			localStorage[achievements[i].getTitle()] = false;
		} else if(savedAchievement == true || savedAchievement == "true") {
			/*
				Cannot set boolean values, but W3C updated the spec in 2009 to accept booleans. I'm implementing
				backwards compatibility.
				http://stackoverflow.com/questions/3263161/cannot-set-boolean-values-in-localstorage
			*/
			// user has achieved achievement in the past, so update the achievement with this.
			achievements[i].setAchieved(true);
		}
	}
}

/**
* Loop through all achievements and check each of them to see if they've been achieved.
*
* @method checkAchievements
*/
function checkAchievements() {
	for(var i = 0; i < achievements.length; i++) {
		// only check achievements that have not yet been achieved
		if(!achievements[i].isAchieved()) {
			achievements[i].checkAchieved();
		}
	}
}

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

/**
* Check for collisions and process the impact of any such collisions,
* e.g. the user swimming into plankton.
*
* @method calculate
*/
function calculate() {
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
* @param {Creature} obj1	The first object
* @param {Creature} obj2	The second object
* @return {Boolean}			True if the two objects have collided
*/
function collision(obj1, obj2) {
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
}