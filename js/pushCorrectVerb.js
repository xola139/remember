var pushFirst=null;
var contadorPage=1;
var v
var globalVerbosConocidos

function validaExisteElementos(){
		var itemsExisten = $("div[class*=active]");
		if(itemsExisten.find("div").length==0){
			theJson={};//inicializamos el contendor thejson
			backNext(itemsExisten);
		}
	}


$(document).ready(function(){

	//inicializamos las variables
	var globalVerbosConocidos = JSON.parse(localStorage.getItem('verbosConocidos'));
	var globalVerbosDesconocidos = JSON.parse(localStorage.getItem('verbosDesconocidos'));

	$("#txt_Iknow").text(globalVerbosConocidos==null ? "0":globalVerbosConocidos.length );	
	$("#txt_Idontknow").text(globalVerbosDesconocidos==null ? "0":globalVerbosDesconocidos.length + " Por practicar");	

	
	$("#btn_IKnow").on("click",function(){
		agregaItems('verbosConocidos');	

	});

	$("#btn_noConocido").on("click",function(){
		$("#boton_regresar").show();
		agregaItems('verbosDesconocidos');	

	});

	$("#boton_regresar").on("click",function(){
		$("#boton_regresar").hide();
		agregaItems('verbosVerb');	
		

	});

	
	
	

	$("#noConocido").on("click",function(){
		//var seleccionado = $("a[class*=presionado]");
		var _rel= $("#ctn_traduccion").children().children().attr("rel");
		var verbosRelacionados =$("a[rel="+_rel+"]");
		var theJson={};
			
		//For para colocar nuevamente los titulos y guardarlos en uns lista localstorage
		for(i = 0;i < verbosRelacionados.length;i++){
			var tmpCnt=$(verbosRelacionados[i]);
			var nombre=tmpCnt[0].classList[0];
			//theJson[nombre]=tmpCnt[0].id.replace("boton_","");
			theJson[nombre]=tmpCnt[0].id.split("_")[1];
			tmpCnt[0].parentElement.remove();
		}


		if(localStorage.getItem('verbosDesconocidos')==null){//if por si aun no existe en local storage
			var arrInicial=[];
			arrInicial.push(theJson);
			localStorage.setItem('verbosDesconocidos', JSON.stringify(arrInicial));
			$("#txt_Idontknow").text( 1);
			
		}else{//si existe entonces agregamos el json
			var tmp = JSON.parse(localStorage.getItem('verbosDesconocidos'));
			tmp.push(theJson);
			localStorage.setItem('verbosDesconocidos', JSON.stringify(tmp));
			$("#txt_Idontknow").text(tmp.length + " Por practicar") ;
			
		}

		//Los quitamos del contenedor principal
		//verbosRelacionados.remove();
		//colocar verbo a idenfiticar
		colocarVerbo ();
		validaExisteElementos();

	});

	//Para retirar los verbos que no se conocen de la bandeja no reconocidos
	$("#replay").on("click",function(){
		localStorage.removeItem("verbosConocidos");
	});
	
	//Colocamos el # de verbos que no conoces perdedor
	if(localStorage.getItem('desconocidosVerb')!=null){
		var arraylength = [] ;
		arraylength = JSON.parse(localStorage.getItem('desconocidosVeb'));
		$("#numdesco").text(arraylength.length +"..");
	}
	
	//Colocar el numero de verbos desconocidos para repasar
	$("#numdesco").on("click",function(){
		agregaItems('desconocidosVerb');
	});

	//Validamos si soporta localstorage si no valida estamos fritos
	if(typeof(Storage) !== "undefined") {
		
		// la variable _verbos esta inicializda con la lista de verbos en el archivo importando con verbos.js
		var verbos = _verbos;
		
		if(localStorage.getItem('verbosVerb')==null){
		/*	$.ajax({
				type:     "GET",
				url:      "http://localhost/verbos.json",
				success: function(data){
					verbos=data;
					var dataToStore = JSON.stringify(verbos);
					localStorage.setItem('verbosVerb', dataToStore);
					agregaItems('verbosVerb');
				}
			});
*/
			var dataToStore = JSON.stringify(verbos);
			localStorage.setItem('verbosVerb', dataToStore);
		}else{
			agregaItems('verbosVerb');
		}
		return ;
	}else {
	   alert("Necesitamos un navegador moderno");
	}

});




function backNext(obj){
	
	var nPage = Number(obj[0].id.replace("page_",""))+1;
	window.page = "#page_"+nPage;
	var page = $(window.page);
	// window.location.hash = window.page;
	        
	$("#page_"+nPage).addClass("active");
	page.show();

	var totop = setInterval(function() {
		$(".pages").animate({scrollTop:0}, 0);
	}, 1);

	setTimeout(function() {
		page.addClass("active");
		setTimeout(function() {
			clearInterval(totop);
		}, 1000);
	}, 100);

//Quitamos el class del div activo
	obj.removeClass("active")
	//	Y lo escondemos				
	$(".page").not(page).removeClass("active").hide();

	//colocar verbo a idenfiticar
	colocarVerbo ();

}

