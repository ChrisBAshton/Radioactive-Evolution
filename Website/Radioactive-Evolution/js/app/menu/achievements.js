define(['bootstrap', 'menu/_menu', 'module/controller/Game', 'module/controller/Achievements', 'module/model/Layout', 'module/model/Assets'], function (bs, Menu, game, Achievements, layout, assets) {

	var AchievementsMenu = function () {
		
		var self = this;
		bs.extend(Menu, this);

		// add custom buttons	
		this.createButton("mainMenu", "Return to menu", (layout.getWidth()/2)-(this.button_width/2), layout.getSystemLevel() + 50, this.button_width, this.button_height);
		
		this.createButton("level3", "Reached Level 3", (layout.getWidth()/100)*35-(this.button_width), (layout.getHeight()/3), this.button_width, this.button_height );
		this.createButton("level5", "Reached Level 5", (layout.getWidth()/2)-(this.button_width/2), (layout.getHeight()/3), this.button_width, this.button_height);
		this.createButton("level10", "Reached Level 10", (layout.getWidth()/100)*65, (layout.getHeight()/3), this.button_width, this.button_height );
		
		this.createButton("earlyDeath", "Die within 5 seconds", (layout.getWidth()/100)*35-(this.button_width), (layout.getHeight()/3)+(this.button_height+10), this.button_width, this.button_height );
		this.createButton("bigEarner", "Earn over 200XP", (layout.getWidth()/2)-(this.button_width/2), (layout.getHeight()/3)+(this.button_height+10), this.button_width, this.button_height);
		this.createButton("fishKiller", "Kill 10 fish in one level", (layout.getWidth()/100)*65, (layout.getHeight()/3)+(this.button_height+10), this.button_width, this.button_height );
		
		this.createButton("allGrowth", "Purchased all growth upgrades", (layout.getWidth()/100)*35-(this.button_width), (layout.getHeight()/3)+(this.button_height*2)+20, this.button_width, this.button_height );	
		this.createButton("allPoison", "Purchased all poison upgrades", (layout.getWidth()/2)-(this.button_width/2), (layout.getHeight()/3)+(this.button_height*2)+20, this.button_width, this.button_height );
		this.createButton("allUpgrades", "Purchased all upgrades", (layout.getWidth()/100)*65, (layout.getHeight()/3)+(this.button_height*2)+20, this.button_width, this.button_height );
		
		this.createButton("clear", "Reset all achievements", (layout.getWidth()/100)*65, layout.getSystemLevel() + 50, 250, 50);
		
		// used for rewarding user
		this.message;

		/**
		* Print icons over each achievement button, showing the user at a
		* glance whether or not they've achieved that achievement yet.
		*
		* @override
		* @method drawExtra
		*/
		this.drawExtra = function() {
			// set size of icons
			var iconSize = 50,
				achievement,
				icon;

			for(var i = 0; i < this.buttons.length; i++) {
				achievement = Achievements.getAchievementInstance(this.buttons[i].getKey());
				if(achievement !== null) {
					if(achievement.isAchieved()) {
						icon = assets.img_tick;
					} else {
						icon = assets.img_cross;
					}
					context.drawImage(
						icon, 
						(this.buttons[i].getX()+this.buttons[i].getWidth())-iconSize, 
						(this.buttons[i].getY()+this.buttons[i].getHeight())-iconSize,
						iconSize,
						iconSize
					);
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
		this.mouseClicked = function(mouseX,mouseY) {
			for(var i = 0; i < this.buttons.length; i++) {
				if(this.buttons[i].isSelected()) {
					if(this.buttons[i].getKey() == "mainMenu") {
						bs.pubsub.emitEvent('regame:menu:new', ['main']);
					} else if(this.buttons[i].getKey() == "clear") {
						Achievements.reset();
						self.draw();
					} else {
						this.rewardUser(Achievements.getAchievementInstance(this.buttons[i].getKey()));
					}
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
		this.rewardUser = function(achievementInstance) {
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