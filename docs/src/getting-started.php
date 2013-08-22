<?php
ob_start();
include 'getting-started-content.php';
$content = ob_get_clean();
include 'layout.php';
?>