function agregaItems(tipo){
	var theContenedor = $("#contenedor");
	
	
	var localData = JSON.parse(localStorage.getItem(tipo));
	var contadorItems = 0;
	contadorPage = 1
	var elementos= typeof localData.items === 'undefined' ? localData : localData.items;
	var auxVerbos,auxVerbosDes;
	var auxExiste=false;
	
	if(tipo === 'verbosVerb' ){
		auxVerbos = JSON.parse(localStorage.getItem("verbosConocidos"));
		auxVerbosDes = JSON.parse(localStorage.getItem("verbosDesconocidos"));
	}
	
	$("[id^='page_']").remove();
	theContenedor.append("<div class='flex-container well page active' style='display: flex;' id='page_1'></div>");
	
	$.each(elementos,function (index,item){
		
		auxExiste = false;
		
		//Para validar que no exista en la lista de no me la se
		if(tipo == 'verbosVerb' &&  auxVerbos != null){
			//Para validar en lista de verbos conocidos
			for (var x = 0;x < auxVerbos.length;x++)
			{
			  if(auxVerbos[x].infinitivo === item.infinitivo){
				  auxExiste = true;
				  return;
			  }
			}
			//Para validar en verbos no conocidos
			if (auxVerbosDes != null){
					for (var x = 0;x < auxVerbosDes.length;x++)
						{
						  if(auxVerbosDes[x].infinitivo === item.infinitivo){
							  auxExiste = true;
							  return;
						  }
						}
			}
			
			
		}
		
		if(auxExiste == true){
			return;
		}
		
		//Por cada 10 verbos colocamos una nueva pagina
		if(contadorItems == 5){
			contadorPage = contadorPage+1;
			contadorItems = 0;
			theContenedor.append("<div class='flex-container well page' id='page_"+contadorPage+"'></div>");
		}
		
		

		var dataEsp = item.traduccion.replace(/\s/g,"");
		var dataInf = item.infinitivo.replace(/\s/g,"");
		var dataPas = item.pasado.replace(/\s/g,"");
		var dataPar = item.participio;
		
		
		var btnEspanol =    $("<div class='flex-item div_page_"+contadorPage+"' style='display:none;'><a id='boton_"+dataEsp+"_traduccion'  class='traduccion waves-effect waves-light btn ' lang='mx' rel='"+index+"'>"+item.traduccion+"</a></div>");
		var btnInfinitivo = $("<div class='flex-item'><a id='boton_"+dataInf+"_infinitivo'  class='infinitivo waves-effect waves-light btn' lang='us' rel='"+index+"'>"+item.infinitivo+"</a></div>");
		var btnPasado =     $("<div class='flex-item'><a id='boton_"+dataPas+"_pasado'  class='pasado waves-effect waves-light btn' lang='us' rel='"+index+"'>"+item.pasado+"</a></div>");
		var btnParticipio = $("<div class='flex-item'><a id='boton_"+dataPar+"_participio'  class='participio waves-effect waves-light btn' lang='us' rel='"+index+"'>"+item.participio+"</a></div>");
		
		//Variable para ubicar la pagina donde se dibujaran los botones
		var contentPage = $("#page_"+ contadorPage);
	 
		/*Metodo para revolver los botones*/
		/*Agregamos al contenedor y lo volcemos drang and drop*/
		Math.floor(Math.random() * 50)&1==true ? contentPage.append( btnEspanol ):contentPage.prepend(btnEspanol);
			
		Math.floor(Math.random() * 6)&1 ==true ?contentPage.append(btnInfinitivo): contentPage.prepend(btnInfinitivo); 
			
		Math.floor(Math.random() * 50)&1==true ? contentPage.append( btnPasado ):contentPage.prepend(btnPasado);
		
		Math.floor(Math.random() * 6)&1 ==true ?contentPage.append(btnParticipio): contentPage.prepend(btnParticipio);
		
		
		/*Fin Metodo para revolver los botones*/
      	contadorItems = contadorItems+1;
	})//Fin $.each
	
	
	
	/*
	var s_= $("#boton_aceptar_traduccion");
	$("#ctn_traduccion").html(s_.parent());
	*/ 
	$("#npage").text("1/"+contadorPage);
	var theJson={};	
	var _rel = null;
	var _relTmp = null;
	$("div[id^=ctn_]").click(function (){

		var contenedor = this;
		var seleccionado = $("a[class*=presionado]");
		$(seleccionado.parent()).css('display','block');
		var tiempoVerb = contenedor.id.replace("ctn_","");
		var contenedorSame = $("#"+seleccionado[0].id.replace(seleccionado[0].className.split(" ")[0],"") + tiempoVerb);

		var nameVerb = seleccionado[0].id.split("_")[1];
		console.log(nameVerb);
		console.log($("a[id^=boton_"+nameVerb+"_]").length);

		var isRegularVerb = ($("a[id^=boton_"+nameVerb+"_]").length > 1 && tiempoVerb != 'infinitivo' ) ? true:false;
		
		
		//obtenemos el valor que relacionara la famila de verbo (Presente,pasado, infitivo,)
		if(tiempoVerb == "traduccion"){
			_rel = seleccionado.parent().children()[0].attributes.rel.value;
		}else{
			_relTmp = seleccionado.parent().children()[0].attributes.rel.value;
		}
		

		//Validamos si concide el boton con el contenedor apartir de la clase
		//if(((_relTmp == null || _rel== _relTmp) && seleccionado.hasClass( tiempoVerb )) || (contenedorSame.length > 0  && seleccionado[0].text === contenedorSame[0].text) ){
		
		
		
		if(((_relTmp == null || _rel == _relTmp) && (seleccionado.hasClass( tiempoVerb )|| isRegularVerb))  ){
			
			
			$(this).html(seleccionado.parent());
			
			//aca iremos guardando el json que contiene el verbo en español,infinitvo,pasado y participio
			theJson[seleccionado.parent().closest('.relaciona')[0].id.replace("ctn_","")]=seleccionado[0].text;
			seleccionado.removeClass('disabled');
			seleccionado.removeClass('presionado');
			
			var contenedores=$("div[id^=ctn_]").find("div").find("a");
			
			//cuando se halla recordado las formas del verbo se agrega a una lista de reconocidos 
			if(contenedores.length == 4){
				var verbConocido=[];

				
				//$(contenedores).fadeOut(500, function() { 
					//Inicializamos los div  con las frases correspondiente
					$("#ctn_traduccion").html("traduccion");
					$("#ctn_infinitivo").html("infinitivo");
					$("#ctn_pasado").html("pasado");
					$("#ctn_participio").html("participio");

					_rel = null;
					_relTmp = null;
					
					
				//});

				verbConocido.push(theJson);
				if(localStorage.getItem('verbosConocidos')==null){//if por si aun no existe en local storage
					localStorage.setItem('verbosConocidos', JSON.stringify(verbConocido));
					$("#txt_Iknow").text(verbConocido.length);
					
				}else{//si existe entonces agregamos el json
					var tmp = JSON.parse(localStorage.getItem('verbosConocidos'));
					tmp.push(theJson);
					localStorage.setItem('verbosConocidos', JSON.stringify(tmp));
					$("#txt_Iknow").text(tmp.length);
				}

				//Damos una animacion para hacer el efecto que se ha cargado en lista conocidos
				$("#img_IKnow").effect( "bounce", {}, 500, function(){});

				colocarVerbo ();
				
			}
			
		}else{
			
			$(contenedor).animate({
		          backgroundColor: "#f44336"
		        }, 500 ).animate({
		          backgroundColor: "#fff"
		        }, 500 );
		}
		
		//secuencia para saber si ya no hay elementos en el contenedor
		validaExisteElementos();
		
	});
	
	$("a[id^=boton]").click(function() {
		
		if(this.lang=='us'){
			var msg = new SpeechSynthesisUtterance(this.text);
 			msg.lang = 'en-US';
 			msg.rate = 1.2;
 			window.speechSynthesis.speak(msg);
 		}

		$("a[id^=boton_]").removeClass('disabled');
		$("a[id^=boton_]").removeClass('presionado');
		
		$(this).addClass('disabled');
		$(this).addClass('presionado');
				
	});
	
	//colocar verbo a idenfiticar
	colocarVerbo ();
	
 }


 function colocarVerbo (){
	//Para empezar a colocar de forma dinamica el verbo en español en el contenedor principal
	var identify_active = document.querySelector("div[class*=active]");
	var items_active = identify_active.querySelectorAll("div[class='flex-item div_"+identify_active.id+"']")
	var num_ram = Math.floor(Math.random() * items_active.length -1) ;
	num_ram = num_ram == -1 ? 0: num_ram;
	
	if(items_active[num_ram]!= undefined && items_active[num_ram].lastChild != undefined){
		$("#"+items_active[num_ram].lastChild.id).trigger("click");
		$("#ctn_traduccion").trigger("click");
	}
	

 }




// Open source code

  window.page = window.location.hash || "#page_1";

  $(window).on("resize", function() {
    $("html, body").height($(window).height());
    //$(".main, .menu").height($(window).height() - $(".header-panel").outerHeight());
   // $(".pages").height($(window).height());
    //console.log("resize");
  }).trigger("resize");

  
  
  

 


