<?php
$q=$_GET['q'];
$url = "http://en.wikipedia.org/w/api.php?action=query&titles=".$q."&prop=revisions&rvprop=content&rvsection=0&indexpageids&format=json";
$json = file_get_contents($url);
$page_json=json_decode($json);
$id = $page_json->query->pageids[0];
$watisneed=$page_json->query->pages->$id->revisions[0]->{'*'};
echo "<body>".$watisneed."</body>";
?>