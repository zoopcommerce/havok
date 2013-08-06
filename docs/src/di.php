<?php
ob_start();
include 'di-content.php';
$content = ob_get_clean();
include 'layout.php';
?>
