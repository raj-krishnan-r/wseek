// Wrote for Cloud Seek By Raj Krishnan R | rkrishnan1993@live.com 2014 
var init=0,fillin=0,t=0,count=0;
var monthnames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var tempformat = new Array();
var time;
var t_mode = 'c';
var a = new Array();
var token_forecast_gather=0;
var recursekey=0;
function prep(thisway,vendor,placeid)
{
	if(thisway!=null)
	document.getElementById('place').value=thisway;
	document.getElementById('infopart').style.height=(window.innerHeight-90)+'px';
	var w = document.getElementById('full');
	w.addEventListener("keydown",function(f)
	{
		if(f.keyCode ===37)
		travel();
	});
	var wage = document.getElementById("place");
wage.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
pregrab();
    }

	
});
	if(thisway!=null)
	if(vendor=='g'){
	pregrab('google');
	}
	else
	pregrab();
function pregrab(vendor)
{
	var i = 0;
	var eplace = document.getElementById('place').value;
	
	if(eplace.length<=400&&eplace.length!=0&&eplace!='f1')
	{
		if(token_forecast_gather!=0)
		{
			notify('Please, hang in there a moment.','This request can only be proceeded if, forecast gathering of previous request completes.<br><span style = "text-decoration:blink">Keep a look at the top-left corner of the screen for status.</span>');
		}
		else
		{
document.getElementById('loading').innerHTML='Looking up for '+eplace+'...<img src = "images/loadup.gif" style="width:14px; height:14px;"/>';
if(vendor=='google'){
$.getJSON('placeinfo.php?id='+placeid,function(data){
var lat_i = data.lat;var lng_i = data.lng;
grab_geo(lat_i,lng_i);
});
}
else
$.get('http://api.openweathermap.org/data/2.5/weather?q='+eplace,function(data,success)
{
	
		var jobj = data;
if(jobj.cod==404)
		{
			document.getElementById('loading').innerHTML=' ';
			notify("Can't find <b>'"+eplace+"'</b> !",'<ul><li>Make sure the spelling is correct</li><li>Try Some other place</li></ul>');
		}
		else
		{	
		var dt = jobj.name;
		if(eplace.indexOf(',')<0)
		{
		if(dt=='')
		var accplace = eplace;
		else
		var accplace = capitalise(eplace)+','+dt;
		}
		else
		var accplace = eplace;
		document.getElementById('place').value=accplace;
		grab(accplace);
		}
	
});
	}}
	else
		{
		if(eplace.length<=400&&eplace.length!=0)
		{
		notify("Assuming an Invalid place name !","<br>The place name you entered seems invalid, hence is not proceedable.");
		document.getElementById('loading').innerHTML=' ';
		}
		}

	}
}




