<!DOCTYPE html>
<?php
$stage=00;
if(isset($_GET['place']))
{
if(!isset($_GET['ref']))	
    $goto="'".$_GET['place']."'";
else
{
    $ref=$_GET['ref'];
    $goto="'".$_GET['place']."','".$ref."'";
}
	if(strlen($goto)>0&&strlen($goto)<40)
	$stage = 1;
}
?>
<head>
<link rel="icon" type="image/png" href="cloud.png">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
<meta name="description" content="Little App to Check the Weather Around You :)">
<meta name="developer" content="Raj Krishnan R, India rkrishnan1993@live.com">
<meta name="development Started" content="18/September/2014">
<meta name="Data-Courtesy" content="Weather : openweathermap.org | Regional Time and Mapping : Google Timezone API and Google Maps"/>
<meta name="Version" content="1.0">
<title>Weather Seek &szlig; Version</title>
<script src="ajax_1_10_2.js"></script>
<script src="perfection.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=false"></script>
<script src="driver.js"></script>
<link rel="stylesheet" href="see.css">
<link rel="stylesheet" href="perfection.css">

</head>

<body id="full" onload="prep(<?php if($stage==1){echo $goto;} ?>);">
<div class="ribbon" onDblClick="autocomplete(this);">
<div id="acomplete" class="autocomplete">Place List</div>
<div id="loading" class="loading"></div>
<center>
<br><input onKeyDown="placegrab(this);" title="Enter a place name and press 'Enter'" autofocus onclick="selectall('place');" class="placeinput" id="place" type="text" name="place" placeholder="Type a Place here..."/><br><br>
</center>
</div>
<div id="infopart" class="infopart" >
<center><div class="notify" id="msg"></div></center>
<div  id="datalist">
<center><table width="80%" cellspacing="10">
<tr id="jut"><td id="daystatus" colspan="2">
<div class="daystatus"><center><span id="condition" class="condition">
</span><span class="desc" id="desc"></span></center></div>
<div class="timer">
<span id ="geolocation"></span>
<br>
<span class="timer" id="timer">00:00:00</span>
</div>
</center></div></td></tr>
<tr>
<td>
<table class="measures" id="general_info_table">
<tr><th colspan="4"><div align="left"><table class="alter"><tr><td style="none">Format</td><td><select title="View the temperature values in other formats" onChange="convert();" id="t_select"><option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="r">Rankine</option><option value="k">Kelvin</option></select></td></tr></table></div>
<center>Now</center></th></tr>
<tr title="Click for description" data-desc = "Average Temperature" onClick="autocomplete(this);"><td><img src="images/icons/temp.png" class="icon"></td><td>Temperature</td><td>&nbsp;&nbsp;</td><td id="temp"></td></tr>
<tr title="Click for description" data-desc = "Lowest recorded temperature" onClick="autocomplete(this);"><td><img src="images/icons/temp_low.png" class="icon"><td>Temperature - Min</td><td>&nbsp;&nbsp;</td><td id="temp_min"></td></tr>
<tr title="Click for description" data-desc = "Highest recorded temeperature" onClick="autocomplete(this);"><td><img src="images/icons/temp_high.png" class="icon"><td>Temperature - Max</td><td>&nbsp;&nbsp;</td><td id="temp_max"></td></tr>

<tr><td><img src="images/icons/humidity.png" class="icon"><td data-des = "Perecentage of Water Vapour in air" onmouseout="notdis();" onmouseover="des(this);">Humidity</span></td><td>&nbsp;&nbsp;</td><td id="humidity"></td></tr>
<tr title="Click for description" data-desc = "Wind speed." onClick="autocomplete(this);"><td><img src="images/icons/wspeed.png" class="icon"><td>Wind Speed</td><td>&nbsp;&nbsp;</td><td id="wspeed"></td></tr>
<tr title="Click for description" data-desc = "Atmospheric pressure is the force per unit area exerted on a surface by the weight of air above that surface in the atmosphere of Earth (or that of another planet)." onClick="autocomplete(this);"><td><img src="images/icons/barometer.png" class="icon"><td>Pressure</td><td>&nbsp;&nbsp;</td><td id="pressure"></td></tr>
<!--<tr><td><img src="images/icons/sunrise.png" class="icon"><td>Sun Rise</td><td>&nbsp;&nbsp;</td><td id="srise"></td></tr>
<tr><td><img src="images/icons/sunset.png" class="icon"><td>Sun Set</td><td>&nbsp;&nbsp;</td><td id="sset"></td></tr>-->
</table></td>
<td><div class="measures" id="googleMap"></div></td>
</tr>
<tr><td colspan="2"><div class="measures" id="ftable">
<table class="forecast" width="100%;" id="table_f">
<tr><th>Date</th><th>Time Interval</th><th>Condition</th><th>:)</th><th>Temperature Min | Average | Max°C</th></tr>
</table></tr>
<tr><td colspan="2">
<div id="wikipart"></div></td></tr>
</div></td></tr></table></center>
<div id="clip" class = "clip"></div>
<footer>
<a style="cursor:pointer; color:#00F;" onClick="notify('Data Courtesy','Weather or Climate Data : http://www.openweathermap.org<br>Regional Time and Map : Google Timezone and Maps');">Data Courtesy</a> | <a onClick="notify('Reading Accuracy','The weather readings illustrated above\'s accuracy is questionable and depends upon the accuracy of the data provider.<br>Weather data is latest by maximum of 10 minutes and old by maximum of 2 hours.');" style="cursor:pointer; color:#00F;">Data Accuracy</a></footer>
<img src="images/loadup.gif" style="display:none;"/>
</body>
</html>
