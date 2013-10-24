<?php
ob_start();
include 'api-content.php';
$content = ob_get_clean();
include 'layout.php';
?>