function grab(place)
{
	hidemsg();
	//forecastclear();
	window.clearInterval(time);
	time=0;
	if(token_forecast_gather==1)
	{
		if(token_forecast_gather==1)
		{
					notify('Please, hang in there a moment.','This request can only be proceeded if, forecast gathering of previous request completes.<br><span style = "text-decoration:blink">Keep a look at the top-left corner of the screen for status.</span>');

		}
		else
		{
		notify("Assuming an Invalid place name !","<br>The place name you entered seems invalid, hence is not proceedable.");
		document.getElementById('loading').innerHTML=' ';
		}
	}
	else
	{
		document.getElementById('loading').innerHTML='Please wait, gathering current weather data...<img src = "images/loadup.gif" style="width:14px; height:14px;"/>';
		$.get('http://api.openweathermap.org/data/2.5/weather?q='+place,function(data,success)
	{
		var js = data;

	flushtable();
	puttable();
	//wikiload(place);
	var place = document.getElementById('place').value;
document.getElementById('desc').innerHTML='<img src = "http://openweathermap.org/img/w/'+js.weather[0].icon+'.png"><br>'+capitalise(js.weather[0].description);
		document.getElementById('temp').innerHTML=Math.round(js.main.temp-273.15)+'&deg;C';
		document.getElementById('humidity').innerHTML=js.main.humidity+' % ';
		var lup = js.name;
		if(lup!='')
		{
		document.getElementById('place').value=capitalise(place)+','+js.sys.country;
		document.getElementById('place').placeholder=capitalise(place)+','+js.sys.country;

		}
		else
		{
		document.getElementById('place').value=capitalise(place)+','+js.sys.country;
		document.getElementById('place').placeholder=capitalise(place)+','+js.sys.country;

		}
		window.history.pushState("", "Title", "?place="+place);

		//window.history.pushState("place=", "Title",document.getElementById('place').value);
		tempformat[0]=js.main.temp_min;
		tempformat[1]=js.main.temp;
		tempformat[2]=js.main.temp_max;
		document.getElementById('temp_min').innerHTML=Math.round(js.main.temp_min-273.15)+'&deg;C';
		document.getElementById('temp_max').innerHTML=Math.round(js.main.temp_max-273.15)+'&deg;C';
		document.getElementById('pressure').innerHTML=Math.round(js.main.pressure)+' hPa';
		document.getElementById('wspeed').innerHTML=turn(Math.round(((js.wind.speed)*60*60)/1000),2)+' Kmph';
		js.wind.deg
		var lon = js.coord.lon;
		var lat = js.coord.lat;
		document.getElementById('daystatus').style.backgroundSize='cover';
		document.getElementById('daystatus').style.backgroundImage='url(https://maps.googleapis.com/maps/api/staticmap?center='+lat+','+lon+'&size=1100x180&maptype=satellite&zoom=14&scale=4)';
         //document.getElementById('geolocation').innerHTML=lat+', '+lon;
		initialize(lat,lon);
		var unix = (new Date).getTime();
		unix=unix/1000;
		gettime(lat,lon,unix);
		forecast(lat,lon);
		exh(js.weather[0].main);
		
			document.getElementById('datalist').style.display='block';
			convert();

});
}
function exh(s)
{
	document.getElementById('condition').innerHTML=s;
	selectall('place');
}

function list(place)
{
	a[init++]=place;
}
function travel()
{
document.getElementById('place').value=a[--init];grab();
}
}
function selectall(id)
{
	document.getElementById(id).select();
}

