<?php
$page=$_GET['title'];
$url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=".$page."";
$json = file_get_contents($url);
$decoded = json_decode($json);
$dcontent=$decoded->parse->text->{'*'};
//$table = extractstring($dcontent,'<table>','</table>');
echo $dcontent;
// Function that returns the string between two strings.
function extractString($string, $start, $end) {
    $string = " ".$string;
    $ini = strpos($string, $start);
    if ($ini == 0) return "";
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

?>