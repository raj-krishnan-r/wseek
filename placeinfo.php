<?php
mb_internal_encoding("UTF-8");
class placedata
{
	public $name="";
	public $lat="";
	public $lng="";
};
$id = $_GET['id'];
$start=0;
$url="https://maps.googleapis.com/maps/api/place/details/json?placeid=".$id."&key=AIzaSyDA742kfYz39JZSX2VZ-af1h7mdtBAS-zs";
$json = file_get_contents($url);
$decoded = json_decode($json);
$ins = new placedata();
$ins->name = $decoded->result->address_components[0]->long_name;
$ins->lat = $decoded->result->geometry->location->lat;
$ins->lng = $decoded->result->geometry->location->lng;
$out=json_encode($ins);
echo $out;

?>