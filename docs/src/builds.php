<?php
ob_start();
include 'builds-content.php';
$content = ob_get_clean();
include 'layout.php';
?>
