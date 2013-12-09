/**
* Defines some keyboard controls and cheat codes.
*/

if (typeof Mousetrap !== 'undefined') {

	// movement
	var keyboardControls = ['w', 's', 'a', 'd'];
	Mousetrap.bind(keyboardControls, function(e, key) { user.keyboardControl(key); }, 'keydown');
	Mousetrap.bind(keyboardControls, function() { user.keyboardPause(); }, 'keyup');

	// help screen
	Mousetrap.bind('space', function() {
		if(!menu) {
			pause_game();
		} else if(notification == "Game Paused") {
			// only resumes the game if the user is on the help screen (i.e. the game is paused)
			// this stops the spacebar being active in the main menu, etc
			resume_game();
		}
	});

	/*
		CHEATS!
	*/

	// test
	Mousetrap.bind('* t e s t', function() {
		sound_success.currentTime=0;
		sound_success.play();
		window.alert("Isn't that cool?");
	});

	// gain 1000 xp
	Mousetrap.bind('* x p', function() {
		xp += 1000; 
		sound_success.currentTime=0;
		sound_success.play();
	});

	// end level
	Mousetrap.bind('* e n d', function() {
		countdown.countdown = 0;
		sound_success.currentTime=0;
		sound_success.play();
	});

	// grow to full size
	Mousetrap.bind('* g r o w', function() {
		// make a note of the user's current XP
		var tempXP = xp;
		// grow until user cannot grow anymore
		while(upgrade_grow.canUpgrade()) {
			upgrade_grow.applyUpgrade();
		}
		// reset XP to the value it was before the upgrades
		xp = tempXP;
		sound_success.currentTime=0;
		sound_success.play();
	});

	//  unlock camouflage
	Mousetrap.bind('* c a m o', function() {
		// make a note of the user's current XP
		var tempXP = xp;
		// apply upgrade
		while(upgrade_camouflage.canUpgrade()) {
			upgrade_camouflage.applyUpgrade();
		}
		// reset XP to the value it was before the upgrades
		xp = tempXP;
		sound_success.currentTime=0;
		sound_success.play();
	});

	//  unlock flying fish
	Mousetrap.bind('* f l y', function() {
		// make a note of the user's current XP
		var tempXP = xp;
		// apply upgrade
		while(upgrade_flying.canUpgrade()) {
			upgrade_flying.applyUpgrade();
		}
		// reset XP to the value it was before the upgrades
		xp = tempXP;
		sound_success.currentTime=0;
		sound_success.play();
	});

}