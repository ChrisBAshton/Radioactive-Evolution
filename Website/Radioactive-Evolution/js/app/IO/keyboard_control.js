define(['bootstrap', 'lib/mousetrap/mousetrap'], function (bs, Mousetrap) {

	// @TODO - make Mousetrap AMD, NOT global.

    var KeyboardController = function () {
    	   
		Mousetrap.bind('space', function () {
			bs.pubsub.emitEvent('regame:game:togglePause');
		});
    };

    return new KeyboardController();
});