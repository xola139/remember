var pushFirst=null;
var contadorPage=1;

var globalVerbosConocidos
//Funcio para validar cambio en el appcache
window.addEventListener('load', function(e) {

	window.applicationCache.addEventListener('updateready', function(e) {
	  window.location.reload();
	  
	  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	      // Browser downloaded a new app cache.
	      if (confirm('nuevas funcionalidades disponibles')) {
	        window.location.reload();
	      }
	  } else {
		  // Manifest didn't changed. Nothing new to server.
	  }
  }, false);

}, false);


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

	$("#txt_Iknow").text(globalVerbosConocidos==null ? "0":globalVerbosConocidos.length);	
	$("#txt_Idontknow").text(globalVerbosDesconocidos==null ? "0":globalVerbosDesconocidos.length);	

	
	$("#btn_IKnow").on("click",function(){
		agregaItems('verbosConocidos');	

	});

	$("#btn_noConocido").on("click",function(){
		agregaItems('verbosDesconocidos');	

	});

	
	

	$("#noConocido").on("click",function(){
		var seleccionado = $("a[class*=presionado]");
		var verbosRelacionados =$("a[rel="+seleccionado[0].rel+"]");
		var theJson={};
			
		//For para colocar nuevamente los titulos y guardarlos en uns lista localstorage
		for(i = 0;i < verbosRelacionados.length;i++){
			var tmpCnt=$(verbosRelacionados[i]);
			var nombre=tmpCnt[0].classList[0];
			theJson[nombre]=tmpCnt[0].id.replace("boton_","");
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
			$("#txt_Idontknow").text(tmp.length);
			
		}

		//Los quitamos del contenedor principal
		//verbosRelacionados.remove();

		validaExisteElementos();

	});

	//Para retirar los vervos que no se conocen de la bandeja no reconocidos
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
		// var verbos ={items:[{traduccion:"cortar",infinitivo:"cut",pasado:"cut",participio:"cut"},{traduccion:"convertirse",infinitivo:"become",pasado:"became",participio:"become"},{infinitivo:"be",pasado:"was-were",participio:"been",traduccion:"ser"},{infinitivo:"become",pasado:"became",participio:"become",traduccion:"convertirseen"},{infinitivo:"bite",pasado:"bit",participio:"bitten",traduccion:"morder"},{infinitivo:"break",pasado:"broke",participio:"broken",traduccion:"romper"},{infinitivo:"buy",pasado:"bought",participio:"bought",traduccion:"comprar"},{infinitivo:"choose",pasado:"chose",participio:"chosen",traduccion:"elegir"},{infinitivo:"come",pasado:"came",participio:"come",traduccion:"venir"},{infinitivo:"cost",pasado:"cost",participio:"cost",traduccion:"costar"},{infinitivo:"cut",pasado:"cut",participio:"cut",traduccion:"cortar"},{infinitivo:"do",pasado:"did",participio:"done",traduccion:"hacer"},{infinitivo:"fall",pasado:"fell",participio:"fallen",traduccion:"caer"},{infinitivo:"feel",pasado:"felt",participio:"felt",traduccion:"sentir"},{infinitivo:"find",pasado:"found",participio:"found",traduccion:"encontrar"},{infinitivo:"forget",pasado:"forgot",participio:"forgotten",traduccion:"olvidar"},{infinitivo:"get",pasado:"got",participio:"gotorgotten",traduccion:"obtener"},{infinitivo:"give",pasado:"gave",participio:"given",traduccion:"dar"},{infinitivo:"go",pasado:"went",participio:"gone",traduccion:"ir"},{infinitivo:"have",pasado:"had",participio:"had",traduccion:"tener"},{infinitivo:"hold",pasado:"held",participio:"held",traduccion:"sujetar"},{infinitivo:"know",pasado:"knew",participio:"known",traduccion:"saber"},{infinitivo:"learn",pasado:"learnt",participio:"learnt",traduccion:"aprender"},{infinitivo:"let",pasado:"let",participio:"let",traduccion:"permitir"},{infinitivo:"lose",pasado:"lost",participio:"lost",traduccion:"perder"},{infinitivo:"make",pasado:"made",participio:"made",traduccion:"hacer"},{infinitivo:"meet",pasado:"met",participio:"met",traduccion:"encontrarse"},{infinitivo:"mistake",pasado:"mistook",participio:"mistaken",traduccion:"equivocarse"},{infinitivo:"pay",pasado:"paid",participio:"paid",traduccion:"pagar"},{infinitivo:"put",pasado:"put",participio:"put",traduccion:"poner"},{infinitivo:"read",pasado:"read",participio:"read",traduccion:"leer"},{infinitivo:"say",pasado:"said",participio:"said",traduccion:"decir"},{infinitivo:"sell",pasado:"sold",participio:"sold",traduccion:"vender"},{infinitivo:"show",pasado:"showed",participio:"shown",traduccion:"mostrar"},{infinitivo:"sing",pasado:"sang",participio:"sung",traduccion:"cantar"},{infinitivo:"sleep",pasado:"slept",participio:"slept",traduccion:"dormir"},{infinitivo:"speak",pasado:"spoke",participio:"spoken",traduccion:"hablar"},{infinitivo:"swim",pasado:"swam",participio:"swum",traduccion:"nadar"},{infinitivo:"take",pasado:"took",participio:"taken",traduccion:"tomar"},{infinitivo:"teach",pasado:"taught",participio:"taught",traduccion:"enseñar"},{infinitivo:"tell",pasado:"told",participio:"told",traduccion:"explicar"},{infinitivo:"think",pasado:"thought",participio:"thought",traduccion:"pensar"},{infinitivo:"understand",pasado:"understood",participio:"understood",traduccion:"entender"},{infinitivo:"win",pasado:"won",participio:"won",traduccion:"ganar"}]};
		var verbos = _verbos;
		console.log(verbos);
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

}

