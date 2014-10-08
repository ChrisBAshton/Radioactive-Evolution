define(['bootstrap', 'menu/_menu', 'module/controller/game', 'module/controller/achievements'], function (bs, Menu, game, Achievements, layout) {

	var AchievementsMenu = function () {

		var self = this,
			rowHeight;
		bs.extend(Menu, this);

		rowHeight = bs.config.canvas.elements.console * 1.1;
		this.createButton("mainMenu", "Return to menu", (bs.config.canvas.width/2)-(125), rowHeight);
		this.createButton("clear", "Reset all achievements", (bs.config.canvas.width/100)*65, rowHeight, 250, 50);
		
		rowHeight = (bs.config.canvas.height/3);
		this.createButton("level3", "Reached Level 3", (bs.config.canvas.width/100)*35-(250), rowHeight);
		this.createButton("level5", "Reached Level 5", (bs.config.canvas.width/2)-(125), rowHeight);
		this.createButton("level10", "Reached Level 10", (bs.config.canvas.width/100)*65, rowHeight);
		
		rowHeight = (bs.config.canvas.height/1.85);
		this.createButton("earlyDeath", "Die within 5 seconds", (bs.config.canvas.width/100)*35-250, rowHeight);
		this.createButton("bigEarner", "Earn over 200XP", (bs.config.canvas.width/2)-(125), rowHeight);
		this.createButton("fishKiller", "Eat 10 fish in one level", (bs.config.canvas.width/100)*65, rowHeight);
		
		rowHeight = (bs.config.canvas.height/1.35);
		this.createButton("allGrowth", "Purchased all growth upgrades", (bs.config.canvas.width/100)*35-(250), rowHeight);	
		this.createButton("allPoison", "Purchased all poison upgrades", (bs.config.canvas.width/2)-(125), rowHeight);
		this.createButton("allUpgrades", "Purchased all upgrades", (bs.config.canvas.width/100)*65, rowHeight);

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
					if(achievement.isAlreadyAchieved()) {
						icon = this.assets.img_tick;
					} else {
						icon = this.assets.img_cross;
					}
					this.context.drawImage(
						icon, 
						(this.buttons[i].getX()+this.buttons[i].getWidth())-iconSize, 
						(this.buttons[i].getY()+this.buttons[i].getHeight())-iconSize,
						iconSize,
						iconSize
					);
				}
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
			if(achievementInstance.isAlreadyAchieved()) {
				// user has achieved the achievement
				switch(achievementInstance.getTitle()) {
					case "level3":
						bs.pubsub.emitEvent('regame:status', ["Well done on getting to level 3. See if you can do better!"]);
						break;
					case "level5":
						bs.pubsub.emitEvent('regame:status', ["Reach level 10 for a nice surprise..."]);
						break;
					case "level10":
						bs.pubsub.emitEvent('regame:status', ["Enter the following cheat code to gain 1000 XP. CODE: *xp"]);
						break;
					case "earlyDeath":
						bs.pubsub.emitEvent('regame:status', ["Oh dear- looks like you need some help. Unlock flying fish with CODE: *fly"]);
						break;
					case "bigEarner":
						bs.pubsub.emitEvent('regame:status', ["Don't waste your hard-earned XP buying upgrades 'legitimately'. CODE: *camo"]);
						break;
					case "fishKiller":
						bs.pubsub.emitEvent('regame:status', ["You beast! CODE: *grow"]);
						break;
					case "allGrowth":
						bs.pubsub.emitEvent('regame:status', ["You used to be so big!"]);
						break;
					case "allPoison":
						bs.pubsub.emitEvent('regame:status', ["You poisonous thing, you!"]);
						break;
					case "allUpgrades":
						bs.pubsub.emitEvent('regame:status', ["Skip entire levels! CODE: *end"]);
						break;
				}
			} else {
				this.message = null;
			}
		}

	};

	return AchievementsMenu;

});