<?php
$con = mysql_connect('localhost','root','dbase001');
$dbsel=mysql_select_db('start');
$query = mysql_query("select * from first");
echo (mysql_num_rows($query));
?>