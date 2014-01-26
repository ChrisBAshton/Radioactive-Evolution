define(['bootstrap', 'menu/_menu', 'module/controller/Game', 'module/model/layout'], function (bs, Menu, game, layout) {

	var MainMenu = function () {

		bs.extend(Menu, this);

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
			console.log('clicked in Menu Main');
			for(var i = 0; i < this.buttons.length; i++) {
				if(this.buttons[i].isSelected()) {
					switch(this.buttons[i].getKey()) {
						case "play":
							bs.pubsub.emitEvent('regame:game:start');
							break;
						case "help":
							bs.pubsub.emitEvent('regame:menu:new', ['help']);
							break;
						case "achievements":
							bs.pubsub.emitEvent('regame:menu:new', ['achievements']);
							break;
					}
				}
			}
		};

	};

	return MainMenu;

});