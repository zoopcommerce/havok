<?php

//Builds the src php files of the docs into flat html files
//Run this script from the havok/docs/build directory

$delete = function ($path)
{
    $it = new \RecursiveIteratorIterator(
        new \RecursiveDirectoryIterator($path),
        \RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($it as $file) {
        if (in_array($file->getBasename(), array('.', '..'))) {
            continue;
        } elseif ($file->isDir()) {
            rmdir($file->getPathname());
        } elseif ($file->isFile() || $file->isLink()) {
            unlink($file->getPathname());
        }
    }
};

$base = __DIR__ . '/..';
$src = $base . '/src';
$template = $src . '/api-template.php';
$contentTemplate = $src . '/api-content-template.php';

//empty api folder
$files = glob($src . '/api/*'); // get all file names
foreach($files as $file){ // iterate files
  $delete($file);
}

//load json
foreach(json_decode(file_get_contents(__DIR__ . '/details.json'), true) as $name => $module){
    $pieces = explode('/', $name);
    $file = array_pop($pieces);
    $dir = $src . '/api/' . implode('/', $pieces);

    if (!is_dir($dir)) {
        mkdir($dir, null, true);
    }

    ob_start();
    include $template;
    $content = ob_get_clean();
    file_put_contents($dir . '/' . $file . '.php', $content);

    ob_start();
    include $contentTemplate;
    $content = ob_get_clean();
    file_put_contents($dir . '/' . $file . '-content.php', $content);

}

echo "build php api files complete\n";
