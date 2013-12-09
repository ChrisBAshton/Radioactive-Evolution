

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