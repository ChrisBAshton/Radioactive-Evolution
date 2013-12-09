define(['module/model/ClassExtender', 'module/view/Menu', 'module/controller/Game', 'module/controller/MenuInstance'], function (Extender, Menu, game, menu) {

	var AchievementsMenu = function () {
		
		Extender.extend(Menu, this);

		// add custom buttons	
		var mainMenu = new Button("mainMenu", "Return to menu", (layout.getWidth()/2)-(this.button_width/2), layout.getSystemLevel() + 50, this.button_width, this.button_height);
		
		var level3 = new Button("level3", "Reached Level 3", (layout.getWidth()/100)*35-(this.button_width), (layout.getHeight()/3), this.button_width, this.button_height );
		var level5 = new Button("level5", "Reached Level 5", (layout.getWidth()/2)-(this.button_width/2), (layout.getHeight()/3), this.button_width, this.button_height);
		var level10 = new Button("level10", "Reached Level 10", (layout.getWidth()/100)*65, (layout.getHeight()/3), this.button_width, this.button_height );
		
		var earlyDeath = new Button("earlyDeath", "Die within 5 seconds", (layout.getWidth()/100)*35-(this.button_width), (layout.getHeight()/3)+(this.button_height+10), this.button_width, this.button_height );
		var bigEarner = new Button("bigEarner", "Earn over 200XP", (layout.getWidth()/2)-(this.button_width/2), (layout.getHeight()/3)+(this.button_height+10), this.button_width, this.button_height);
		var fishKiller = new Button("fishKiller", "Kill 10 fish in one level", (layout.getWidth()/100)*65, (layout.getHeight()/3)+(this.button_height+10), this.button_width, this.button_height );
		
		var allGrowth = new Button("allGrowth", "Purchased all growth upgrades", (layout.getWidth()/100)*35-(this.button_width), (layout.getHeight()/3)+(this.button_height*2)+20, this.button_width, this.button_height );	
		var allPoison = new Button("allPoison", "Purchased all poison upgrades", (layout.getWidth()/2)-(this.button_width/2), (layout.getHeight()/3)+(this.button_height*2)+20, this.button_width, this.button_height );
		var allUpgrades = new Button("allUpgrades", "Purchased all upgrades", (layout.getWidth()/100)*65, (layout.getHeight()/3)+(this.button_height*2)+20, this.button_width, this.button_height );
		
		var clear = new Button("clear", "Reset all achievements", (layout.getWidth()/100)*65, layout.getSystemLevel() + 50, 250, 50);
		
		this.buttons.push(mainMenu);
		this.buttons.push(level3);
		this.buttons.push(level5);
		this.buttons.push(level10);
		this.buttons.push(earlyDeath);
		this.buttons.push(bigEarner);
		this.buttons.push(fishKiller);
		this.buttons.push(allGrowth);
		this.buttons.push(allPoison);
		this.buttons.push(allUpgrades);
		this.buttons.push(clear);
		
		// used for rewarding user
		this.message;


		/**
		* Print icons over each achievement button, showing the user at a
		* glance whether or not they've achieved that achievement yet.
		*
		* @override
		* @method drawExtra
		*/
		AchievementsMenu.prototype.drawExtra = function() {
			// set size of icons
			var iconSize = 50;
			for(var i = 0; i < this.buttons.length; i++) {
				var achievement = null;
				for(var j = 0; j < achievements.length; j++) {
					if(achievements[j].getTitle() == this.buttons[i].getKey()) {
						achievement = achievements[j];
					}
				}
				if(achievement !== null) {
					if(achievement.isAchieved()) {
						context.drawImage(
							img_tick, 
							(this.buttons[i].getX()+this.buttons[i].getWidth())-iconSize, 
							(this.buttons[i].getY()+this.buttons[i].getHeight())-iconSize,
							iconSize,
							iconSize
						);
					} else {
						context.drawImage(
							img_cross, 
							(this.buttons[i].getX()+this.buttons[i].getWidth())-iconSize, 
							(this.buttons[i].getY()+this.buttons[i].getHeight())-iconSize,
							iconSize,
							iconSize
						);
					}
				}
			}
			if(this.message) {
				// draw box
				context.fillStyle = "black";
				context.fillRect(
					(layout.getWidth()/100)*35-(this.button_width), 
					layout.getSandLevel()+15, 
					(layout.getWidth() /100) *80, 
					25
				);
				
				// write message
				context.fillStyle = "#FFFFFF";
				context.font = "12px Verdana";
				context.textAlign = 'center';
			
				context.fillText(this.message, (layout.getWidth()/2), layout.getSandLevel()+30);
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
		AchievementsMenu.prototype.mouseClicked = function(mouseX,mouseY) {
			for(var i = 0; i < this.buttons.length; i++) {
				if(this.buttons[i].isSelected()) {
					if(this.buttons[i].getKey() == "mainMenu") {
						menu = new MainMenu();
					} else if(this.buttons[i].getKey() == "clear") {
						// clear all achievements
						localStorage.clear();
						// initialise all achievements to false
						loadAchievements();
					} else {
						this.rewardUser(this.getAchievementInstance(this.buttons[i].getKey()));
					}
				}
			}
		}

		/**
		* Get instance of the achievement, given its name.
		*
		* @method getAchievementInstance
		* @param {String} achievementName	Name of the achievement
		* @return {Achievement} 			Instantiated achievement object.
		*/
		AchievementsMenu.prototype.getAchievementInstance = function(achievementName) {
			for(var i = 0; i < achievements.length; i++) {
				if(achievements[i].getTitle() == achievementName) {
					return achievements[i];
				}
			}
		}

		/**
		* Looks at the selected achievement and displays a message at the bottom of the menu.
		* Some achievements unlock cheat codes, which are displayed here. However, some will 
		* merely display a "humorous" *cough cough* message.
		*
		* @method rewardUser
		* @param {Achievement} achievementInstance	Achievement object selected
		*/
		AchievementsMenu.prototype.rewardUser = function(achievementInstance) {
			if(achievementInstance.isAchieved()) {
				// user has achieved the achievement
				switch(achievementInstance.getTitle()) {
					case "level3":
						this.message = "Well done on getting to level 3. See if you can do better!";
						break;
					case "level5":
						this.message = "Reach level 10 for a nice surprise...";
						break;
					case "level10":
						this.message = "Enter the following cheat code to gain 1000 XP. CODE: *xp";
						break;
					case "earlyDeath":
						this.message = "Oh dear- looks like you need some help. Unlock flying fish with CODE: *fly";
						break;
					case "bigEarner":
						this.message = "Don't waste your hard-earned XP buying upgrades 'legitimately'. CODE: *camo";
						break;
					case "fishKiller":
						this.message = "You beast! CODE: *grow";
						break;
					case "allGrowth":
						this.message = "You used to be so big!";
						break;
					case "allPoison":
						this.message = "You poisonous thing, you!";
						break;
					case "allUpgrades":
						this.message = "Skip entire levels! CODE: *end";
						break;
				}
			} else {
				this.message = null;
			}
		}

	};

	return AchievementsMenu;

});