function initialize(lat,lon)
{
var mapProp = {
  center:new google.maps.LatLng(lat,lon),
  zoom:12,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
var map=new google.maps.Map(document.getElementById("googleMap")
  ,mapProp);
  google.maps.event.addDomListener(window, 'load', initialize);
}

function notify(t,m)
{
//document.getElementById('msg').style.opacity=1;
document.getElementById('msg').innerHTML='<div title="Close this" class = "notify_close" onclick = "hidemsg_fade()">Close</div><div class = "notify_title">'+t+'</div><div class = "notify_desc">'+m+'</div>';
	document.getElementById('msg').style.display='block';
	var wid = document.getElementById('msg').clientWidth;
	var height = document.getElementById('msg').clientHeight;
	document.getElementById('msg').style.left=(window.innerWidth/2)-(wid/2)+'px';
	document.getElementById('msg').style.top=(window.innerHeight/2)-(height/2)+'px';


}
function hidemsg()
{
	document.getElementById('msg').style.display='none';
}
function hidemsg_fade()
{
	fade('msg','out');
	}
//Converts UNIX timestamp to Standard GMT format
function unix2utc(unix)
{
	var x=0;
	var date = new Date(unix*1000);
	var hours=date.getUTCHours();
	//backgroundr(hours);
	var minutes =date.getUTCMinutes();
	var sec = date.getUTCSeconds();
	if(hours<10)
	hours="0"+hours;
	if(minutes<10)
		minutes="0"+minutes;
	if(sec<10)
		sec="0"+sec;
var fm = hours+":"+minutes+":"+sec;
document.getElementById('timer').innerHTML=fm;
	}
	//Gets the unix divergence time of inputed lat and longitude.
function gettime(lat,lng,tstamp)
{
document.getElementById('loading').innerHTML='Calculating region timing...<img src = "images/loadup.gif" style="width:14px; height:14px;"/>';
$.get('https://maps.googleapis.com/maps/api/timezone/json?location='+lat+','+lng+'&timestamp='+tstamp+'&key=AIzaSyDA742kfYz39JZSX2VZ-af1h7mdtBAS-zs',function(data,success)
	{
		var ob = data;
		var off = ob.rawOffset;
		var dsave = ob.dstOffset;
		var real = tstamp+off+dsave;
		updater(0,real);
	});
}
//Timer function to update the time, every 1sec by incrementing the unix stamp and calling the unix2utc fun.
function updater(x,unix)
{
	time = window.setInterval(function(){unix2utc(unix+t);t++;},1000);
}
//Updates the body background with reference to the hour

function backgroundupdater(hours){
	if(hours>=4&&hours<19)
	{
		document.getElementById('full').style.backgroundAttachment='fixed';
		document.getElementById('full').style.backgroundSize='cover';
		document.getElementById('full').style.backgroundImage='url(theme/day.jpg)';
	}
	else
	{		document.getElementById('full').style.backgroundSize='cover';
			document.getElementById('full').style.backgroundAttachment='fixed';


		document.getElementById('full').style.backgroundImage='url(theme/night.jpg)';	
	}
}
function forecast(lat,lon)
{
	document.getElementById('loading').innerHTML='Please wait, gathering weather forecast data...<img src = "images/loadup.gif" style="width:14px; height:14px;"/>';
	token_forecast_gather=1;
	lat=Math.round(lat);
	lon=Math.round(lon);
	var url ='http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon;
	$.get(url,function(data,success)
	{
		var s=0,o=0,c=0;
		var table = document.getElementById('forecast');
		while(data.list[s].dt!=null)
		{
			var row = table.insertRow(s+2);
			var c1 = row.insertCell(c);
			var c2 = row.insertCell(c+1);
			var c3=row.insertCell(c+2);
			var c4=row.insertCell(c+3);
			var c5=row.insertCell(c+4);
			c=0;
			var so = data.list[s].dt_txt;
			so=dateformatwith(so,'T');
			var date = new Date(so);
			var year = date.getFullYear();
			var month = (date.getMonth());
			var dat = turn(date.getDate(),2);
			var hour = turn(date.getHours(),2);
			var minute = turn(date.getMinutes(),2);
			 var sec = turn(date.getSeconds(),2);
			var monthtitle = monthnames[month];
			var fdate = dat+', '+monthtitle+', '+year;
			var ftime = hour+':'+minute+':'+sec;
			var soso=data.list[++s].dt_txt;
			soso=dateformatwith(soso,'T');
			var dated = new Date(soso);
			hour = turn(dated.getHours(),2);
			minute = turn(dated.getMinutes(),2);
			sec = turn(dated.getSeconds(),2);
			var ttime = hour+':'+minute+':'+sec;
			c1.innerHTML='<span class = "forecast_info_text">'+fdate+'</span>';
			c2.innerHTML='<span class = "forecast_info_text">'+ftime+'</span> to <span class="forecast_info_text">'+ttime+'</span>';
			c3.innerHTML='<span class = "forecast_info_text">'+data.list[s].weather[0].main+'</span>';
			c4.innerHTML='<img src = "http://openweathermap.org/img/w/'+data.list[s].weather[0].icon+'.png"/>';
			c5.innerHTML='<span class = "forecast_info_text">'+Math.round(data.list[s].main.temp_min-273.15)+'</span> | <span class = "forecast_info_text">'+Math.round(data.list[s].main.temp-273.15)+'</span> | <span class = "forecast_info_text">'+Math.round(data.list[s].main.temp_max-273.15)+'&deg;C</span>';
				token_forecast_gather=0;
	document.getElementById('loading').innerHTML=' ';

		}
	});
}


function flushtable()
{
	delete document.getElementById('ftable');
}
function puttable()
{
	document.getElementById('ftable').innerHTML='<table class="forecast" width="100%;" id="forecast"><tr><th colspan="5"><center>Forecast<br><br></center></th></tr><tr><th>Date</th><th>Time Interval</th><th>Condition</th><th>:)</th><th>Temp. Min | Average | Max&deg;</th></tr></table>';
	count=0;
}
function turn(value, padding) {
    var zeroes = "0";
    
    for (var i = 0; i < padding; i++) { zeroes += "0"; }
    
    return (zeroes + value).slice(padding * -1);
}

//GMT to UNIX Epoch
function gmt2unix(d)
{
	var parts = d.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
return Date.UTC(+parts[3], parts[2]-1, +parts[1], +parts[4], +parts[5]);
}
function dateformatwith(sss,letter)
{
		var datepart = sss.slice(0,10);
		var timepart = sss.slice(11,21);
		var t_date = datepart+letter+timepart;
		return t_date;
}
function wikiload(title)
{
	document.getElementById('loading').innerHTML=' ';
	$.get('wiki.php?title='+title,function(data,success)
	{
		document.getElementById('loading').innerHTML='Referring Wikipedia for additional informations...';
		document.getElementById('wikipart').innerHTML=data;
		document.getElementById('loading').innerHTML=' ';
	});
}
function convert()
{
	var mintemp=temp=maxtemp=0;
	var sel = document.getElementById('t_select').value;
	var mode=sel;
		var ref_tmax = document.getElementById('temp_max');
		var ref_tmin = document.getElementById('temp_min');
		var ref_t = document.getElementById('temp');
	if(mode=='c')
	{
		mintemp = Math.round(tempformat[0]-273.15);
		temp = Math.round(tempformat[1]-273.15);
		maxtemp = Math.round(tempformat[2]-273.15);
		ref_t.innerHTML=temp+'&deg;C';
		ref_tmin.innerHTML=mintemp+'&deg;C';
		ref_tmax.innerHTML=maxtemp+'&deg;C';		
	}
	if(mode=='f')
	{

		mintemp = Math.round(tempformat[0]*(9/5)-459.67);
		temp = Math.round(tempformat[1]*(9/5)-459.67);
		maxtemp = Math.round(tempformat[2]*(9/5)-459.67);
		ref_t.innerHTML=temp+'&deg;F';
		ref_tmin.innerHTML=mintemp+'&deg;F';
		ref_tmax.innerHTML=maxtemp+'&deg;F';	
	}
	if(mode=='r')
	{
		mintemp = Math.round(tempformat[0]*(9/5));
		temp = Math.round(tempformat[1]*(9/5));
		maxtemp = Math.round(tempformat[2]*(9/5));
		ref_t.innerHTML=temp+'&deg;R';
		ref_tmin.innerHTML=mintemp+'&deg;R';
		ref_tmax.innerHTML=maxtemp+'&deg;R';	
	}
	if(mode=='k')
	{
		mintemp = Math.round(tempformat[0]);
		temp = Math.round(tempformat[1]);
		maxtemp = Math.round(tempformat[2]);
		ref_t.innerHTML=temp+' K';
		ref_tmin.innerHTML=mintemp+' K';
		ref_tmax.innerHTML=maxtemp+' K';	
	}
	
}
function capitalise(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function fade(id,dir)
{
	if(dir=='out')
	{
	var init = 1;
	var t = window.setInterval(function ()
	{
		document.getElementById(id).style.opacity=init;
		init=init-0.1;
		if(init<=0){
		document.getElementById(id).style.display='none';
		window.clearInterval(t);
		document.getElementById('msg').style.opacity=1;

		}
	},1);
			return;
	}
	if(dir=='in')
	{
		var init = 0;
	var t = window.setInterval(function ()
	{
			document.getElementById(id).style.display='block';

		document.getElementById(id).style.opacity=init;
		init=init+0.01;
		if(init>=1){
		window.clearInterval(t);
		}
	},100);
			return;	
	}
	
}
function autocomplete(s)
{
	var position = s.getBoundingClientRect();
	var top = position.top;
	var bottom = position.bottom;
	var left = position.left;
	var right = position.right;
	document.getElementById('acomplete').style.top=(top)+'px';
	//document.getElementById('acomplete').style.bottom=(bottom)+'px';
	document.getElementById('acomplete').style.left=left-150+'px';
	document.getElementById('acomplete').style.width=(left)-(left-150)+'px';
	document.getElementById('acomplete').innerHTML=s.dataset.desc;
	document.getElementById('acomplete').style.right=left+'px';
	document.getElementById('acomplete').style.display='block';
		
}
function placegrab(s)
{/*
var position = s.getBoundingClientRect();
	var top = position.top;
	var bottom = position.bottom;
	var left = position.left;
	var right = position.right;
	document.getElementById('acomplete').style.top=bottom+'px';
	document.getElementById('acomplete').style.left=left+'px';
	document.getElementById('acomplete').style.right=right+'px';
	document.getElementById('acomplete').style.width=right-left+'px';
	document.getElementById('acomplete').style.display='block';
$.get('placegrab.php?place='+s.value,function(data,success)
	{
		var re = data;
	document.getElementById('acomplete').innerHTML=re;
	});
*/
}
function placeandgo(s)
{
	document.getElementById('place').value=s.dataset.content;
	prep(s.dataset.content,'g',s.dataset.placeid);
	document.getElementById('acomplete').style.display='none';

}

function grab_geo(lat,long)
{
    alert(long);
	hidemsg();
	//forecastclear();
	window.clearInterval(time);
	time=0;
	if(token_forecast_gather==1)
	{
		if(token_forecast_gather==1)
		{
					notify('Please, hang in there a moment.','This request can only be proceeded if, forecast gathering of previous request completes.<br><span style = "text-decoration:blink">Keep a look at the top-left corner of the screen for status.</span>');

		}
		else
		{
		notify("Assuming an Invalid place name !","<br>The place name you entered seems invalid, hence is not proceedable.");
		document.getElementById('loading').innerHTML=' ';
		}
	}
	else
	{
		document.getElementById('loading').innerHTML='Please wait, gathering current weather data...<img src = "images/loadup.gif" style="width:14px; height:14px;"/>';
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long,function(data)
	{
	var js = data;
	flushtable();
	puttable();
	//wikiload(place);
	var place = document.getElementById('place').value;
		document.getElementById('desc').innerHTML=capitalise(js.weather[0].description);
		document.getElementById('temp').innerHTML=Math.round(js.main.temp-273.15)+'&deg;C';
		document.getElementById('humidity').innerHTML=js.main.humidity+' % ';
		var lup = js.name;
		window.history.pushState("", "Title", "?ref=g&place="+place);

		//window.history.pushState("place=", "Title",document.getElementById('place').value);
		tempformat[0]=js.main.temp_min;
		tempformat[1]=js.main.temp;
		tempformat[2]=js.main.temp_max;
		document.getElementById('temp_min').innerHTML=Math.round(js.main.temp_min-273.15)+'&deg;C';
		document.getElementById('temp_max').innerHTML=Math.round(js.main.temp_max-273.15)+'&deg;C';
		document.getElementById('pressure').innerHTML=Math.round(js.main.pressure)+' hPa';
		document.getElementById('wspeed').innerHTML=turn(Math.round(((js.wind.speed)*60*60)/1000),2)+' Kmph';
		js.wind.deg

		var lon = js.coord.lon;
		var lat = js.coord.lat;
		initialize(lat,lon);
		var unix = (new Date).getTime();
		unix=unix/1000;
		gettime(lat,lon,unix);
		forecast(lat,lon);
		exh(js.weather[0].main);
		
			document.getElementById('datalist').style.display='block';
			convert();

});

	}}