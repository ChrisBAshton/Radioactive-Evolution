/**
*	A script for loading the required sounds and images
*/

// images
var img_tick = new Image();
img_tick.src = "Radioactive-Evolution/images/tick.png";
var img_cross = new Image();
img_cross.src = "Radioactive-Evolution/images/cross.png";
// http://medialoot.com/images/thumbs/640x440x1_Clouds_Preview2.jpg
var img_cloud_1 = new Image();
img_cloud_1.src = "Radioactive-Evolution/images/cloud1.png";
var img_cloud_2 = new Image();
img_cloud_2.src = "Radioactive-Evolution/images/cloud2.png";
// http://findicons.com/icon/38004/sun?id=38015
var img_sun = new Image();
img_sun.src = "Radioactive-Evolution/images/sun.png";
// http://www.mayang.com/textures/Nature/images/Sand/
var img_sand = new Image();
img_sand.src = "Radioactive-Evolution/images/sand.jpg";
// http://www.vectoropenstock.com/previews/3437-Underwater-Vector-Background-.jpg
var img_water = new Image();
img_water.src = "Radioactive-Evolution/images/water.jpg";

// sounds
var sound_bg, sound_crunch, sound_death, sound_success;
if(browser === "safari" || browser == "msie") {
	/*
	http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html

	Safari does not support audio by default, so we'll make some dummy classes that don't break the rest of the game
	
	Also, Internet Explorer seems to struggle with the audio, crashing whenever setting the currentTime property of any sound.
	*/
	function DummySound() {

	}
	DummySound.prototype.play = function () { }
	DummySound.prototype.pause = function () { }
	DummySound.prototype.addEventListener = function (param1, param2) { }
	sound_bg = new DummySound();
	sound_crunch = new DummySound();
	sound_death = new DummySound();
	sound_success = new DummySound();
} else {
	sound_bg = document.createElement('audio');
	sound_bg.setAttribute('src', "Radioactive-Evolution/sounds/background.wav");	// buffers automatically when created
	sound_bg.volume = 0.5;
	sound_crunch = document.createElement('audio');
	sound_crunch.setAttribute('src', "Radioactive-Evolution/sounds/crunch.wav");
	sound_crunch.volume = 1.0;
	sound_death = document.createElement('audio');
	sound_death.setAttribute('src', "Radioactive-Evolution/sounds/death.wav");
	sound_death.volume = 1.0;
	sound_success = document.createElement('audio');
	sound_success.setAttribute('src', "Radioactive-Evolution/sounds/success.wav");
	sound_success.volume = 1.0;
}

// update loading screen when downloaded
img_tick.onload = function() {
	updateLoadingScreen(1);
}
img_cross.onload = function() {
	updateLoadingScreen(1);
}
img_cloud_1.onload = function() {
	updateLoadingScreen(1);
}
img_cloud_2.onload = function() {
	updateLoadingScreen(1);
}
img_sun.onload = function() {
	updateLoadingScreen(1);
}
img_sand.onload = function() {
	updateLoadingScreen(1);
}
img_water.onload = function() {
	updateLoadingScreen(1);
}