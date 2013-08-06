<?php
ob_start();
include 'services-content.php';
$content = ob_get_clean();
include 'layout.php';
?>
