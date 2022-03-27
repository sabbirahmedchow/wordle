<?php
header('Access-Control-Allow-Origin: *');
require_once 'main.class.php';
$mainClsObj = mainClass ::getInstance();

$result = $mainClsObj->getWordofTheDay();

$jsonEncodedValue = json_encode(trim($result["word"]));

echo $jsonEncodedValue;
?>