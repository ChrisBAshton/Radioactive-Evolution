Radioactive-Evolution
=====================

SUMMARY

	Software Website:	http://users.aber.ac.uk/cba1/iwp/
	Version:			1.0 (Beta)
	Author:				Chris Ashton
	Developer Website:	www.christopherashton.com
	Contact:			appsupport@christopherashton.com

CONTENTS

	1) Introduction
	2) License Agreement
	3) Installation
	4) Modification
	5) Future Improvements

1) Introduction
	
Thank you for downloading Radioactive Evolution. This is a HTML5 Canvas game developed for a university assignment. It uses object-oriented JavaScript and makes use of the RequireJS and Mousetrap JavaScript frameworks.

For full background information, please visit the official page at http://users.aber.ac.uk/cba1/iwp/

2) License Agreement
	
Pah, what license agreement? This is open source software, so you're welcome to download the source code and mess about with it to your heart's content.

I'd be grateful if you could leave an acknowledgement to me somewhere in your work, but I don't have the legal power nor the inclination to chase you down if you choose not to.
	
3) Installation

The beauty of this software, if I do say so myself, is in its portability. Here are the simple steps you need to take:

a) Unzip the "Radioactive-Evolution.zip". You've probably already done this if you're reading this now.
b) Upload the unzipped folder to a web directory of your choice.
c) You can now include the game in any of your web pages- all you need is two elements:

	<!-- Put these somewhere in your HTML body, wherever you want the game to appear -->
	<canvas id="Radioactive-Evolution"></canvas>
	<script data-main="Radioactive-Evolution/js/Run" src="http://requirejs.org/docs/release/2.1.5/minified/require.js"></script>

This assumes the following directory structure:

	parent-directory/
	---> Radioactive-Evolution/
	---> your-web-page.html

If you've renamed your unzipped folder to something else, or are including the game from a different directory, be sure to update the value inside data-main. This is untested- there may be other variables you need to update, particularly in Includes.js.

An example of this can be found at http://users.aber.ac.uk/cba1/iwp/

4) Modification

So, you fancy making some changes yourself, huh? Best of luck!
I've tried to design the game to be as maintainable as possible, and the code is pretty well commented. Here are a few pointers:

* Run.js loads the files. If you create more files, you'll need to add them to the scriptQueue array, and beware of dependencies. Make sure that your file isn't downloaded before another file that it relies upon, and vice-versa.
* Define your own achievements in the Achievements directory, extending Achievement.js. You'll need to update loadAchievements in Functions.js
* Define your own creatures in the Creatures directory, extending Creature.js. You'll need to update Functions.js and most probably Globals.js
* Define your own upgrades in the Upgrades directory, extending Upgrade.js. You'll need to update User.js and Globals.js
* Should you need to, you can define your own Menu in the Menus directory, extending Menu.js.

5) Future Improvements

If I find the time, I'll do some modification myself and release the update in a future version of the software. Here is my (somewhat picky!) to-do list, in rough priority order:

* Cross browser fixes:
* IE - sounds
* Safari - sounds and cursor hiding
* Opera - cursor hiding
* Keyboard controls need drastic improvement
* More game sounds
* Better collision detection for fish (i.e. checking ellipse collision instead of assuming rectangle shape)
* Improved fish spawning -e.g. not spawning immediately after being eaten, and not spawning too close to the user.
* Could make game more challenging - let other fish lay poison, or let poison only be effective against certain sized fish until poison is upgraded, etc
* Random fish colours- a bigger selection of colours, and ensuring that fish are all different colours.
* Plankton gradual colour change, instead of flashing every second
* In game help (HelpMenu.js) - include images, possibly track unlocked cheat codes.
* In some browsers HTML5 sounds appear to get louder as the level progresses
* Double-check the use of button_width and button.getWidth() in Button.js and Menu.js