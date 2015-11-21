<?php
$place = $_GET['place'];
$link = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=".$place."&key=AIzaSyDA742kfYz39JZSX2VZ-af1h7mdtBAS-zs";
$cont = file_get_contents($link);
echo $cont;

$dec = json_decode($cont);
$extracts = $dec->results[0]->place_id;
$pid= $extracts;
$link2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=".$pid."&key=AIzaSyDA742kfYz39JZSX2VZ-af1h7mdtBAS-zs";
$cont = file_get_contents($link2);
$dec = json_decode($cont);
$address = $dec->result->formatted_address;
$lat = $dec->result->geometry->location->lat;
$lng = $dec->result->geometry->location->lng;
class datapack
{
	public $add="";
	public $lat="";
	public $lng ="";
};
$dp = new datapack;
$dp->add=$address;
$dp->lat=$lat;
$dp->lng=$lng;
$dec = json_encode($dp);
//echo $dec;