define(['bootstrap', 'module/view/Button', 'module/view/Painter', 'module/model/Assets'], function (bs, Button, painter, assets) {

	/**
	* A menu is practically any screen outside of the core gameplay. It is often made up of buttons which can 
	* be hovered over or clicked, triggering some action.
	* 
	* This class is an abstract Menu, defining attributes and methods shared between all menus that extend it.
	*
	* @class Menu
	* @constructor
	*/
	var Menu = function () {
		var self = this;

		this.assets = assets;

		// declare an array of buttons
		this.buttons = new Array();	// we then use: this.buttons.push(new Button(parameters));

		this.destroy = function () {
			self.buttons = [];
		};

		this.createButton = function (identifier, text, posTopLeft, posBottomLeft, posTopRight, posBottomRight) {

			// add custom buttons
			var button = new Button(identifier, text, posTopLeft, posBottomLeft, posTopRight, posBottomRight);
			this.buttons.push(button);
		};

		/**
		* Draws the menu to the canvas.
		*
		* @method draw
		*/	
		this.draw = function() {
			painter.draw_background();
			painter.draw_summary();
			this.drawButtons();
			// draw anything extra defined in subclasses
			this.drawExtra();
		};

		this.drawButtons = function () {
			// length stored as variable gives better performance (http://stackoverflow.com/a/10167931)
			var length = this.buttons.length;
			// loop through all of the buttons
			for(var i = 0; i < length; i++) {
				this.drawButton(this.buttons[i]);
			}
		}

		this.drawButton = function (button) {
			// default cursor by default, turn to pointer if over a button
			painter.changeCursor("default");

			// only display the button if it is supposed to be visible
			if(button.isVisible()) {
				// selected is true if user is hovering over button, false if not
				var selected = button.isSelected();
				
				// draw button
				context.beginPath();
				context.rect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.fillStyle = '#333333';
				context.fill();
				// draw border button
				context.lineWidth = 1;
				if(selected) {
					// hovering over button, so highlight it with a different border color
					context.strokeStyle = 'yellow';
					painter.changeCursor("pointer");
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
				context.fillText(button.getText(), 
					button.getX()+(button.getWidth()/2), 
					button.getY()+(button.getHeight()/2)+6);
			}
		};

		/**
		* Can be implemented in sublcasses as a function for drawing something on top of the normal menu.
		*
		* @method drawExtra
		*/	
		this.drawExtra = function() {

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
		this.intersects = function(buttonInstance, x2, y2) {
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
		this.mouseMoved = function(mouseX, mouseY) {
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
		this.mouseMovedActions = function() {

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
		this.mouseClicked = function(mouseX,mouseY) {
			console.log('clicked inside Menu', mouseX, mouseY);
		}

		/**
		 * Called when the menu instance changes.
		 */
		this.destroy = function () {
			bs.pubsub.removeEvent('regame:mouse:moved');
		};

		bs.pubsub.addListener('regame:mouse:clicked', function (x, y) {
			console.log('clicked in Menu');
			self.mouseClicked(x, y);
		});

		bs.pubsub.addListener('regame:mouse:moved', function (x, y) {
			self.mouseMoved(x, y);
		});
	}

	return Menu;

});