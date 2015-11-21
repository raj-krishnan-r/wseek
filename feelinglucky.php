<?php
class datapack
{
    public $address="";
    public $lat="";
    public $lng="";
    public $id="";
};
$url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=".$_GET['place']."&key=AIzaSyDA742kfYz39JZSX2VZ-af1h7mdtBAS-zs";
$con = file_get_contents($url);
$dec = json_decode($con);
$name = $dec->results[0]->formatted_address;
$lat = $dec->results[0]->geometry->location->lat;
$lng = $dec->results[0]->geometry->location->lng;
$placeid = $dec->results[0]->place_id;
$ins = new datapack();
$ins->address = $name;
$ins->lat = $lat;
$ins->lng = $lng;
$ins->id = $placeid;
$out = json_encode($ins);
echo $out;
?>
