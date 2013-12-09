define(function () {

	/**
	* A menu is practically any screen outside of the core gameplay. It is often made up of buttons which can 
	* be hovered over or clicked, triggering some action.
	* 
	* This class is an abstract Menu, defining attributes and methods shared between all menus that extend it.
	*
	* @class Button
	* @constructor
	* @param {String} key		A unique identifier for the button.
	* @param {String} text		Text to display on top of the button
	* @param {Number} x			Starting co-ordinate (x)
	* @param {Number} y			Starting co-ordinate (y)
	* @param {Number} width		Button width
	* @param {Number} height	Button height
	*/
	var Button = function (key,text,x,y, width, height) {
		this.key = key;
		this.text = text;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.visible = true;
		this.selected = false;

		/**
		* Return the button's key (unique identifier)
		*
		* @method getKey
		* @return {String} 	The button key (identifier)
		*/
		Button.prototype.getKey = function() {
			return this.key;
		}

		/**
		* Returns the button text
		*
		* @method getText
		* @return {String}	the button text
		*/
		Button.prototype.getText = function() {
			return this.text;
		}

		/**
		* Sets the button text
		*
		* @method setText
		* @param {String} text	The button text
		*/
		Button.prototype.setText = function(text) {
			this.text = text;
		}

		/**
		* Returns the button x co-ordinate
		*
		* @method getX
		* @return {Number} 	x co-ordinate
		*/
		Button.prototype.getX = function() {
			return this.x;
		}

		/**
		* Returns the button y co-ordinate
		*
		* @method getY
		* @return {Number} 	y co-ordinate
		*/
		Button.prototype.getY = function() {
			return this.y;
		}

		/**
		* Returns the button width
		*
		* @method getWidth
		* @return {Number} 	Width of the button in pixels
		*/
		Button.prototype.getWidth = function() {
			return this.width;
		}

		/**
		* Returns the button height
		*
		* @method getHeight
		* @return {Number} 	Height of the button in pixels
		*/
		Button.prototype.getHeight = function() {
			return this.height;
		}

		/**
		* Checks if the button is visible.
		*
		* @method isVisible
		* @return {Boolean} 	True if the button is visible, false if not
		*/
		Button.prototype.isVisible = function() {
			return this.visible;
		}

		/**
		* Sets the 'visible' property of the button.
		*
		* @method setVisible
		* @param {Boolean} bool	True makes the button visible, false hides it
		*/
		Button.prototype.setVisible = function(bool) {
			this.visible = bool;
		}

		/**
		* Checks if the button is selected (i.e. if the mouse is hovering over the button)
		*
		* @method isSelected
		* @return {Boolean} 	True if the button is selected, false if not
		*/
		Button.prototype.isSelected = function() {
			return this.selected;
		}

		/**
		* Sets the 'selected' property of the button.
		*
		* @method setSelected
		* @param {Boolean} bool	True "highlights" the button.
		*/
		Button.prototype.setSelected = function(bool) {
			this.selected = bool;
		};
	};

	return Button;
});