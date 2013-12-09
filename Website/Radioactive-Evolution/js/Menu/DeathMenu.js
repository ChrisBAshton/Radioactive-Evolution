/**
* The menu shown when the user dies; offers them the chance to restart or 
* return to the main menu.
*
* @class DeathMenu
* @extends Menu
* @constructor
*/
function DeathMenu() {
	// call the parent constructor
	Menu.call(this);
	// add custom buttons	
	var restart = new Button("restart", "Restart", (layout.getWidth()/4)-50, layout.getHeight()/2, this.button_width, this.button_height);
	var mainMenu = new Button("mainMenu", "Return to main menu",(layout.getWidth()/2)+50, (layout.getHeight()/2), this.button_width, this.button_height);
	this.buttons.push(restart);
	this.buttons.push(mainMenu);
	// custom menu stuff
	sound_death.play();
	notification = "You died! Final Score: "+final_score;
}

// inherit from Creature
DeathMenu.prototype = Object.create(Menu.prototype);

/**
* Checks for button presses and responds appropriately.
*
* @override
* @method mouseClicked
* @param {Number} mouseX	The mouse's X co-ordinate
* @param {Number} mouseY	The mouse's Y co-ordinate
*/
DeathMenu.prototype.mouseClicked = function(mouseX,mouseY) {
	for(var i = 0; i < this.buttons.length; i++) {
		if(this.buttons[i].isSelected()) {
			switch(this.buttons[i].getKey()) {
				case "restart":
					reset_game();
					start_game();
					break;
				case "mainMenu":
					reset_game();
					menu = new MainMenu();
					break;
			}
		}
	}
}