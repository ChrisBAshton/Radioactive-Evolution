/**
* A menu is practically any screen outside of the core gameplay. It is often made up of buttons which can 
* be hovered over or clicked, triggering some action.
* 
* This class is an abstract Menu, defining attributes and methods shared between all menus that extend it.
*
* @class Menu
* @constructor
*/
function Menu() {
	// define standard button width and height
	this.button_width = 250;
	this.button_height = 120;
	// declare an array of buttons
	this.buttons = new Array();	// we then use: this.buttons.push(new Button(parameters));
}

/**
* Draws the menu to the canvas.
*
* @method draw
*/	
Menu.prototype.draw = function() {
	painter.draw_background();
	painter.draw_summary();
	
	// default cursor by default, turn to pointer if over a button
	changeCursor("default");

	// length stored as variable gives better performance (http://stackoverflow.com/a/10167931)
	var length = this.buttons.length;
	// loop through all of the buttons
	for(var i = 0; i < length; i++) {
		// only display the button if it is supposed to be visible
		if(this.buttons[i].isVisible()) {
			// selected is true if user is hovering over button, false if not
			var selected = this.buttons[i].isSelected();
			
			// draw button
			context.beginPath();
			context.rect(this.buttons[i].getX(), this.buttons[i].getY(), this.buttons[i].getWidth(), this.buttons[i].getHeight());
			context.fillStyle = '#333333';
			context.fill();
			// draw border button
			context.lineWidth = 1;
			if(selected) {
				// hovering over button, so highlight it with a different border color
				context.strokeStyle = 'yellow';
				changeCursor("pointer");
			} else {
				context.strokeStyle = '#FFFFFF';
			}
			context.closePath();
			context.stroke();
			
			// paste button text
			if(selected) {
				context.fillStyle = "#FFFFFF";
			} else {
				context.fillStyle = "#737373";
			}
			context.font = "bold 16px Arial";
			context.textAlign = 'center';
			context.fillText(this.buttons[i].getText(), 
				this.buttons[i].getX()+(this.buttons[i].getWidth()/2), 
				this.buttons[i].getY()+(this.buttons[i].getHeight()/2)+6);
		}
	}
	
	// draw anything extra defined in subclasses
	this.drawExtra();
}

/**
* Can be implemented in sublcasses as a function for drawing something on top of the normal menu.
*
* @method drawExtra
*/	
Menu.prototype.drawExtra = function() {

}

/**
* Checks if the mouse is hovering over the specified button
*
* @method intersects
* @param {Button} buttonInstance	The button we're checking against
* @param {Number} x2				The mouse's X co-ordinate
* @param {Number} y2				The mouse's Y co-ordinate
* @return {Boolean} 				Returns true if mouse is hovering over the button
*/
Menu.prototype.intersects = function(buttonInstance, x2, y2) {
	var x1 = buttonInstance.getX();
	var y1 = buttonInstance.getY();
	var w = buttonInstance.getWidth();
	var h = buttonInstance.getHeight();
	return (x1 <= x2 
		&& (x1 + w) >= x2
		&& (y1 <= y2)
		&& (y1 + h) >= y2);
}

/**
* Triggered when the mouse moves. Checks if the mouse is hovering over a button, 
* highlighting the button if so.
*
* @method mouseMoved
* @param {Number} x2	The mouse's X co-ordinate
* @param {Number} y2	The mouse's Y co-ordinate
*/
Menu.prototype.mouseMoved = function(mouseX,mouseY) {
	// loop through buttons to highlight any buttons cursor may be hovering over
	for(var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].setSelected(this.intersects(this.buttons[i], mouseX, mouseY));
	}
	this.mouseMovedActions();
}

/**
* Objects inheriting from Menu can define the mouseMovedActions
* method to perform additional actions when the mouse moves.
*
* @method mouseMovedActions
*/	
Menu.prototype.mouseMovedActions = function() {

}

/**
* A cursor must move to a button before it can click on the button, so it will
* already invoke the menu.mouseMoved() method.
*
* The menu.mouseMoved() method will set the `selected` attribute to true for any
* button that lies beneath the cursor.
*
* Therefore, any button that is "selected" at the time of a mouse click is the button
* that the user wants to click.
* 
* In classes that inherit from Menu, it's a case of using the following code:
* 
* for(var i = 0; i < this.buttons.length; i++) {
* 	if(this.buttons[i].isSelected()) {
* 		switch(this.buttons[i].getKey()) {
* 			case "button1":
* 				// do something
* 				break;
* 			case "button2":
* 				// do something;
* 				break;
* 		}
* 	}
* }
*
* @method mouseClicked
* @param {Number} mouseX	The mouse's X co-ordinate
* @param {Number} mouseY	The mouse's Y co-ordinate
*/
Menu.prototype.mouseClicked = function(mouseX,mouseY) {

}