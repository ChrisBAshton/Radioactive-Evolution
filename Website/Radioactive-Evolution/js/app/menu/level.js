define(['bootstrap', 'menu/_menu', 'module/controller/Game', 'module/controller/Achievements', 'module/model/Layout', 'module/model/Assets',
	'upgrades/camouflage',
	'upgrades/flying_fish',
	'upgrades/grow',
	'upgrades/murky_water',
	'upgrades/poison'], function (bs, Menu, game, Achievements, layout, assets, upgrade_camouflage, upgrade_flying, upgrade_grow, upgrade_murkyWater, upgrade_poison) {

	var MenuLevel = function () {
		
		var self = this;

		bs.extend(Menu, this);

		/**
		* Checks for buttons being hovered over and provides the user with a description
		* of the selected button.
		*
		* @override
		* @method mouseMovedActions
		*/
		this.mouseMovedActions = function() {
			var hoveringOverSomething = false;
			// loop through buttons and update description based on button we're hovering over
			for(var i = 0; i < this.buttons.length; i++) {
				if(this.buttons[i].isSelected()) {
					hoveringOverSomething = true;
					if(this.buttons[i].getKey() === "nextLevel") {
						notification = "Proceed to the next level.";
					} else {
						var hoveringOver = this.getUpgradeInstance(this.buttons[i].getKey());
						if(hoveringOver !== null) {
							if(this.buttons[i].isVisible()) {
								// display description if user is hovering over a visible button
								notification = hoveringOver.getDescription();
							}
						}
					}
				}
			}
			// we aren't hovering over any button, so clear the notification area
			if(!hoveringOverSomething) {
				notification = "";
			}
		}

		/**
		* Returns the upgrade instance (object) of the given string, e.g.
		* if "camouflage" is provided as a parameter, the upgrade_camouflage variable will be returned.
		*
		* @override
		* @method getUpgradeInstance
		* @param {String} upgradeName	The name of the upgrade whose instance (object) we want to find.
		* @return {Upgrade}				The upgrade corresponding to the given string.
		*/
		this.getUpgradeInstance = function(upgradeName) {
			var upgradeInstance = null;
			switch(upgradeName) {
				case "camouflage":
					upgradeInstance = upgrade_camouflage;
					break;
				case "flyingFish":
					upgradeInstance = upgrade_flying;
					break;
				case "grow":
					upgradeInstance = upgrade_grow;
					break;
				case "murkyWater":
					upgradeInstance = upgrade_murkyWater;
					break;
				case "poison":
					upgradeInstance = upgrade_poison;
					break;
			}
			return upgradeInstance;
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
						notification = null;
						level++;
						game.start();
					} else {
						var upgradeClicked = this.getUpgradeInstance(this.buttons[i].getKey());
						if(!upgradeClicked.canUpgrade()) {
							notification = "You have maxed out this upgrade!";
						} else if(!upgradeClicked.canAffordUpgrade()) {
							notification = "You cannot afford this upgrade!";
						} else {
							upgradeClicked.applyUpgrade();
							sound_success.currentTime=0;
							sound_success.play();
							if(!upgradeClicked.canUpgrade()) {
								this.buttons[i].setVisible(false);
							} else {
								this.buttons[i].setText(this.getUpgradeDescription(upgradeClicked));
							}
							notification = "Upgrade purchased!";
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
					if(!this.getUpgradeInstance(this.buttons[i].getKey()).canUpgrade()) {
						this.buttons[i].setVisible(false);
					}
				}
			}
		}

		/**
		* Provides a description and an XP cost for the provided upgrade, ready for overlaying on top of
		* the corresponding button.
		*
		* @override
		* @method getUpgradeDescription
		* @param {Upgrade} upgrade	The mouse's X co-ordinate
		* @return {String} The description of the upgrade.
		*/
		this.getUpgradeDescription = function(upgrade) {
			return (upgrade.getTitle()+" - Level "+(upgrade.getLevel()+1)+" - "+upgrade.getCost()+"XP");
		}

		var init = function () {
			// add custom buttons	
			self.createButton("nextLevel", "Next Level", (layout.getWidth()/2)-(self.button_width/2), layout.getSystemLevel() + 50, self.button_width, self.button_height);
			// temporary variable for setting the button text
			var upgrade;
			
			// set the buttons
			upgrade = upgrade_grow;
			self.createButton("grow", self.getUpgradeDescription(upgrade), (layout.getWidth()/100)*35-(self.button_width), (layout.getHeight()/2)-50, self.button_width, self.button_height );
			
			upgrade = upgrade_poison;
			self.createButton("poison", self.getUpgradeDescription(upgrade), (layout.getWidth()/2)-(self.button_width/2), (layout.getHeight()/2)-50, self.button_width, self.button_height  );
			
			upgrade = upgrade_murkyWater;
			self.createButton("murkyWater", self.getUpgradeDescription(upgrade), (layout.getWidth()/100)*65, (layout.getHeight()/2)-50, self.button_width, self.button_height );
			
			upgrade = upgrade_camouflage;
			self.createButton("camouflage", self.getUpgradeDescription(upgrade), (layout.getWidth()/2)-20 - self.button_width, (layout.getHeight()/1.5), self.button_width, self.button_height );
			
			upgrade = upgrade_flying;
			self.createButton("flyingFish", self.getUpgradeDescription(upgrade), (layout.getWidth()/2)+20, (layout.getHeight()/1.5), self.button_width, self.button_height);
			
			// check for buttons that are hidden
			self.checkButtonVisibility();
		}

		init();
	};

	return MenuLevel;
});