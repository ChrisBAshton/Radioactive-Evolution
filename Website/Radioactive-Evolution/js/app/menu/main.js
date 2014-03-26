define(['bootstrap', 'menu/_menu', 'module/controller/game'], function (bs, Menu, game) {

	var MainMenu = function () {

		bs.extend(Menu, this);
		bs.pubsub.emitEvent('regame:status', ["Welcome to Radioactive Evolution"]);

		this.createButton("play", "Play Game", (bs.config.canvas.width/4)-50, bs.config.canvas.height/2);
		this.createButton("achievements", "View Achievements",(bs.config.canvas.width/2)+50, (bs.config.canvas.height/2));

		/**
		* Checks for button presses and responds appropriately.
		*
		* @override
		* @method mouseClicked
		* @param {Number} mouseX	The mouse's X co-ordinate
		* @param {Number} mouseY	The mouse's Y co-ordinate
		*/
		this.mouseClicked = function (mouseX, mouseY) {
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