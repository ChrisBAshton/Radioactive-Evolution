define(['bootstrap', 'lib/mousetrap/mousetrap'], function (bs, Mousetrap) {

	// @TODO - make Mousetrap AMD, NOT global.

    var KeyboardController = function () {
    	
        var self = this;

        function init() {
            self.definePauseShortcut();
            self.defineKeyboardMovement();
            self.defineCheats();
        }

        this.definePauseShortcut = function () {
    		Mousetrap.bind('space', function () {
    			bs.pubsub.emitEvent('regame:game:togglePause');
    		});
        }

        this.defineKeyboardMovement = function () {
            var keyboardControls = ['w', 's', 'a', 'd'];
            
            Mousetrap.bind(keyboardControls, function (e, key) {
                bs.pubsub.emitEvent('regame:key:pressed', [key]);
            }, 'keydown');
            
            Mousetrap.bind(keyboardControls, function (e, key) {
                bs.pubsub.emitEvent('regame:key:pressed', ["NO_KEY_DOWN"]);
            }, 'keyup');
        }

        this.defineCheats = function () {

            Mousetrap.bind('* f l y', function() {
                bs.pubsub.emitEvent('regame:cheat', ['Flying Fish']);
            });
            
            Mousetrap.bind('* c a m o', function() {
                bs.pubsub.emitEvent('regame:cheat', ['Camouflage']);
            });

            Mousetrap.bind('* g r o w', function() {
                bs.pubsub.emitEvent('regame:cheat', ['Grow']);
            });
        }
        
        init();
    };

    return new KeyboardController();
});