//alert(moonphase(17,11,2014));
var sun_left={minutes:0,hours:0,seconds:0};
function date2julian(d,m,y)
{
	var mm,yy,k1,k2,k3,j;
	yy = y-(12-m)/10;
	mm=m+9;
	if(mm>=12)
	mm=mm-12;
	k1=365.25*(yy+4712);
	k2=30.6001*mm+.5;
	k3=(((yy/100)+49)*.75)-38;
	
	j=k1+k2+d+59;
	if(j>2299160)
	{
		j=j-k3;
	}
	return parseInt(j);
}
function moonphase(d,m,y)
{
	var ag=0;
	var jul = date2julian(d,m,y);
	var ip = (jul+4.867)/29.53059;
	ip=ip-Math.floor(ip);
	if(ip<.5)
	ag = ip*29.53059+29.53059/2;
	else
	ag = ip*29.53059-29.53059/2;
	ag = Math.floor(ag)+1;
	return(ag);
}
function convert_unix(unix)
{

	var x=0;
	unix=unix+p_timings.offset+p_timings.dsave;
	var date = new Date(unix*1000);
	var hours=date.getUTCHours();
	place_month=date.getMonth()+1;
	place_date=date.getDate();
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
return fm;
}

function sundraw()
{
	
	if(p_data.sunnow>0)
	{
	//Object Selections
	var canvas = document.getElementById('sun-canvas');
	canvas.style.display='block';

	var dboard = document.getElementById('drawboard');
	var sunimage = new Image();
	sunimage.src="images/sun.png";
	sunimage.width="20px";
	sunimage.height="20px";
	var pos = canvas.getBoundingClientRect();
	var canvas_h = pos.height;
	var canvas_w = pos.width;
	dboard.width=pos.width;
	dboard.height=pos.height;
	var drw = dboard.getContext("2d");
	//TEXT
	drw.font = "regular 14px arial";
	 /*Line Draw*/
var sec = Math.ceil(p_data.sunpresence/60/60);

var bar_dist = Math.floor(canvas_w/sec);
var start=0;
var color={red:180,blue:180,green:180};
var x=slot=osc_key=0;
for(var r=0;r<sec;r++)
{
drw.fillStyle="rgb("+color.red+", "+color.green+", "+color.blue+")";
drw.fillRect(start,0,bar_dist,canvas_h);
drw.fillStyle = 'blue';
	var curr_unix = (new Date).getTime();
		curr_unix=curr_unix/1000;
		if((p_data.sunrise+x)-curr_unix<3600)
		slot=start-bar_dist;
var timelabel=convert_unix(p_data.sunrise+x);
drw.fillText(timelabel,start,canvas_h);
start=start+bar_dist;
if(osc_key<(sec/2))
{
color.red=color.red+10;
color.blue=color.blue+10;
color.green=color.green+10;
}
else
{
color.red=color.red-10;
color.blue=color.blue-10;
color.green=color.green-10;	
}
osc_key++;
x=x+60*60;
}
sunstatus_timer();
drw.strokeStyle = 'black';
drw.drawImage(sunimage,slot+bar_dist/2,0,bar_dist/2,bar_dist/2);
	}
	else
	{
			var canvas = document.getElementById('sun-canvas');
			canvas.style.display='none';

	}

}
function sunstatus_timer()
{

	var justtime=new Date(p_data.sunnow*1000);
	sun_left.minutes=justtime.getUTCMinutes();
	sun_left.hours=justtime.getUTCHours();
	var status=document.getElementById('timeleft_sun');
	if((p_data.sunset-p_timings.time)<0)
	status.innerHTML="Sun hadn't rose";
	else
	status.innerHTML=sun_left.hours+" : "+sun_left.minutes+" hours of sunlight left";
}
function sunredraw()
{
	var clck = window.setInterval(function() {sundraw();},1000);
}
