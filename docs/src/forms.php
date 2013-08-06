<?php
ob_start();
include 'forms-content.php';
$content = ob_get_clean();
include 'layout.php';
?>