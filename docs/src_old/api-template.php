<?php echo '<?php';?>

ob_start();
include '<?php echo $file . '-content.php';?>';
$content = ob_get_clean();
include '<?php echo $src . '/layout.php';?>';
<?php echo '?>';?>
