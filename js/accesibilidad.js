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
	boton.onclick = mostrarMenuAccesibilidad;
	parent.appendChild(elem);
}
function cargarElementos(urljs, urlcss){
	crearCont(document.documentElement,"div","boton_menu","desplegable_accesibilidad");
	var script = document.createElement("script"); // create a script DOM node
	var estilo = document.createElement("link");
	estilo.rel = "stylesheet";
	estilo.href = urlcss;
	script.src = urljs; // set its src to the provided URL
	document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
	document.head.appendChild(estilo);
}
cargarElementos("js/tinycolor.js", "css/accesibilidad.css");
// Declaración variables contraste
var elementos = document.body.querySelectorAll("*");
var coloresTexto = new Array(elementos.length);
var coloresBg = new Array(elementos.length);
var coloresBorder = new Array(elementos.length);
var colorBody = getComputedStyle(document.body).getPropertyValue("background-color");
// Declaración variables interlineado
var interlineado = new Array(elementos.length);
// Guardamos el estilo de los elementos
for(let i = 0; i < elementos.length; i++){
	coloresBg[i] = getComputedStyle(elementos[i]).getPropertyValue("background-color");
	coloresTexto[i] = getComputedStyle(elementos[i]).getPropertyValue("color");
	coloresBorder[i] = getComputedStyle(elementos[i]).getPropertyValue("border-color");
	interlineado[i] = getComputedStyle(elementos[i]).getPropertyValue("line-height");
}
// Declaración variable de la alineación del texto
var bodyAlign = getComputedStyle(document.body).getPropertyValue("text-align");
// Declaración variables links
var links= document.querySelectorAll("a");
const linkValueBackgroundColor = new Array(links.length);
const linkValueColor= new Array(links.length);
const linkValueTextDecoration = new Array(links.length);
const linkValueFontSize = new Array(links.length);
// Guardamos estilo de los enlaces
for(let i=0; i<links.length;i++){
	linkValueBackgroundColor[i] = getComputedStyle(links[i]).getPropertyValue('background-color');
	linkValueColor[i] = getComputedStyle(links[i]).getPropertyValue('color');
	linkValueTextDecoration[i] = getComputedStyle(links[i]).getPropertyValue('text-decoration');
	linkValueFontSize[i] = getComputedStyle(links[i]).getPropertyValue('font-size');
}
// Funciones de las cookies
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
// Funciones del contraste
function contrasteInvert(){
	document.querySelector("#contrast p").innerHTML = "Contrast elevat oscur";
	document.body.style.filter = "invert(100%)";
	document.querySelector("#contrast").onclick = contrasteOscuro;
	setCookie("contraste", "invertido");
};
function contrasteOscuro(){
	document.querySelector("#contrast p").innerHTML = "Contrast elevat clar";
	document.body.style.filter = "invert(0%)";
	for(let i = 0; i < elementos.length; i++){
		if(elementos[i].className == "desplegable_accesibilidad" || elementos[i].parentElement.className == "desplegable_accesibilidad" || elementos[i].parentElement.parentElement.className == "desplegable_accesibilidad"){break;}
		elementos[i].style.backgroundColor = tinycolor(coloresBg[i]).darken(100).toHexString();
		elementos[i].style.color = tinycolor(coloresTexto[i]).lighten(100).toHexString();
		elementos[i].style.borderColor = tinycolor(coloresBorder[i]).lighten(100).toHexString();
	}
	document.body.style.backgroundColor = tinycolor(colorBody).lighten(30).toHexString();
	document.querySelector("#contrast").onclick = contrasteClaro;
	setCookie("contraste", "oscuro");
};
function contrasteClaro(){
	document.querySelector("#contrast p").innerHTML = "Contrast original";
	for(let i = 0; i < elementos.length; i++){
		if(elementos[i].className == "desplegable_accesibilidad" || elementos[i].parentElement.className == "desplegable_accesibilidad" || elementos[i].parentElement.parentElement.className == "desplegable_accesibilidad"){break;}
		elementos[i].style.backgroundColor = tinycolor(coloresBg[i]).lighten(100).toHexString();
		elementos[i].style.color = tinycolor(coloresTexto[i]).darken(100).toHexString();
		elementos[i].style.borderColor = tinycolor(coloresBorder[i]).darken(100).toHexString();
	}
	document.body.style.backgroundColor = tinycolor(colorBody).lighten(70).toHexString();
	document.querySelector("#contrast").onclick = contrasteOrig;
	setCookie("contraste", "claro");
};
function contrasteOrig(){
	document.querySelector("#contrast p").innerHTML = "Colors invertits";
	for(let i = 0; i < elementos.length; i++){
		if(elementos[i].className == "desplegable_accesibilidad" || elementos[i].parentElement.className == "desplegable_accesibilidad" || elementos[i].parentElement.parentElement.className == "desplegable_accesibilidad"){break;}
		elementos[i].style.backgroundColor = coloresBg[i];
		elementos[i].style.color = coloresTexto[i];
		elementos[i].style.borderColor = coloresBorder[i];
	}
	document.body.style.backgroundColor = colorBody;
	document.querySelector("#contrast").onclick = contrasteInvert;
	setCookie("contraste", "original");
};

