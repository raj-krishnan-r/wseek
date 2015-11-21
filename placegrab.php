<?php
$title = $_GET['place'];
$start=0;
$url="https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDA742kfYz39JZSX2VZ-af1h7mdtBAS-zs&input=".$title;
$json = file_get_contents($url);
$decoded = json_decode($json);
echo "<table width=\"100%\" cellspacing=\"10\">";
while(isset($decoded->predictions[$start])!=false)
{
echo "<tr style=\"cursor:pointer;\"><td data-placeid=\"".$decoded->predictions[$start]->place_id."\"  onclick=\"placeandgo(this);\" data-content=\"".$decoded->predictions[$start]->description."\">".$decoded->predictions[$start]->description."</td></tr>";
$start++;
}

?>