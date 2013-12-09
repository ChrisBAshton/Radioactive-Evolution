/**
*	A script for loading Google fonts.
*/

// See more customisable stuff at https://developers.google.com/webfonts/docs/webfont_loader#Events
WebFontConfig = {
	google: { families: [ 'Jura::latin' ] },
	active: function() {
		updateLoadingScreen(1);
	}
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();