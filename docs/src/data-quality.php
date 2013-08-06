<?php
ob_start();
include 'data-quality-content.php';
$content = ob_get_clean();
include 'layout.php';
?>
