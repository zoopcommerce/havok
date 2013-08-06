<?php
ob_start();
include 'widgets-content.php';
$content = ob_get_clean();
include 'layout.php';
?>
