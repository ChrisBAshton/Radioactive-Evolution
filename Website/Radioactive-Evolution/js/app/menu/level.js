define(['bootstrap', 'menu/_menu', 'module/controller/Achievements', 'module/model/Assets', 'module/controller/UpgradeController'], function (bs, Menu, Achievements, assets, upgradeController) {

	var MenuLevel = function () {
		
		bs.extend(Menu, this);
		var self = this;

		/**
		* Checks for buttons being hovered over and provides the user with a description
		* of the selected button.
		*
		* @override
		* @method mouseMovedActions
		*/
		this.mouseMovedActions = function() {

			console.log("STILL LISTENING FOR MOUSE MOVE in MENU LEVEL");

			var hoveringOverSomething = false;
			// loop through buttons and update description based on button we're hovering over
			for(var i = 0; i < this.buttons.length; i++) {
				if(this.buttons[i].isSelected()) {
					hoveringOverSomething = true;
					if(this.buttons[i].getKey() === "nextLevel") {
						bs.pubsub.emitEvent('regame:status', ["Proceed to the next level."]);
					} else {
						var hoveringOver = upgradeController.get(this.buttons[i].getKey());
						if(hoveringOver !== null) {
							if(this.buttons[i].isVisible()) {
								// display description if user is hovering over a visible button
								bs.pubsub.emitEvent('regame:status', [hoveringOver.getDescription()]);
							}
						}
					}
				}
			}
			// we aren't hovering over any button, so clear the notification area
			if(!hoveringOverSomething) {
				bs.pubsub.emitEvent('regame:status', [""]);
			}
		}

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
					if(this.buttons[i].getKey() === "nextLevel") {
						bs.pubsub.emitEvent('regame:nextLevel');
						bs.pubsub.emitEvent('regame:game:start');
					} else {
						var upgradeClicked = upgradeController.get(this.buttons[i].getKey());
						if(!upgradeClicked.canUpgrade()) {
							bs.pubsub.emitEvent('regame:status', ["You have maxed out this upgrade!"]);
						} else if(!upgradeClicked.canAffordUpgrade()) {
							bs.pubsub.emitEvent('regame:status', ["You cannot afford this upgrade!"]);
						} else {
							upgradeClicked.applyUpgrade();
							bs.pubsub.emitEvent('regame:sound:play', ['success']);
							if(!upgradeClicked.canUpgrade()) {
								this.buttons[i].setVisible(false);
							} else {
								this.buttons[i].setText(upgradeController.getUpgradeDescription(upgradeClicked));
							}
							bs.pubsub.emitEvent('regame:status', ["Upgrade purchased!"]);
						}
					}
				}
			}
		}

		/**
		* Checks all buttons and hides them if their corresponding upgrade has been fully upgraded.
		*
		* @method checkButtonVisibility
		*/
		this.checkButtonVisibility = function() {
			for(var i = 0; i < this.buttons.length; i++) {
				if(this.buttons[i].getKey() != "nextLevel") {
					if(!upgradeController.get(this.buttons[i].getKey()).canUpgrade()) {
						this.buttons[i].setVisible(false);
					}
				}
			}
		}

		var init = function () {
			// add custom buttons	
			self.createButton("nextLevel", "Next Level", (bs.config.canvas.width/2)-(self.button_width/2), bs.config.canvas.elements.console + 50, self.button_width, self.button_height);

			var upgrades = upgradeController.get(),
				upgrade,
				positions = [
					[
						(bs.config.canvas.width/100)*35-(self.button_width), 
						(bs.config.canvas.height/2)-50
					],
					[
						(bs.config.canvas.width/2)-(self.button_width/2),
						(bs.config.canvas.height/2)-50
					],
					[
						((bs.config.canvas.width/100)*65),
						(bs.config.canvas.height/2)-50
					],
					[
						((bs.config.canvas.width/2)-20)-self.button_width,
						(bs.config.canvas.height/1.5)
					],
					[
						((bs.config.canvas.width/2)+20),
						(bs.config.canvas.height/1.5)
					]
				];

			for (var i =0; i < upgrades.length; i++) {
				upgrade = upgrades[i];
				self.createButton(
					upgrade.getTitle(), 
					upgradeController.getUpgradeDescription(upgrade), 
					positions[i][0], 
					positions[i][1],
					self.button_width, 
					self.button_height
				);
			}
			
			// check for buttons that are hidden
			self.checkButtonVisibility();
		}

		init();
	};

	return MenuLevel;
});