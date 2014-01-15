/**
* Main menu shown when game has loaded, offering the user the chance to play the
* game or view their achievements.
*
* @class MainMenu
* @extends Menu
* @constructor
*/
function MainMenu() {
	// call the parent constructor
	Menu.call(this);
	// add custom buttons
	var play = new Button("play", "Play Game", (layout.getWidth()/4)-50, layout.getHeight()/2, this.button_width, this.button_height);
	var achievements = new Button("achievements", "View Achievements",(layout.getWidth()/2)+50, (layout.getHeight()/2), this.button_width, this.button_height);
	this.buttons.push(play);
	this.buttons.push(achievements);
	// reset global variables
	notification = "Welcome to Radioactive Evolution";
}

// inherit from Creature
MainMenu.prototype = Object.create(Menu.prototype);

/**
* Checks for button presses and responds appropriately.
*
* @override
* @method mouseClicked
* @param {Number} mouseX	The mouse's X co-ordinate
* @param {Number} mouseY	The mouse's Y co-ordinate
*/
MainMenu.prototype.mouseClicked = function(mouseX,mouseY) {
	for(var i = 0; i < this.buttons.length; i++) {
		if(this.buttons[i].isSelected()) {
			switch(this.buttons[i].getKey()) {
				case "play":
					start_game();
					break;
				case "help":
					menu = new HelpMenu();
					break;
				case "achievements":
					menu = new AchievementsMenu();
					break;
			}
		}
	}
}