// Funciones para alinear el texto
function alignCenter(){
    document.querySelector("#text_align p").innerHTML="Texte centrar";
	document.body.style.textAlign="center";
	document.getElementById('text_align').onclick = alignLeft;
	setCookie("alineaTexto", "centro");
}
function alignLeft(){
    document.querySelector("#text_align p").innerHTML="Texte a l'esquerra";
	document.body.style.textAlign="left";
	document.getElementById('text_align').onclick = alignRight;
	setCookie("alineaTexto", "izquierda");
}
function alignRight(){
	document.querySelector("#text_align p").innerHTML="Texte a la dreta";
	document.body.style.textAlign="right";
	document.getElementById('text_align').onclick = alignJustify;
	setCookie("alineaTexto", "derecha");
}
function alignJustify(){
    document.querySelector("#text_align p").innerHTML="Texte justificat";
	document.body.style.textAlign="justify";
	document.getElementById('text_align').onclick = alignOriginal;
	setCookie("alineaTexto", "justificado");
}
function alignOriginal(){
    document.querySelector("#text_align p").innerHTML="Texte no alineat";
	document.body.style.textAlign = bodyAlign;
	document.getElementById('text_align').onclick = alignCenter;
	setCookie("alineaTexto", "original");
}

// Funciones resaltado enlaces
const cambioStyleLink = () =>{
	document.querySelector('#links_style p').innerHTML = "Retornar estil enllaços";
	for (let k = 0; k < links.length; k++) {
		links[k].style.backgroundColor= "#000000";
		links[k].style.color = "#ffff00";
		links[k].style.textDecoration="underline";
		links[k].style.fontSize="large";
	}
	document.getElementById('links_style').onclick = retornarStyleLink;
	setCookie("enlaces", "resaltados");
}
const retornarStyleLink = () => {
	document.querySelector('#links_style p').innerHTML = "Resaltar enllaços";
	for (let j = 0; j < links.length; j++) {
		links[j].style.backgroundColor = linkValueBackgroundColor[j];
		links[j].style.color = linkValueColor[j];
		links[j].style.textDecoration = linkValueTextDecoration[j];
		links[j].style.fontSize = linkValueFontSize[j];
	}
	document.getElementById('links_style').onclick = cambioStyleLink;
	setCookie("enlaces", "original");
}

// Funciones cambio interlineado
function interlineadoLow() {
	document.querySelector("#line_spacing p").innerHTML="Line-Height: 1";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = "1";
	}
	document.getElementById("line_spacing").onclick = interlineadoMed;
	setCookie("interlineado", "low");
}
function interlineadoMed() {
	document.querySelector("#line_spacing p").innerHTML="Line-Height: 1.35";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = "1.35";
	}
	document.getElementById("line_spacing").onclick = interlineadoHigh;
	setCookie("interlineado", "med");
}
function interlineadoHigh() {
	document.querySelector("#line_spacing p").innerHTML="Line-Height: 1.65";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = "1.65";
	}
	document.getElementById("line_spacing").onclick = interlineadoMax;
	setCookie("interlineado", "high");
}
function interlineadoMax() {
	document.querySelector("#line_spacing p").innerHTML="Line-Height: 2";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = "2";
	}
	document.getElementById("line_spacing").onclick = interlineadoOrig;
	setCookie("interlineado", "max");
}
function interlineadoOrig() {
	document.querySelector("#line_spacing p").innerHTML="Line-Height: Original";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = interlineado[i];
	}
	document.getElementById("line_spacing").onclick = interlineadoLow;
	setCookie("interlineado", "original");
}

// Función para esconder o mostrar el menú
function mostrarMenuAccesibilidad(){
	var menu_acc=document.getElementById("boton_menu");
	if(menu_acc.style.transform =="translate(100%)"){
		menu_acc.style.transform ="translate(0%)";
	}
	else{
		menu_acc.style.transform ="translate(100%)";
	}
}

// Inicializamos con valor anterior, si lo hay
function start(){
	switch(getCookie("contraste")){
		case "oscuro":
			contrasteOscuro();break;
		case "claro":
			contrasteClaro();break;
		case "invertido":
			contrasteInvert();break;
		default:
			contrasteOrig();break;
	}
	switch(getCookie("enlaces")){
		case "resaltados":
			cambioStyleLink();break;
		default:
			retornarStyleLink();break;
	}
	switch(getCookie("alineaTexto")){
		case "centro":
			alignCenter();break;
		case "izquierda":
			alignLeft();break;
		case "derecha":
			alignRight();break;
		case "justificado":
			alignJustify();break;
		default:
			alignOriginal();break;
	}
	switch(getCookie("interlineado")){
		case "low":
			interlineadoLow();break;
		case "med":
			interlineadoMed();break;
		case "high":
			interlineadoHigh();break;
		case "max":
			interlineadoMax();break;
		default:
			interlineadoOrig();break;
	}
}

// Llamamos a la función que mira las cookies al cargar la página.
document.body.onload = start;




