<?php include 'header.php'; ?>
<h1>Radioactive Evolution</h1>
<p>
	Welcome to the official website for Radioactive Evolution, a HTML5 canvas game developed for an assignment at university. 
	<?php
		$deadline = mktime(12, 0, 0, 4, 26, 2013);
		$currDate = time();
		if($currDate >= $deadline) {
			echo "Now that we are past the assignment deadline, I've released the game as open source software.";
		} else {
			echo "The software for this game will become open source at ". date("h:ia \o\\n d/m/Y", $deadline) .", when the assignment deadline has passed. A link will be made available to download the source code and documentation will be provided.";
		}
	?>
</p>
<h2>Premise</h2>
<p>
	The local nuclear power plant has been disposing of its waste in a nearby lake. The plankton in that lake is becoming radioactive.
</p>
<p>
	As the player you control a fish, avoiding larger predators and eating plankton. The radioactivity of the plankton accelerates your evolution; you choose how to spend your hard-earned XP and how you should evolve next.
</p>
<p>
	Do you improve your predator avoidance through purchasing the camouflage ability, or concentrate on growing so that you can eat fish smaller than you, or become poisonous and take down the mightiest fish? The choice is up to you!
</p>
<h2>Architectural Description</h2>
<p>
	The game is written in object-oriented JavaScript and HTML5 and is designed to be modular and self-contained. Indeed, game.html requires just a canvas and a single script call. The intention was always to release this software to the public domain as open source software, so I've programmed with maintainability in mind, making use of object-orientation, factory methods and inheritence.  
</p>
<h2>Cross-browser compatibility</h2>
<p>
	I've tested the game in all major browsers. Here is a summary of the game's cross-browser properties:
</p>
<style type="text/css">
#browsers {
	max-width: 800px;
	min-width: 300px;
	background-color: #EDEDED;
	border-collapse: collapse;
	border: 1px solid black;
}

#browsers td {
	vertical-align: middle;
	text-align: left;
	border: 1px dotted black;
	padding: 5px 5px 5px 15px;
}
</style>
<p>
<table id="browsers">
	<tr>
		<td>
			<img src="css/browser_chrome.png" height="60" width="60" title="Google Chrome" alt="Google Chrome" />
		</td>
		<td>
			<img src="Radioactive-Evolution/images/tick.png" height="40" width="40" alt="Tick" />
		</td>
		<td>
			Fully functional.
		</td>
	</tr>
	<tr>
		<td>
			<img src="css/browser_firefox.png" height="60" width="60" title="Firefox" alt="Firefox" />
		</td>
		<td>
			<img src="Radioactive-Evolution/images/tick.png" height="40" width="40" alt="Tick" />
		</td>
		<td>
			Fully functional.
		</td>
	</tr>
	<tr>
		<td>
			<img src="css/browser_opera.png" height="60" width="60" title="Opera" alt="Opera" />
		</td>
		<td>
			<img src="Radioactive-Evolution/images/tick.png" height="40" width="40" alt="Tick" />
		</td>
		<td>
			Fully functional, though the cursor doesn't disappear during gameplay.
		</td>
	</tr>
	<tr>
		<td>
			<img src="css/browser_safari.png" height="60" width="60" title="Safari" alt="Safari" />
		</td>
		<td>
			<img src="Radioactive-Evolution/images/exclaim.png" height="40" width="40" alt="Exclamation Mark" />
		</td>
		<td>
			Safari has audio play and preload <a href="http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html" target="_blank">disabled by default</a>, so sounds don't work in this browser, but the game is playable. Like in Opera, the cursor does not get hidden during gameplay.
		</td>
	</tr>
	<tr>
		<td>
			<img src="css/browser_ie.png" height="60" width="60" title="Internet Explorer" alt="Internet Explorer" />
		</td>
		<td>
			<img src="Radioactive-Evolution/images/exclaim.png" height="40" width="40" alt="Exclamation Mark" />
		</td>
		<td>
			Internet Explorer consistently crashed when trying to use audio elements. I've removed the audio aspects of the game like in Safari, and now the game is playable.
		</td>
	</tr>
</table>
</p>

<h2>Credits</h2>
<p>
	I've used a number of public domain libraries:
	<ul>
		<li>
			<a href="http://requirejs.org/" target="_blank">RequireJS</a> - JavaScript file and module loader - used in Run.js for downloading the game files asynchronously and handling dependencies.
		</li>
		<li>
			<a href="http://craig.is/killing/mice" target="_blank">Mousetrap</a> - JavaScript library for handling keyboard shortcuts - used in the implementation of the alternate controls and in the achievement-unlocked-cheat-codes.
		</li>
		<li>
			<a href="http://www.freesound.org/" target="_blank">freesound</a> - collaborative database of Creative Commons Licensed sounds - the source of all of my game sound files, which I then clipped and condensed for transfer over a network using the Wavepad sound editor.
		</li>
		<li>
			I used copyright-free images from the following sites: <a href="http://medialoot.com/images/thumbs/640x440x1_Clouds_Preview2.jpg" target="_blank">MediaLoot</a>, <a href="http://findicons.com/icon/38004/sun?id=38015" target="_blank">FindIcons</a>, <a href="http://www.mayang.com/textures/Nature/images/Sand/" target="_blank">Mayang</a> and <a href="http://www.vectoropenstock.com/previews/3437-Underwater-Vector-Background-.jpg" target="_blank">Vector Open Stock</a>.
		</li>
	</ul>
</p>
<?php include 'footer.php'; ?>