<html>
	<head>
		<meta charset="UTF-8">
		<title>Radioactive Evolution</title>
		<!-- Google fonts -->
		<link href='http://fonts.googleapis.com/css?family=Economica' rel='stylesheet' type='text/css'>
		<!-- Reset the default CSS -->
		<link rel="stylesheet" href="http://meyerweb.com/eric/tools/css/reset/reset.css" />
		<!-- Now define our own CSS -->
		<link rel="stylesheet" href="css/stylesheet.css" />
		<!-- Define the favicon -->
		<link rel="shortcut icon" href="css/favicon.ico" />
	</head>
	
	<body>
		<section id="menu">
			<h1>Radioactive Evolution</h1>
			
			<ul class="clickables">
				<li>
					<a href=".">About</a>
				</li>
				<li>	
					<a href="game.php">Play Game</a>
				</li>
				<li>	
					<a href="tips.php">Game Tips</a>
				</li>
				<?php
					$deadline = mktime(12, 0, 0, 4, 26, 2013);
					$currDate = time();
					if($currDate >= $deadline) {
				?>
					<li>	
						<a href="documentation.php">Documentation</a>
					</li>
					<li>
						<a href="Radioactive-Evolution.zip">Download Source Code</a>
					</li>
				<?php
					}
				?>
			</ul>
			
			<p>Copyright &copy; 2013 <a href="http://christopherashton.com" target="_blank">Chris Ashton</a></p>
		</section>
		<section id="content">