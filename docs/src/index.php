<?php
ob_start();
include 'index-content.php';
$content = ob_get_clean();
include 'layout.php';
?>