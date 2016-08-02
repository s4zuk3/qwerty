var name, rut, phone, address, email;

function submitform() {

	console.log("submitform")
	if(isValidForm()) {
		showGame();
	}
}
function isValidForm(){
	// return true;
	var formFailed = false;

	if(!validateAddress(true))
		formFailed = true;

	if(!validateEmail(true))
		formFailed = true;
	
	if(!validatePhone(true))
		formFailed = true;

	if(!validateRut(true))
		formFailed = true;

	if(!validateName(true))
		formFailed = true;

	console.log("formFailed "+formFailed)

	return !formFailed;

}
function validateAddress(focus){
	$("#input-address").parent().removeClass("error");
	address=$("#input-address").val();

	if(address.length < 5){ //address
		$("#input-address").parent().addClass("error");	
		if(focus){
			$("#input-address").focus();		
			$("#input-address").select();
		}
		return false;
	}
	return true;
}
function validateName(focus){
	$("#input-name").parent().removeClass("error");
	name=$("#input-name").val();

	if(name.length < 3){ //Name
		$("#input-name").parent().addClass("error");
		if(focus){
			$("#input-name").focus();		
			$("#input-name").select();
		}
		return false;
	}
	return true;
}
function validateEmail(focus){
	$("#input-email").parent().removeClass("error");
	email=$("#input-email").val();

	if(!isEmail(email)){ //email
		$("#input-email").parent().addClass("error");	
		if(focus){
			$("#input-email").focus();		
			$("#input-email").select();
		}
		return false;
	}
	return true;
}
function validatePhone(focus){
	$("#input-phone").parent().removeClass("error");
	phone=$("#input-phone").val();

	if(phone.length < 8){ //phone
		$("#input-phone").parent().addClass("error");	
		if(focus){
			$("#input-phone").focus();		
			$("#input-phone").select();
		}
		return false;
	}
	return true;
}
function validateRut(focus){
	$("#input-rut").parent().removeClass("error");
	rut=$("#input-rut").val();
	if(!Rut(rut)){ //RUT
		$("#input-rut").parent().addClass("error");
		if(focus){
			$("#input-rut").focus();		
			$("#input-rut").select();	
		}
		return false;
	}
	return true;
}
function showGame(){
		pd = {
		name:name,
		rut:rut,
		phone:phone,
		address:address,
		email:email,
		score:89
	};
	//setPlayerData(pd);

	 for(var i = 0; i < 1; i++){
    	$.ajax({
    url: 'http://movistar-festigame.herokuapp.com/register',
    type: 'POST',
    dataType: 'json',
    data: pd,
  })
  .done(function(data) {
    console.log("Enviado!");
    console.log(data);
  })
  .fail(function() {
    alert("Hubo un error enviando tu puntaje. Por favor intenta mas tarde.");
  })
  .always(function() {
    console.log("complete");
  });
     }






	$("#inicio").addClass('hidden');
	$("#festigame").removeClass('hidden');



	focusOnGame();
}



function revisarDigito( dvr )
{	
	dv = dvr + ""	
	if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	
	{		
		// alert("Debe ingresar un digito verificador valido");		
		// window.document.form1.rut.focus();		
		// window.document.form1.rut.select();		
		return false;	
	}	
	return true;
}

function revisarDigito2( crut )
{	
	largo = crut.length;	
	if ( largo < 2 )	
	{		
		// alert("Debe ingresar el rut completo")		
		// window.document.form1.rut.focus();		
		// window.document.form1.rut.select();		
		return false;	
	}	
	if ( largo > 2 )		
		rut = crut.substring(0, largo - 1);	
	else		
		rut = crut.charAt(0);	
	dv = crut.charAt(largo-1);	
	revisarDigito( dv );	

	if ( rut == null || dv == null )
		return 0	

	var dvr = '0'	
	suma = 0	
	mul  = 2	

	for (i= rut.length -1 ; i >= 0; i--)	
	{	
		suma = suma + rut.charAt(i) * mul		
		if (mul == 7)			
			mul = 2		
		else    			
			mul++	
	}	
	res = suma % 11	
	if (res==1)		
		dvr = 'k'	
	else if (res==0)		
		dvr = '0'	
	else	
	{		
		dvi = 11-res		
		dvr = dvi + ""	
	}
	if ( dvr != dv.toLowerCase() )	
	{		
		// alert("EL rut es incorrecto")		
	
		return false	
	}

	return true
}

function Rut(texto)
{	
	var tmpstr = "";	
	for ( i=0; i < texto.length ; i++ )		
		if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
			tmpstr = tmpstr + texto.charAt(i);	
	texto = tmpstr;	
	largo = texto.length;	

	if ( largo < 2 )	
	{		
		// alert("Debe ingresar el rut completo")		
		// $("#input-rut").focus();		
		// $("#input-rut").select();		
		return false;	
	}	

	for (i=0; i < largo ; i++ )	
	{			
		if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
 		{			
			// alert("El valor ingresado no corresponde a un R.U.T valido");			
			// $("#input-rut").focus();			
			// $("#input-rut").select();			
			return false;		
		}	
	}	

	var invertido = "";	
	for ( i=(largo-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + texto.charAt(i);	
	var dtexto = "";	
	dtexto = dtexto + invertido.charAt(0);	
	dtexto = dtexto + '-';	
	cnt = 0;	

	for ( i=1,j=2; i<largo; i++,j++ )	
	{		
		//alert("i=[" + i + "] j=[" + j +"]" );		
		if ( cnt == 3 )		
		{			
			dtexto = dtexto + '.';			
			j++;			
			dtexto = dtexto + invertido.charAt(i);			
			cnt = 1;		
		}		
		else		
		{				
			dtexto = dtexto + invertido.charAt(i);			
			cnt++;		
		}	
	}	

	invertido = "";	
	for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + dtexto.charAt(i);	

	$("#input-rut").value = invertido.toUpperCase()		

	if ( revisarDigito2(texto) )		
		return true;	

	return false;
}

function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

