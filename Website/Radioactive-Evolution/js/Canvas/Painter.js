/**
* An abstract class that paints the game environment to the canvas, including the
* background, fish, plankton, etc.
*
* @class Painter
* @constructor
*/
function Painter() {
}
	
/**
* Draws the entire gaming environment to the canvas.
*
* @method redraw
*/
Painter.prototype.redraw = function() {
	// draw background
	this.draw_background();
	
	// draw plankton
	for(var i=0; i < number_of_plankton; i++) {
		plankton[i].draw();
	}
	
	// draw poison
	for(var i=0; i < number_of_poison; i++) {
		if(poison[i] != null) {
			poison[i].draw();
		}
	}
	
	// draw fish
	for(var i=0; i < number_of_fish; i++) {
		fish[i].draw();
	}
	
	// draw user
	user.draw();
	
	// draw level summary
	this.draw_summary();
}

/**
* Draws the canvas background (i.e. sun, clouds, water etc)
*
* @method draw_background
*/
Painter.prototype.draw_background = function() {
	context.save();
	
	// Create Linear Gradients
	var lingrad = context.createLinearGradient(0,0,0,layout.getSystemLevel());
	lingrad.addColorStop(0, '#7d7e7d');
	lingrad.addColorStop(1, '#0e0e0e');
	// draw sky
	context.fillStyle="#EDEDED";
	context.fillRect(0, layout.getSystemLevel(), layout.getWidth(), (layout.getHeight()-layout.getSystemLevel()));
	context.drawImage(img_cloud_1, 10, 30);
	context.drawImage(img_cloud_2, 300, 40);
	context.drawImage(img_sun, (layout.getWidth()-200), 20);
	// draw system background
	context.fillStyle = lingrad;
	context.fillRect(0, 0, layout.getWidth(), layout.getSystemLevel());
	// draw water
	context.fillStyle="#82CAFF";
	context.fillRect(0, layout.getWaterLevel(), layout.getWidth(), (layout.getHeight()-layout.getWaterLevel()));
	context.drawImage(img_water,0,layout.getWaterLevel(), layout.getWidth(), layout.getSandLevel());
	// draw sand
	context.fillStyle="#FFF380";
	context.fillRect(0, layout.getSandLevel(), layout.getWidth(), (layout.getHeight()-layout.getSandLevel()));
	context.drawImage(img_sand,0,layout.getSandLevel());
	
	context.restore();
}

/**
* Draws the gaming information, including level, XP, and time left.
*
* @method draw_summary
*/
Painter.prototype.draw_summary = function() {
	context.save();
	context.fillStyle = "#FFFFFF";
	context.font = "24px Jura";
	context.textAlign = 'left';
	context.fillText("Level "+level, 10, 30);
	
	context.textAlign = 'center';
	if(!menu) {
		if(countdown.secondsLeft() <= 5) {
			// set text to red
			context.fillStyle = "red";
		}
		context.fillText("Time Left: "+countdown.secondsLeft(), layout.getWidth()/2, 30);
		if(countdown.secondsLeft() <= 5) {
			// now reset to normal color
			context.fillStyle = "#FFFFFF";
		}
		
		// add help instructions
		context.save();
		context.font = "12px Jura";
		context.fillText("Press space for help", layout.getWidth()/2, 48);
		context.restore();
		
	} else if(notification != null) {
		context.fillText(notification, layout.getWidth()/2, 30);
	}
	context.textAlign = 'right';
	context.fillText(xp+" XP", layout.getWidth()-10, 30);
	context.restore();
}