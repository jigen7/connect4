<html>
<style>
 /*.green{ background-color: green; }
 .blue{ background-color: blue; }
 */
 .highlighted { background-color: #348A75;}
 table, td {
    border: 1px solid black;
}
td {
    width: 60px;  
    height: 40px;
}
.green {
    border-radius: 50%/50%; 
    width: 50px;
    height: 50px;
    background: green;
}

.blue {
    border-radius: 50%/50%; 
    width: 50px;
    height: 50px;
    background: blue;
}
</style>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
 <script src="connect4.js" type="text/javascript"></script>

<head>
	

</head>


<body>
<center>
<br><br>
<h3>**Legend**</h3>
<table>
<tr><td>P1</td><td class="green"></td></tr>
<tr><td>P2</td><td class="blue"></td></tr>
</table>
<form>
<br><br>
Current Player : <div id="currplayer">p1</div>
Fight with AI? <input type="checkbox" id="aiCheckBox">
<table id="mytable" style="margin-top:50px">

<?php for($x=5; $x>=0; $x--){ ?>
<tr>
	<?php for($y=0; $y<=6;$y++){ 
		//$name="[".$x."][".$y."]"; 
		$name="_".$x."_".$y;?>
	<td id="col<?php echo $name;?>" align="center"><input style="display:none" disabled="disabled" type="radio" name="radio<?php echo $name;?>" id="radio<?php echo $name;?>" value=""><?php //echo $name;?></td>
	<?php } ?>
</tr>
<?php } ?>

</table>
<br>
<table>
	<tr>
		<td>p1 Counter :</td>
		<td id="p1Text">0</td>
		<td>p2 Counter</td>
		<td id ="p2Text">0</td>
	</tr>
</table>
<h3>Instructions</h3>
 **Click on the table and base on the selected column, it will push a token base on the current user<br>
 **If you want to play with an AI, check the checkbox and wait for the page to reload<br>
 **p1Counter and p2Counter determines if the game is draw if both counter are equal to 21



</center>
</form>
</body>
</html>