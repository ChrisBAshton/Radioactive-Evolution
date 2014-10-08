define(['bootstrap', 'creatures/user', 'module/controller/menu_instance', 'module/model/population'], function (bs, user, menuInstance, population) {

	/**
	* A class defining what actions to take when the user moves or clicks the mouse.
	*
	* @class EventListener
	* @constructor
	*/
	var EventListener = function () {

		var self = this;

		// listen for mouse movements/clicks
	    bs.canvas.addEventListener("mousemove", function (e) {
	    	self.mouseMoved(e, this);
	    }, false);
	    bs.canvas.addEventListener("mousedown", function (e) {
	    	self.mouseClicked(e, this);
	    }, false);

		/**
		* Moves the user (when playing the game) or calls the Menu mouseMoved() function.
		*
		* @method mouseMoved
		* @param {Object} e			Event handler.
		* @param {Object} canvas	Canvas
		*/
		this.mouseMoved = function (e, canvas) {
			// get mouse co-ordinates
			var bounding_box=canvas.getBoundingClientRect(),
				mouseX = Math.floor((e.clientX-bounding_box.left) * (canvas.width/bounding_box.width)),
				mouseY = Math.floor((e.clientY-bounding_box.top) * (canvas.height/bounding_box.height));	
			
			if(menuInstance.exists()) {
				// invoke menu's mouseMoved() method, if any
				menuInstance.menu().mouseMoved(mouseX,mouseY);
				menuInstance.menu().draw();
			} else {
				// update user's position
				user.move(mouseX, mouseY);
			}

			bs.pubsub.emitEvent('regame:mouse:moved', [mouseX, mouseY]);
		}

		/**
		* In game - places poison, if possible.
		* In menu- calls menu's mouseClicked method.
		*
		* @method mouseClicked
		* @param {Object} e			Event handler.
		* @param {Object} canvas	Canvas
		*/
		this.mouseClicked= function (e, canvas) {
			// get mouse co-ordinates
			var bounding_box=canvas.getBoundingClientRect(),
				mouseX = Math.floor((e.clientX-bounding_box.left) * (canvas.width/bounding_box.width)),
				mouseY = Math.floor((e.clientY-bounding_box.top) * (canvas.height/bounding_box.height));
			
			// if user is playing the game
			if(menuInstance.exists()) {
				// call menu mouseClicked() function
				menuInstance.menu().mouseClicked(mouseX,mouseY);
				// mouse click could have started the game, thereby setting menu to null. Check `menu` exists before calling its method.
				if(menuInstance.exists()) {
					menuInstance.menu().draw();
				} else {
					// menu has been nullified and game has started- set the user position to mouse coordinates
					user.move(mouseX,mouseY);
				}
			} else {
				population.attemptToDropPoison(mouseX, mouseY);
			}
		}
	}

	return new EventListener();
});