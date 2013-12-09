<?php include 'header.php'; ?>
<!-- 
	Only two elements are required to include the game:
	* A canvas with id "radioactive-evolution"
	* A script linking to Run.js, via require.js
	
	The radioactive-evolution-container div is not required, but gives the flexibility of CSS styling. For example, I've centered the canvas using this div. This div can have any id, it does not matter.
-->
<style type="text/css">
#radioactive-evolution-container {
	width: 100%;
	text-align: center;
}
</style>
<div id="radioactive-evolution-container">
	<canvas id="radioactive-evolution">Your browser does not support the HTML5 canvas element. Please update your browser!</canvas>
</div>
<script data-main="Radioactive-Evolution/js/Run" src="http://requirejs.org/docs/release/2.1.5/minified/require.js"></script>
<?php include 'footer.php'; ?>