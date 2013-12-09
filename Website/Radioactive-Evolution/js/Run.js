// Variables for interacting with canvas. All other global variables are in Customise.js
var CANVAS_NAME = "radioactive-evolution";
var canvas = document.getElementById(CANVAS_NAME);
var context= canvas.getContext("2d");

// find out which browser user is using
var browser = "unknown";
var browser_array = ["firefox", "chrome", "safari", "opera", "msie"];
for(var i =0; i < browser_array.length; i++) {
	var thisIsTheBrowser = navigator.userAgent.toLowerCase().indexOf(browser_array[i]) > -1;
	if(thisIsTheBrowser) {
		browser = browser_array[i];
		break;
	}
}

/*
	A multdimensional array defining the scripts required for the game to function.
	Scripts in the same array are not dependant on each other and are loaded asynchronously.
	As we go further along the "outer" array, we load the files that are dependant on previous files.
*/
var scriptQueue = [
	// these scripts have no dependencies
	[
	//"http://cdn.craig.is/js/mousetrap/mousetrap.min.js",
	//"Canvas/GoogleFonts",
	"Canvas/Layout",
	"Canvas/Includes",
	"Achievements/Achievement",
	"Creatures/Creature",
	"Game/Countdown",
	"Upgrades/Upgrade",
	"Menu/Menu"
	],
	// now that the above scripts are loaded, we can download scripts that depend upon them
	[
	"Canvas/Painter",
	"Upgrades/UpgradeCamouflage",
	"Upgrades/UpgradeFlyingFish",
	"Upgrades/UpgradeGrow",
	"Upgrades/UpgradeMurkyWater",
	"Upgrades/UpgradePoison",
	"Creatures/User",
	"Creatures/Fish",
	"Creatures/Plankton",
	"Creatures/Poison",
	"Achievements/Level3",
	"Achievements/Level5",
	"Achievements/Level10",
	"Achievements/EarlyDeath",
	"Achievements/BigEarner",
	"Achievements/FishKiller",
	"Achievements/AllGrowth",
	"Achievements/AllPoison",
	"Achievements/AllUpgrades",
	"Menu/MainMenu",
	"Menu/HelpMenu",
	"Menu/AchievementsMenu",
	"Menu/LevelMenu",
	"Menu/DeathMenu",
	"Menu/Button",
	"IO/KeyboardControl",
	"IO/EventListener"
	],
	[
	"Game/Globals"
	],
	[
	"Game/Functions"
	]
];

// calculate the total number of files that will be downloaded
var TOTAL_FILES = 0;
for(var i=0; i < scriptQueue.length; i++) {
	TOTAL_FILES += scriptQueue[i].length;
}
/*
	updateLoadingScreen() is called when the Google Fonts has finished downloading,
	and when each image downloads. Therefore, we increment TOTAL_FILES to represent 
	not only the script files but the data that is loaded in GoogleFonts.js and Includes.js.
	
	GoogleFonts.js - Events fired how many times:	1
	Includes.js - Images downloaded:				7
	New value for TOTAL_FILES:						TOTAL_FILES + 8
	
	This seems a lot of effort(!), but ensures that all of the rich data has fully downloaded before the
	user sees the main menu. Without this, we'd see glitches such as the system text defaulting to Arial
	before changing to its Google font a couple of seconds later.
	
	I'd like to extend this to include the sound file downloads, but this broke the robustness of the 
	program as Safari doesn't like audio!
*/

TOTAL_FILES += 8;

// track the number of files that have downloaded so far - used to calculate the loading bar
var LOADED_FILES = 0;

