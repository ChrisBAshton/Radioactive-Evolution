define(['module/controller/pubsub', 'Creatures/User', 'module/controller/MenuInstance'], function (pubsub, user, menuInstance) {
	/**
	* A class defining what actions to take when the user moves or clicks the mouse.
	*
	* @class EventListener
	* @constructor
	*/
	var EventListener = function () {

		/**
		* Moves the user (when playing the game) or calls the Menu mouseMoved() function.
		*
		* @method mouseMoved
		* @param {Object} e		Event handler.
		*/
		this.mouseMoved = function(e) {
			// get mouse co-ordinates
			var bounding_box=canvas.getBoundingClientRect();
			mouseX = Math.floor((e.clientX-bounding_box.left) * (canvas.width/bounding_box.width));
			mouseY = Math.floor((e.clientY-bounding_box.top) * (canvas.height/bounding_box.height));	
			
			if(menuInstance.exists()) {
				// invoke menu's mouseMoved() method, if any
				menuInstance.menu().mouseMoved(mouseX,mouseY);
				menuInstance.menu().draw();
			} else {
				// update user's position
				user.move(mouseX, mouseY);
			}

			pubsub.emitEvent('regame:mouse:moved', [mouseX, mouseY]);
		}

		/**
		* In game - places poison, if possible.
		* In menu- calls menu's mouseClicked method.
		*
		* @method mouseClicked
		* @param {Object} e		Event handler.
		*/
		this.mouseClicked= function(e) {
			// get mouse co-ordinates
			var bounding_box=canvas.getBoundingClientRect();
			mouseX = Math.floor((e.clientX-bounding_box.left) * (canvas.width/bounding_box.width));
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
				// look for an "unused" poison object
				for(i=0; i < number_of_poison; i++) {
					if(poison[i] == null) {
						// current poison object is unused, so we can create our poison
						poison[i] = new Poison(mouseX,mouseY);
						break;
					}
				}
			}

			//console.log('clicked in event listener');
			//pubsub.emitEvent('regame:mouse:clicked', [mouseX, mouseY]);
		}
	}

	return new EventListener();
});