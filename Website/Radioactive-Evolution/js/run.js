var config = {
	baseUrl: "js/app",
	paths: {
		// relative to baseUrl
		"lib": "../lib"
	}
};

var loadRadioactiveEvolution = function () {
	require(config, ['app'], function (app) {
		app.init();
	});
};

var CANVAS_NAME = document.getElementById('radioactive-evolution-script').getAttribute('data-container-div');
var canvas_container = document.getElementById(CANVAS_NAME);

var canvas = document.createElement('canvas');
canvas_container.appendChild(canvas);
var context= canvas.getContext("2d");

loadRadioactiveEvolution();