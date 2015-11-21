var i_par=fin=0;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("GET","data.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
var xr=yr=0;
var deviation_height=parseInt((screen.height)-(window.innerHeight));
var sss = document.addEventListener("mousemove",function(e){xr=(e.clientX);yr=(e.clientY);},false);
function des(ob)
{
var not = document.getElementById('clip');
//var pos = ob.getBoundingClientRect();
not.style.display='block';
not.style.left=xr+'px';
not.style.top=yr+'px';
not.innerHTML = ob.dataset.des;
}
function notdis()
{
var not = document.getElementById('clip');
not.style.display='none';
}
function overlay(refadd)
{
	var sel = document.getElementById('overlay');
	sel.style.display='block';
	sel.style.left=100+'px';
	sel.style.top=100+'px';
	sel.style.width=window.innerWidth-200+'px';
	sel.style.height=window.innerHeight-200+'px';
	document.getElementById('overlay_content').innerHTML='Loading....';
	
	$.get(refadd,function(data,success)
	{
		document.getElementById('overlay_content').innerHTML=data;
	});


}
function overlay_hide()
{
	var sel = document.getElementById('overlay');
	sel.style.display='none';
}


function pars(ob)
{
document.getElementById('autocomplete-veg').style.display='block';
var result=document.getElementById('fills');
i_par=0;
var key = ob.value;

key=key.toLowerCase();
var count=xmlDoc.getElementsByTagName("count")[0].childNodes[0].nodeValue;
while(i_par!=count)
{
var vegtitle=xmlDoc.getElementsByTagName("name")[i_par].childNodes[0].nodeValue;
vegtitle=vegtitle.toLowerCase();
var pos = vegtitle.search(key);
if(pos>=0)
{
result.innerHTML='<tr><td data-refer="'+i_par+'" onclick = "brill(this);">'+vegtitle+'</td></tr>';
}
i_par++;
}
var posit = ob.getBoundingClientRect();
var au=document.getElementById('autocomplete-veg');
au.style.top=(posit.bottom-1)+'px';
au.style.left=posit.left+'px';
au.style.width=posit.width+'px';
au.style.display='block';
document.getElementById('vegname').style.borderBottom='none';
if(key.length==0){
	
	document.getElementById('autocomplete-veg').style.display='none';
		document.getElementById('vegname').style.borderBottom='1px dotted #7a674a';

}
}
function brill(o)
{	
	document.getElementById('vegname').value=o.innerHTML;
	var refat=(o.dataset.refer);
	document.getElementById('autocomplete-veg').style.display='none';
	document.getElementById('vegname').style.borderBottom='1px dotted #7a674a';
	
	datafetch(refat);

}
function datafetch(index)
{
	var name = xmlDoc.getElementsByTagName("name")[index].childNodes[0].nodeValue;
	var min_temp = xmlDoc.getElementsByTagName("min_temp")[index].childNodes[0].nodeValue;
	var max_temp = xmlDoc.getElementsByTagName("max_temp")[index].childNodes[0].nodeValue;
	var opt_temp = xmlDoc.getElementsByTagName("opt_temp")[index].childNodes[0].nodeValue;
	var space = xmlDoc.getElementsByTagName("space")[index].childNodes[0].nodeValue;
	var depth = xmlDoc.getElementsByTagName("depth")[index].childNodes[0].nodeValue;
	var germination = xmlDoc.getElementsByTagName("germination")[index].childNodes[0].nodeValue;
	var harvest = xmlDoc.getElementsByTagName("harvest")[index].childNodes[0].nodeValue;
document.getElementById('opt_temp').innerHTML=opt_temp+'&deg;F';
document.getElementById('min_temp').innerHTML=min_temp+'&deg;F';
document.getElementById('max_temp').innerHTML=max_temp+'&deg;F';
document.getElementById('germinate').innerHTML=germination+'';
document.getElementById('harvest').innerHTML=harvest;
document.getElementById('verdict').innerHTML='Enquiring farmer...';
$.post('farmer.php',{
	opttemp:opt_temp,
	mintemp:min_temp,
	maxtemp:max_temp,
	crop:name ,
	tempplace:avgtemp
	},function(data){document.getElementById('verdict').innerHTML=data;	
});
document.getElementById('reqtable_container').style.display='block';

}


