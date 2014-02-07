define(['bootstrap', 'menu/_menu', 'module/controller/Game', 'module/controller/MenuInstance'], function (bs, Menu, game, menu) {

	var HelpMenu = function () {
		
		bs.extend(Menu, this);
		notification = "Game Paused";

		/**
		* Draws boxes on the screen, with each box containing useful hints and tips.
		*
		* @override
		* @method drawExtra
		*/
		HelpMenu.prototype.drawExtra = function() {
			// use these variables throughout function
			var x, y, width, height, gradient;
			var lineHeight = 20;
			
			context.save();
			
			// define box size and position
			y = bs.config.canvas.elements.console + 20;
			height = bs.config.canvas.elements.water-y-20;
			width = 350;
			x = (bs.config.canvas.width/2) - (width/2);
			// define box background gradient
			gradient = context.createLinearGradient(x,y,x+width,y+height);
			gradient.addColorStop(0, '#FFFFFF');
			gradient.addColorStop(1, '#EDEDED');
			// draw box
			context.beginPath();
			context.rect(x,y,width,height);
			context.fillStyle = gradient;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = '#333333';
			context.closePath();
			context.stroke();
			// print title of box
			context.fillStyle = "#000000";
			context.font = "24px Jura";
			context.textAlign = 'center';
			context.fillText("Press Spacebar to Continue", bs.config.canvas.width/2, y+30);
			
			// define box size and position
			x = 10;
			y = bs.config.canvas.elements.water + 10;
			width = 300;
			height = 250;
			// define box background gradient
			gradient = context.createLinearGradient(x,y,x+width,y+height);
			gradient.addColorStop(0, '#737373');
			gradient.addColorStop(1, '#EDEDED');
			// draw box
			context.beginPath();
			context.rect(x,y,width,height);
			context.fillStyle = gradient;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = '#333333';
			context.closePath();
			context.stroke();
			// print title of box
			context.fillStyle = "#000000";
			context.font = "24px Jura";
			context.textAlign = 'center';
			context.fillText("How To Play", x+(width/2), y+40);
			// print content of box
			context.textAlign = 'left';
			context.font = "16px Verdana";
			var maxWidth = 400;
			var text = "Control your fish by moving the mouse. Watch out for the other fish- each fish has a different speed, size and range! Gain XP by eating radioactive plankton, smaller fish and dead fish. You can spend this XP on various evolutionary upgrades between levels.";
			wrapText(context, text, x+5, y+80, width, lineHeight);
			
			// define box size and position
			x = 330;
			y = bs.config.canvas.elements.water + 10;
			width = 365;
			height = 250;
			// define box background gradient
			gradient = context.createLinearGradient(x,y,x+width,y+height);
			gradient.addColorStop(0, '#737373');
			gradient.addColorStop(1, '#EDEDED');
			// draw box
			context.beginPath();
			context.rect(x,y,width,height);
			context.fillStyle = gradient;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = '#333333';
			context.closePath();
			context.stroke();
			// print title of box
			context.fillStyle = "#000000";
			context.font = "24px Jura";
			context.textAlign = 'center';
			context.fillText("Tactics", x+(width/2), y+40);
			// print content of box
			context.textAlign = 'left';
			context.font = "16px Verdana";
			var maxWidth = 400;
			var text = "The fun is in finding these tactics for yourself, but here are some ideas: 1) purchase the grow upgrade - keep growing and eat smaller fish. 2) Purchase camouflage, flying fish and murky water, avoiding other fish and eating plankton. 3) buy poison and kill the other fish, scavenging XP off their dead bodies.";
			wrapText(context, text, x+5, y+80, width, lineHeight);
			
			
			// define box size and position
			x = bs.config.canvas.width - 280;
			y = bs.config.canvas.elements.water + 10;
			width = 260;
			height = 350;
			// define box background gradient
			gradient = context.createLinearGradient(x,y,x+width,y+height);
			gradient.addColorStop(0, '#737373');
			gradient.addColorStop(1, '#EDEDED');
			// draw box
			context.beginPath();
			context.rect(x,y,width,height);
			context.fillStyle = gradient;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = '#333333';
			context.closePath();
			context.stroke();
			// print title of box
			context.fillStyle = "#000000";
			context.font = "24px Jura";
			context.textAlign = 'center';
			context.fillText("Achievements", x+(width/2), y+40);
			// print content of box
			context.textAlign = 'left';
			context.font = "16px Verdana";
			var text = "Achievements are earned through skillful (and sometimes unskillful!) gameplay. To see which achievements you can unlock, click on 'View Achievements' from the main menu. Click on the achievements you've unlocked- some of them will reveal cheat codes you can input while playing. Try it now! Type '*test' (without the quotes)- you should get a popup box.";
			wrapText(context, text, x+5, y+80, width, lineHeight);
			
			// define box size and position
			x = 50;
			height = 250;
			y = bs.config.canvas.height -height-25;
			width = 600;
			// define box background gradient
			gradient = context.createLinearGradient(x,y,x+width,y+height);
			gradient.addColorStop(0, '#737373');
			gradient.addColorStop(1, '#EDEDED');
			// draw box
			context.beginPath();
			context.rect(x,y,width,height);
			context.fillStyle = gradient;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = '#333333';
			context.closePath();
			context.stroke();
			// print title of box
			context.fillStyle = "#000000";
			context.font = "24px Jura";
			context.textAlign = 'center';
			context.fillText("Using Upgrades", x+(width/2), y+40);
			// print content of box
			context.textAlign = 'left';
			context.font = "16px Verdana";
			var maxWidth = 400;
			var text = "The 'grow' upgrade increases your size so that you can start eating other fish- just swim into them! Poison is slightly more complicated- once unlocked, left click somewhere in the water to leave a toxin. If a fish swims into it, the fish will die and you will be able to eat their carcass. Investing in murky water increases the plankton levels in the water so that you can gain XP more quickly and easily. Camouflage will make you blend into the sand if you swim close enough to it, and flying fish allows you to leap above the surface of the water, out of your predators' reach.";
			wrapText(context, text, x+5, y+80, width, lineHeight);

			
			
			context.restore();
		}

		/**
		* Wraps the supplied text for tidy displaying on the HTML5 canvas (preventing long lines
		* or manual line wrapping).
		* Not a method specific to HelpMenu, but only used by HelpMenu, so no harm in defining it here!
		* Function taken from the following location:
		* http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
		*
		* @method mouseClicked
		* @param {Object} context		The canvas context
		* @param {String} text			The text to display
		* @param {Number} x				Text starting co-ordinate (x)
		* @param {Number} y				Text starting co-ordinate (y)
		* @param {Number} maxWidth		Maximum with for the paragraph
		* @param {Number} lineHeight	The height of each line, in pixels
		*/
		function wrapText(context, text, x, y, maxWidth, lineHeight) {
			var words = text.split(' ');
			var line = '';

			for(var n = 0; n < words.length; n++) {
				var testLine = line + words[n] + ' ';
				var metrics = context.measureText(testLine);
				var testWidth = metrics.width;
				if(testWidth > maxWidth) {
					context.fillText(line, x, y);
					line = words[n] + ' ';
					y += lineHeight;
				}
				else {
					line = testLine;
				}
			}
			context.fillText(line, x, y);
		}

	}

	return HelpMenu;

});