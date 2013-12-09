<?php include 'header.php'; ?>
<h1>Documentation</h1>
<p><em>Note: the following documentation has been pulled directly from the software's README.txt file and interpreted as best as possible by your browser. Downloading the software and opening the README file in a native application is likely to be more readable for you.</em></p>
<br /> <br/ >
<?php
	// get file contents
	$file_contents = file_get_contents("Radioactive-Evolution/README.txt");
	// convert html to text
	$file_contents = htmlspecialchars($file_contents);
	// convert \n to <br />
	$file_contents = nl2br($file_contents);
	// convert tab to space
	$file_contents = str_replace("\t",'&nbsp;&nbsp;&nbsp;', $file_contents);
	echo $file_contents;
?>
<?php include 'footer.php'; ?>