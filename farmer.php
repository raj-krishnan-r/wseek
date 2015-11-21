<?php
$temp = array();
$tempplace = array();
$crop = $_POST['crop'];
$temp[0]=$_POST['mintemp'];
$temp[1]=$_POST['opttemp'];
$temp[2]=$_POST['maxtemp'];
$tempplace[0]=$_POST['tempplace'];
think_temp($temp[1],$tempplace[0],$crop,$temp[0],$temp[2]);
function think_temp($ct,$pt,$crop,$cmint,$cmaxt)
{
	if($ct>$pt)
	$diff=$ct-$pt;
	else
	$diff=$pt-$ct;
	if($diff<10)
	echo '<span class = "positive">'.$crop.' has a <strong>good</strong> chance to grow here :)</span>';
	else
		{
			if($pt<$cmint)
			{
				if(($cmint-$pt)<5)
				echo "Temperature is a bit low in this region, planting at an area where sunlight is more recived is effective.";
				else
				echo "Temperature is too low in this region, to grow ".$crop;
					
			}
			if($pt>$cmaxt)
			{
				if(($cmaxt-$pt)>5)
				echo "Temperature is a bit high in this region, water the plant regularly.";
				else
				echo "Temperature iss too high in this region, to grow ".$crop;
				
			}
	}}
?>