function agregaItems(tipo){
	var theContenedor = $("#contenedor");
	
	console.log(localStorage.getItem(tipo));
	var localData = JSON.parse(localStorage.getItem(tipo));
	var contadorItems = 0;
	contadorPage = 1
	
	console.log(localData);
	//console.log(localData.items);
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
		
		
		var btnEspanol =    $("<div class='flex-item'><a id='boton_"+dataEsp+"_traduccion'  class='traduccion waves-effect waves-light btn ' lang='mx' rel='"+index+"'>"+item.traduccion+"</a></div>");
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
	
	
	
	
	
	
	$("#npage").text("1/"+contadorPage);
	var theJson={};	
	$("div[id^=ctn_]").click(function (){

		var contenedor = this;
		var seleccionado = $("a[class*=presionado]");
		
		var tiempoVerb = contenedor.id.replace("ctn_","");

		var contenedorSame = $("#"+seleccionado[0].id.replace(seleccionado[0].className.split(" ")[0],"") + tiempoVerb);
		

		//Validamos si concide el boton con el contenedor apartir de la clase
		if(seleccionado.hasClass( tiempoVerb ) || (contenedorSame.length > 0  && seleccionado[0].text === contenedorSame[0].text) ){
			$(this).html(seleccionado.parent());
			
			//aca iremos guardando el json que contiene el verbo en español,infinitvo,pasado y participio
			theJson[seleccionado.parent().closest('.relaciona')[0].id.replace("ctn_","")]=seleccionado[0].text;
			seleccionado.removeClass('disabled');
			seleccionado.removeClass('presionado');
			
			var contenedores=$("div[id^=ctn_]").find("div").find("a");
			
			//cuando se halla recordado las formas del verbo se agrega a una lista de reconocidos 
			if(contenedores.length == 4){
				var verbConocido=[];
				$(contenedores).fadeOut(500, function() { 
					//Inicializamos los div  con las frases correspondiente
					$("#ctn_traduccion").html("traduccion");
					$("#ctn_infinitivo").html("infinitivo");
					$("#ctn_pasado").html("pasado");
					$("#ctn_participio").html("participio");
				});

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
				$("#img_IKnow").effect( "bounce", {}, 500, function(){
					
				} );
				
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
	
	
 }





// Open source code

  window.page = window.location.hash || "#page_1";

  $(window).on("resize", function() {
    $("html, body").height($(window).height());
    //$(".main, .menu").height($(window).height() - $(".header-panel").outerHeight());
   // $(".pages").height($(window).height());
    //console.log("resize");
  }).trigger("resize");

  
  
  

 