// Updates the loading screen, launching the game when all required files have been downloaded
function updateLoadingScreen(numberOfFiles) {
	// update number of files downloaded so far
	LOADED_FILES += numberOfFiles;
	// calculate percentage loaded
	var LOADED = Math.floor(((LOADED_FILES/TOTAL_FILES)*100));
	
	// draw background colour
	context.fillStyle = "#EDEDED";
	context.fillRect(0, 0, layout.getWidth(), layout.getHeight());
	// draw loading bar background
	var lingrad = context.createLinearGradient((layout.getWidth()/4), (layout.getHeight()/2)-10, (layout.getWidth()/4), (layout.getHeight()/2)+10);
	lingrad.addColorStop(0, '#7d7e7d');
	lingrad.addColorStop(1, '#0e0e0e');
	context.fillStyle = lingrad;
	context.fillRect((layout.getWidth()/4), (layout.getHeight()/2)-10, (layout.getWidth()/2), 10);
	// draw loading bar
	var highlightGrad = context.createLinearGradient((layout.getWidth()/4), (layout.getHeight()/2)-10, (layout.getWidth()/4), (layout.getHeight()/2)+10);
	highlightGrad.addColorStop(0, '#333333');
	highlightGrad.addColorStop(1, '#666666');
	context.fillStyle = highlightGrad;
	context.fillRect((layout.getWidth()/4), (layout.getHeight()/2)-10, ((layout.getWidth()/2)/100) * LOADED, 10);
	
	// set up text
	context.fillStyle = "#737373";
	context.font = "12px Verdana";
	context.textAlign = 'center';
	
	// display message regarding user's browser
	switch(browser) {
		case "firefox":
			var message = "You appear to be using Firefox. Radioactive Evolution is fully functional in this browser!";
			break;
		case "chrome":
			var message = "You appear to be using Chrome. Radioactive Evolution is fully functional in this browser!";
			break;
		case "opera":
			var message = "You appear to be using Opera. Radioactive Evolution is mostly functional in this browser.";
			break;
		case "safari":
			context.fillStyle = "#CF0000";
			var message = "You appear to be using Safari. Unfortunately, the audio in this game will not work for you.";
			break;
		case "msie":
			context.fillStyle = "#CF0000";
			var message = "You appear to be using Safari. Unfortunately, the audio in this game will not work for you.";
			break;
		case "unknown":
			context.fillStyle = "#CF0000";
			var message = "Your browser has not been recognised, so the game might not work as expected.";
			break;
	}
	context.fillText(message, (layout.getWidth()/2), layout.getSandLevel());
	// reset color
	context.fillStyle = "#737373";
	
	// display message regarding download progress
	if(LOADED < 97) {
		context.fillText("Loading... "+LOADED+"%", (layout.getWidth()/2), (layout.getHeight()/2)-30);
	} else {
		// everything downloaded, we can start the game
		start_app();
		/*
		//prompt user for their interaction
		context.fillText("Fully loaded. Enter 'm' for mouse control (recommended) or 'k' for keyboard control.", (layout.getWidth()/2), (layout.getHeight()/2)-30);
		Mousetrap.bind('m', function() {
			Mousetrap.unbind('m');
			Mousetrap.unbind('k');
			start_app('m');
		});
		Mousetrap.bind('k', function() {
			Mousetrap.unbind('m');
			Mousetrap.unbind('k');
			start_app('k');
		});
		*/
	}
}

/*
// As crazy as it seems, RequireJS doesn't seem to like recursive functions- I'd like to implement something like this:

function loadScript(index) {
	var i = index;
	console.log("Loading "+scriptQueue[i]);
	require(scriptQueue[i], function() {
		updateLoadingScreen(1);
		if(++i < scriptQueue.length) {
			loadScript(++i);
		}
	});
}
loadScript(0);

Instead, this is the cleanest way of loading each script array
*/

var queuePosition;
queuePosition = 0;
require(scriptQueue[queuePosition], function() {
	updateLoadingScreen(scriptQueue[queuePosition].length);
	
	queuePosition = 1;
	require(scriptQueue[queuePosition], function() {
		updateLoadingScreen(scriptQueue[queuePosition].length);queuePosition = 1;
		
		queuePosition = 2;
		require(scriptQueue[queuePosition], function() {
			updateLoadingScreen(scriptQueue[queuePosition].length);
			
			queuePosition = 3;
			require(scriptQueue[queuePosition], function() {
				updateLoadingScreen(scriptQueue[queuePosition].length);
			});
		});
	});
});