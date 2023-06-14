<!DOCTYPE HTML>
<html>
<head>
	<?php
	$data = json_decode ($_POST['data'],false);
	?>
	<title></title>
	<script type="text/javascript" src="/dis/sources/imports/scripts/qrcodejs/qrcode.min.js" ></script>
	<style>
		div#qrcode_ img{
			width:100%;
		}
		*{
			font-family:verdana;
		}
	</style>
</head>
<?php
//W:3.375IN
//H:2.125IN
?>
<body>
	<div style="height:2.125in;width:3.375in;border:1px solid black;padding:0.5%;">
		<div style="width:69%;float:left;height:100%;">
			<div style="height:35%;">
				<div style="float:left;width:35%;height:100%;">
					<img src="../../images/5Seal.webp" style="width:100%;height:100%;">
				</div>
				<div style="float:left;width:63%;height:100%;font-size:10px;">
					<div style="margin-top:15px;margin-left:5px;">
						<p style="">Republic of the Philippines</p>
						<p style="margin-top:-10px;font-size:12px;font-weight:bold;">DISTRICT 5</p>
					</div>
				</div>
				<div style="clear:both"></div>
			</div>
			<div style="height:15%;" align="center">
				<div>
					<B style="font-size:12px;">HEALTH CARD</B>
				</div>
				<div style="margin-top:-10px;">
					<span style="font-size:10px;">111100001111</span>
				</div>
				
			</div>
			<div style="height:50%; ">
				<div style='font-size:8px;'>
					NAME:<br>
					<STRONG><?PHP ECHO $data->FIRSTNAME.' '.$data->MIDDLENAME.' '.$data->LASTNAME; ?></STRONG>
				</div>
				<div style='margin-top:5px;font-size:8px;'>
					ADDRESS:<br>
					<STRONG><?PHP ECHO $data->ADDRESS; ?></STRONG>
				</div>
				<div style='margin-top:5px;font-size:8px;'>
					COMORDIBITY:<br>
					<STRONG>DIABETES,HYPERTENSION</STRONG>
				</div>
				<div style='margin-top:5px;font-size:8px;'>
					COVID VACCINATION:<br>
					<STRONG>YES, 2 DOSE</STRONG>
				</div>
			</div>
			<!--<div style="height:50%">
				<div><span style="font-size:7px;" >NAME</span><BR>
				<b style="font-size:8px;"><?PHP ECHO $data->FIRSTNAME.' '.$data->MIDDLENAME.' '.$data->LASTNAME; ?></b>
				</div>
				
				<div>
					<span style="font-size:7px;">ADDRESS</span></BR>
					<b style="font-size:8px;"><?PHP ECHO $data->ADDRESS; ?><BR></b>
				</div>
				
				<div>
					<span style="font-size:7px;">COMORDIBITIES</span></BR>
					<b style="font-size:8px;">DIABETES, HYPERTENSION<BR></b>
				</div>
				
				<div>
					<span style="font-size:7px;">COVID 19 VACCINATION:</span></BR>
					<b style="font-size:8px;">YES<BR></b>
				</div>
			</div>-->
		</div>
		<div style="width:30%;float:right;height:100%;">
			<div id="qrcode_" style="width:100%;height:50%;"></div>
			<div  style="width:100%;height:50%;background:#cccc;font-size:10px;text-align:center;">
				1x1 PHOTO
			</div>
		</div>
		
		<div style="clear:both"></div>
	</div>
</body>
	<script >
		var qrcode = new QRCode("qrcode_");
		qrcode.makeCode(`<?php echo $data->RESIDENT_ID; ?>`);
	</script>
</html>