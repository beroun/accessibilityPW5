function crearImagen(parent,id,clase,src){
	var elem = document.createElement("img");
	elem.src = src;
	elem.id = id;
	elem.className = clase;
	parent.appendChild(elem);
	return elem;
}
function crearTexto(parent,tipo,id,clase,texto){
	var elem = document.createElement(tipo);
	var texto = document.createTextNode(texto);
	elem.appendChild(texto);
	parent.appendChild(elem);
}
function crearDiv(parent,id,clase){
	var elem = document.createElement("div");
	elem.id = id;
	elem.className = clase;
	parent.appendChild(elem);
	return elem;
}
function crearCont(parent,tipo,id,clase){
	var elem = document.createElement(tipo);
	elem.id = id;
	elem.className = clase;
	crearTexto(crearDiv(elem,"",""),"h3","","","Opcions d’accessibilitat");
	var cajita = crearDiv(elem,"text_size","");
	crearImagen(cajita,"","","img/text_size.svg");
	crearTexto(cajita,"p","","","Ampliar mida del texte");
	cajita = crearDiv(elem,"text_align","");
	crearImagen(cajita,"","","img/alineacion_icon.svg");
	crearTexto(cajita,"p","","","Al·lineació");
	cajita = crearDiv(elem,"line_spacing","");
	crearImagen(cajita,"","","img/interlineado_icon.svg");
	crearTexto(cajita,"p","","","Interlineat");
	cajita = crearDiv(elem,"big_cursor","");
	crearImagen(cajita,"","","img/big_cursor.svg");
	crearTexto(cajita,"p","","","Cursor gran");
	cajita = crearDiv(elem,"contrast","");
	crearImagen(cajita,"","","img/contraste_icon.svg");
	crearTexto(cajita,"p","","","Canviar contrast");
	cajita = crearDiv(elem,"links_style","");
	crearImagen(cajita,"","","img/links_highlight.svg");
	crearTexto(cajita,"p","","","Resaltar enllaços");
	cajita = crearDiv(elem,"","boton_accesibilidad");
	var boton = crearImagen(cajita,"","Accesibilidad","img/menu.svg");
	boton.onclick = accesibilidad;
	parent.appendChild(elem);
}
function dynamicallyLoad(urljs, urlcss){
	crearCont(document.body,"div","boton_menu","desplegable_accesibilidad");
	var script = document.createElement("script"); // create a script DOM node
	var estilo = document.createElement("link");
	estilo.rel = "stylesheet";
	estilo.href = urlcss;
	script.src = urljs; // set its src to the provided URL
	document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
	document.head.appendChild(estilo);
}
dynamicallyLoad("js/tinycolor.js", "css/accesibilidad.css");
var elementos = document.body.querySelectorAll("*");
var parrafos = document.body.querySelectorAll("p");
var cajas = document.body.querySelectorAll("div");
var enlaces = document.body.querySelectorAll("a");
var coloresTexto = new Array(elementos.length);
var coloresBg = new Array(elementos.length);
var coloresBorder = new Array(elementos.length);
var colorBody = getComputedStyle(document.body).getPropertyValue("background-color");
for(let i = 0; i < elementos.length; i++){
	coloresBg[i] = getComputedStyle(elementos[i]).getPropertyValue("background-color");
	coloresTexto[i] = getComputedStyle(elementos[i]).getPropertyValue("color");
	coloresBorder[i] = getComputedStyle(elementos[i]).getPropertyValue("border-color");
}
function setCookie(cname, cvalue){
	let domain = "domain=" + document.domain;
	document.cookie = cname + "=" + cvalue + ";" + domain + "; SameSite=Lax";
}
function getCookie(cname){
	let name = cname + "=";
	let ca = document.cookie.split(";");
	for(let i = 0; i < ca.length; i++){
		let c = ca[i];
		while(c.charAt(0) == " "){
			c = c.substring(1);
		}
		if(c.indexOf(name) == 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function modoInvert(){
	document.body.style.filter = "invert(100%)";
	document.body.querySelector(".desplegable_accesibilidad").style.filter = "invert(100%)";
	document.querySelector("#contrast").onclick = modoOscuro;
	setCookie("contraste", "invertido");
};
function modoOscuro(){
	document.body.style.filter = "invert(0%)";
	document.body.querySelector(".desplegable_accesibilidad").style.filter = "invert(0%)";
	for(let i = 0; i < elementos.length; i++){
		if(elementos[i].className == "desplegable_accesibilidad" || elementos[i].parentElement.className == "desplegable_accesibilidad" || elementos[i].parentElement.parentElement.className == "desplegable_accesibilidad"){break;}
		elementos[i].style.backgroundColor = tinycolor(coloresBg[i])
		.darken(100)
		.toHexString();
		elementos[i].style.color = tinycolor(coloresTexto[i])
		.lighten(100)
		.toHexString();
		elementos[i].style.borderColor = tinycolor(coloresBorder[i])
		.lighten(100)
		.toHexString();
	}
	document.body.style.backgroundColor = tinycolor(colorBody).lighten(30).toHexString();
	document.querySelector("#contrast").onclick = modoClaro;
	setCookie("contraste", "oscuro");
};
function modoClaro(){
	for(let i = 0; i < elementos.length; i++){
		if(elementos[i].className == "desplegable_accesibilidad" || elementos[i].parentElement.className == "desplegable_accesibilidad" || elementos[i].parentElement.parentElement.className == "desplegable_accesibilidad"){break;}
	elementos[i].style.backgroundColor = tinycolor(coloresBg[i]).lighten(100).toHexString();
	elementos[i].style.color = tinycolor(coloresTexto[i]).darken(100).toHexString();
	elementos[i].style.borderColor = tinycolor(coloresBorder[i]).darken(100).toHexString();
	}
	document.body.style.backgroundColor = tinycolor(colorBody)
	.lighten(70)
	.toHexString();
	document.querySelector("#contrast").onclick = modoOrig;
	setCookie("contraste", "claro");
};
function modoOrig(){
	for(let i = 0; i < elementos.length; i++){
		if(elementos[i].className == "desplegable_accesibilidad" || elementos[i].parentElement.className == "desplegable_accesibilidad" || elementos[i].parentElement.parentElement.className == "desplegable_accesibilidad"){break;}
		elementos[i].style.backgroundColor = coloresBg[i];
		elementos[i].style.color = coloresTexto[i];
		elementos[i].style.borderColor = coloresBorder[i];
	}
	document.body.style.backgroundColor = colorBody;
	document.querySelector("#contrast").onclick = modoInvert;
	setCookie("contraste", "original");
};
document.querySelector("#contrast").onclick = modoInvert;
console.log(getCookie("contraste"));
function start(){
	switch(getCookie("contraste")){
		case "oscuro":
			modoOscuro();break;
		case "claro":
			modoClaro();break;
		case "invertido":
			modoInvert();break;
		default:
			return;
	}
}
function accesibilidad(){
	var menu_acc=document.getElementById("boton_menu");
	if(menu_acc.style.transform =="translate(100%)"){
		menu_acc.style.transform ="translate(0%)";
	}
	else{
		menu_acc.style.transform ="translate(100%)";
	}
}
function one(){    
	document.querySelector("#text_align").style.textAlign = "center";
	document.querySelector("body").style.textAlign="center";
	//pasas el onclick a la funcion 2 despues de la primera orden
	document.getElementById('text_align').onclick = two;
}
//CLICK 2 DE LA FUNCION TWO;
function two(){
	document.querySelector("#text_align").style.textAlign = "left";
	document.querySelector("body").style.textAlign="left";
	//pasas el onclick a la funcion 3 despues de la primera orden
	document.getElementById('text_align').onclick = three;
}
//CLICK 2 DE LA FUNCION THREE;
function three(){
	document.querySelector("#text_align").style.textAlign = "right";
	document.querySelector("body").style.textAlign="right";
	//pasas el onclick a la funcion 4 despues de la primera orden
	document.getElementById('text_align').onclick = four;
}
//CLICK 2 DE LA FUNCION FOUR;
function four(){
	document.querySelector("#text_align").style.textAlign = "justify";
	document.querySelector("body").style.textAlign="justify";
	//pasas el onclick a la funcion 1 despues de la primera orden
document.getElementById('text_align').onclick = one;
}
//Inicializacion (donde inicia) el o click (puedes cambiarla a cualquiera)
document.getElementById('text_align').onclick = one;
document.body.onload = start;