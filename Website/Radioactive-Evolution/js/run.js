var config = {
	baseUrl: "js/app",
	paths: { // relative to baseUrl
		"lib": "../lib"
	}
};

/*
	A multdimensional array defining the scripts required for the game to function.
	Scripts in the same array are not dependant on each other and are loaded asynchronously.
	As we go further along the "outer" array, we load the files that are dependant on previous files.

	@TODO - remove this.
*/
var scriptQueue = [
	// these scripts have no dependencies
	[
	//"http://cdn.craig.is/js/mousetrap/mousetrap.min.js",
	//"Canvas/GoogleFonts",
	//"Canvas/Layout",
	"module/model/Assets",
	"Achievements/Achievement",
	"Creatures/Creature",
	"Game/Countdown",
	"Upgrades/Upgrade",
	//"Menu/Menu"
	],
	// now that the above scripts are loaded, we can download scripts that depend upon them
	[
	//"Canvas/Painter",
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
	//"Menu/MainMenu",
	// "Menu/HelpMenu",
	// "Menu/AchievementsMenu",
	// "Menu/LevelMenu",
	// "Menu/DeathMenu",
	//"Menu/Button",
	"IO/KeyboardControl",
	"IO/EventListener"
	],
	[
	"Game/Globals",
	"Upgrades/UpgradeCamouflage",
	"Upgrades/UpgradeFlyingFish",
	"Upgrades/UpgradeGrow",
	"Upgrades/UpgradeMurkyWater",
	"Upgrades/UpgradePoison"
	],
	[
	"Game/Functions"
	]
];

var loadRadioactiveEvolution = function () {
	// var queuePosition;
	// queuePosition = 0;
	// require(['module/view/Menu_Loading', 'module/controller/pubsub'], function (loadingScreen, pubsub) {
		
	// 	require(scriptQueue[queuePosition], function() {
	// 		loadingScreen.updateLoadingScreen(scriptQueue[queuePosition].length);
			
	// 		queuePosition = 1;
	// 		require(scriptQueue[queuePosition], function() {
	// 			loadingScreen.updateLoadingScreen(scriptQueue[queuePosition].length);queuePosition = 1;
				
	// 			queuePosition = 2;
	// 			require(scriptQueue[queuePosition], function() {
	// 				loadingScreen.updateLoadingScreen(scriptQueue[queuePosition].length);
					
	// 				queuePosition = 3;
	// 				require(scriptQueue[queuePosition], function() {
	// 					loadingScreen.updateLoadingScreen(scriptQueue[queuePosition].length);

	// 						require(['app'], function (app) {
	// 							app.init();
	// 						});
	// 				});
	// 			});
	// 		});
	// 	});
	// });
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