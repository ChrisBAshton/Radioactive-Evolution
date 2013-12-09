define(['module/model/ClassExtender', 'module/view/Menu', 'module/controller/Game', 'module/controller/MenuInstance'], function (Extender, Menu, game, menu) {

	var MainMenu = function () {

		Extender.extend(Menu, this);

		this.createButton("play", "Play Game", (layout.getWidth()/4)-50, layout.getHeight()/2, this.button_width, this.button_height);
		this.createButton("achievements", "View Achievements",(layout.getWidth()/2)+50, (layout.getHeight()/2), this.button_width, this.button_height);

		// reset global variables
		notification = "Welcome to Radioactive Evolution";

		/**
		* Checks for button presses and responds appropriately.
		*
		* @override
		* @method mouseClicked
		* @param {Number} mouseX	The mouse's X co-ordinate
		* @param {Number} mouseY	The mouse's Y co-ordinate
		*/
		this.mouseClicked = function(mouseX,mouseY) {
			for(var i = 0; i < this.buttons.length; i++) {
				if(this.buttons[i].isSelected()) {
					switch(this.buttons[i].getKey()) {
						case "play":
							game.start();
							break;
						case "help":
							menu.set('help');
							break;
						case "achievements":
							menu.set('achievements');
							break;
					}
				}
			}
		};

	};

	return MainMenu;

});