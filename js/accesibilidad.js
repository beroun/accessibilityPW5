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

// Creamos un elemento imagen con un src, clase, ID y padre aleatorios.
function crearImagen(parent,id,clase,src){
	var elem = document.createElement("img");
	elem.src = src;
	elem.id = id;
	if(clase!=""){
		elem.classList.add(clase);
	}
	parent.appendChild(elem);
}
// Creamos un texto de tipo aleatorio (p, h1, h2...), con ID, clase, contenido y elemento padre aleatorios.
function crearTexto(parent,tipo,id,clase,texto){
	// Creamos el elemento que contendrá el texto.
	var elem = document.createElement(tipo);
	// Creamos el texto visible en la página.
	var texto = document.createTextNode(texto);
	elem.id = id;
	if(clase!=""){
		elem.classList.add(clase);
	}
	// Después de darle su ID y clase, el elemento recibe su texto.
	elem.appendChild(texto);
	// Colgamos el elemento (ya con el texto) de su elemento padre.
	parent.appendChild(elem);
}
// Creamos un div, con ID y clases aleatorios y lo enlazamos a un elemento padre aleatorio, y devolvemos el div para poder operar con él.
function crearDiv(parent,id,clase){
	var elem = document.createElement("div");
	elem.id = id;
	if(clase!=""){
		elem.classList.add(clase);
	}
	parent.appendChild(elem);
	return elem;
}

// Función que crea todo el DOM para el menú de accesibilidad
function crearCont(parent,tipo,clase){
	// Creamos el div que engloba todo. Todos los divs creados posteriormente tendrán este div como padre.
	var elem = document.createElement(tipo);
	// Le damos una clase
	if(clase!=""){
		elem.classList.add(clase);
	}
	// Crea el h3 dentro de su propio div
	crearTexto(crearDiv(elem,"",""),"h3","","","Opcions d’accessibilitat");
	// Creamos el div que será el botón que cambiará el font size
	var cajita = crearDiv(elem,"font_size","contenedor_accesibilidad");
	// A este div le añadimos su icono y descripción
	crearImagen(cajita,"","","img/font_size_icon.svg");
	crearTexto(cajita,"p","","","Ampliar mida del texte");
	// Creamos el div que será el botón que cambiará el text align
	cajita = crearDiv(elem,"text_align","contenedor_accesibilidad");
	// A este div le añadimos su icono y descripción
	crearImagen(cajita,"","","img/text_align_icon.svg");
	crearTexto(cajita,"p","","","Al·lineació");
	// Creamos el div que será el botón que cambiará el line height
	cajita = crearDiv(elem,"line_height","contenedor_accesibilidad");
	// A este div le añadimos su icono y descripción
	crearImagen(cajita,"","","img/line_height_icon.svg");
	crearTexto(cajita,"p","","","Interlineat");
	// Creamos el div que será el botón que cambiará el tamaño del cursor
	cajita = crearDiv(elem,"big_cursor","contenedor_accesibilidad");
	// A este div le añadimos su icono y descripción
	crearImagen(cajita,"","","img/big_cursor_icon.svg");
	crearTexto(cajita,"p","","","Cursor gran");
	// Creamos el div que será el botón que cambiará el contraste y los colores
	cajita = crearDiv(elem,"contrast","contenedor_accesibilidad");
	// A este div le añadimos su icono y descripción
	crearImagen(cajita,"","","img/contrast_icon.svg");
	crearTexto(cajita,"p","","","Canviar contrast");
	// Creamos el div que será el botón que cambiará el estilo de los enlaces
	cajita = crearDiv(elem,"links_highlight","contenedor_accesibilidad");
	// A este div le añadimos su icono y descripción
	crearImagen(cajita,"","","img/links_icon.svg");
	crearTexto(cajita,"p","","","Resaltar enllaços");
	// Creamos el div que mostrará y esconderá el menú de accesibilidad
	cajita = crearDiv(elem,"","boton_showhide");
	// A este div le añadimos su icono
	crearImagen(cajita,"","","img/menu_icon.svg");
	// Al div lo enlazamos con la función que hace el movimiento.
	cajita.onclick = mostrarMenuAccesibilidad;
	// El div que engloba todo el menú lo enlazamos al elemento html (pasado como parámetro desde la otra función).
	parent.appendChild(elem);
}

// Función carga una hoja de estilo
function cargarStyle(url){
	// Creamos un elemento link
	var estilo = document.createElement("link");
	// Enlazamos el link con la hoja de estilo
	estilo.rel = "stylesheet";
	estilo.href = url;
	document.head.appendChild(estilo);
}
// Función que carga un script
function cargarScript(url){
	// Creamos un elemento script
	var script = document.createElement("script");
	// Enlazamos el script con el JS
	script.src = url;
	// Añadimos el script al head
	document.head.appendChild(script);
}

// Creamos el menú de accesibilidad mediante el DOM
crearCont(document.documentElement,"div","desplegable_accesibilidad");
// Cargamos el estilo del menú de accesibilidad
cargarStyle("css/accesibilidad.css");
// Cargamos el javascript que realizará los cambios de accesibilidad
cargarScript("js/tinycolor.js");
// Cargamos el script de un icono Check en el menú
cargarScript("https://kit.fontawesome.com/66fb8e7b7e.js");

// Guardamos todos los elementos de la página en un supermegagigahyperextraxxxxlarray
var elementos = document.body.querySelectorAll("*");

// Declaración variable tamaño de la fuente
var fuente = new Array(elementos.length);
// Declaración variable de la alineación del texto
var bodyAlign = getComputedStyle(document.body).getPropertyValue("text-align");
// Declaración variable interlineado
var interlineado = new Array(elementos.length);
// Declaración variables contraste
var coloresTexto = new Array(elementos.length);
var coloresBg = new Array(elementos.length);
var coloresBorder = new Array(elementos.length);
var colorBody = getComputedStyle(document.body).getPropertyValue("background-color");
// Declaración variables links
var links= document.querySelectorAll("a");
const linkValueBackgroundColor = new Array(links.length);
const linkValueColor= new Array(links.length);
const linkValueTextDecoration = new Array(links.length);
const linkValueFontSize = new Array(links.length);
// Guardamos el estilo de los elementos
for(let i = 0; i < elementos.length; i++){
	fuente[i] = getComputedStyle(elementos[i]).getPropertyValue("font-size");
	interlineado[i] = getComputedStyle(elementos[i]).getPropertyValue("line-height");
	coloresBg[i] = getComputedStyle(elementos[i]).getPropertyValue("background-color");
	coloresBorder[i] = getComputedStyle(elementos[i]).getPropertyValue("border-color");
	coloresTexto[i] = getComputedStyle(elementos[i]).getPropertyValue("color");
}
// Guardamos estilo de los enlaces
for(let i=0; i<links.length;i++){
	linkValueBackgroundColor[i] = getComputedStyle(links[i]).getPropertyValue('background-color');
	linkValueColor[i] = getComputedStyle(links[i]).getPropertyValue('color');
	linkValueTextDecoration[i] = getComputedStyle(links[i]).getPropertyValue('text-decoration');
	linkValueFontSize[i] = getComputedStyle(links[i]).getPropertyValue('font-size');
}

// Función que calcula el nuevo tamaño de la fuente a partir del inicial
function cambiarFontSize(valorInicial,factor){
	var chars = valorInicial.split('');
	
	var medida = "";
	let i = chars.length;
	while(true){
		if(!isNaN(chars[i])){
			break;
		}
		i--;
	}
	for (let j = i+1; j < chars.length; j++) {
		medida += chars[j];
	}
	
	valorInicial="";
	
	for (let j = 0; j <= i; j++) {
		valorInicial += chars[j];
	}
	
	if(chars[0] === '.'){
		valorInicial = '0'+valorInicial;
	}
	valorInicial = parseFloat(valorInicial);
	
	return ((valorInicial*factor).toString())+medida;
}
// Funciones cambio tamaño fuente
function fuenteLow() {
	document.querySelector("#font_size p").innerHTML="Texte petit";
	document.querySelector("#font_size img").src="img/font_size_1.25_icon.svg";
	document.querySelector("#font_size").classList.add("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		if(fuente[i]!=""){
			elementos[i].style.fontSize = cambiarFontSize(fuente[i],1.25);
		}
	}
	document.getElementById("font_size").onclick = fuenteMed;
	setCookie("fuente", "low");
}
function fuenteMed() {
	document.querySelector("#font_size p").innerHTML="Texte mitjà";
	document.querySelector("#font_size img").src="img/font_size_1.5_icon.svg";
	document.querySelector("#font_size").classList.add("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		if(fuente[i]!=""){
			elementos[i].style.fontSize = cambiarFontSize(fuente[i],1.5);
		}
	}
	document.getElementById("font_size").onclick = fuenteHigh;
	setCookie("fuente", "med");
}
function fuenteHigh() {
	document.querySelector("#font_size p").innerHTML="Texte gran";
	document.querySelector("#font_size img").src="img/font_size_1.75_icon.svg";
	document.querySelector("#font_size").classList.add("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		if(fuente[i]!=""){
			elementos[i].style.fontSize = cambiarFontSize(fuente[i],1.75);
		}
	}
	document.getElementById("font_size").onclick = fuenteMax;
	setCookie("fuente", "high");
}
function fuenteMax() {
	document.querySelector("#font_size p").innerHTML="Texte molt gran";
	document.querySelector("#font_size img").src="img/font_size_2_icon.svg";
	document.querySelector("#font_size").classList.add("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		if(fuente[i]!=""){
			elementos[i].style.fontSize = cambiarFontSize(fuente[i],2);
		}
	}
	document.getElementById("font_size").onclick = fuenteOrig;
	setCookie("fuente", "max");
}
function fuenteOrig() {
	document.querySelector("#font_size p").innerHTML="Texte Original";
	document.querySelector("#font_size img").src="img/font_size_icon.svg";
	document.querySelector("#font_size").classList.remove("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.fontSize = fuente[i];
	}
	document.getElementById("font_size").onclick = fuenteLow;
	setCookie("fuente", "original");
}

// Funciones para alinear el texto
function alignLeft(){
	document.querySelector("#text_align p").innerHTML="Texte a l'esquerra";
	document.querySelector("#text_align img").src="img/text_align_left_icon.svg";
	document.querySelector("#text_align").classList.add("elemento_activo");
	document.body.style.textAlign="left";
	document.getElementById('text_align').onclick = alignCenter;
	setCookie("alineaTexto", "izquierda");
}
function alignCenter(){
    document.querySelector("#text_align p").innerHTML="Texte centrar";
	document.querySelector("#text_align img").src="img/text_align_center_icon.svg";
	document.querySelector("#text_align").classList.add("elemento_activo");
	document.body.style.textAlign="center";
	document.getElementById('text_align').onclick = alignRight;
	setCookie("alineaTexto", "centro");
}
function alignRight(){
	document.querySelector("#text_align p").innerHTML="Texte a la dreta";
	document.querySelector("#text_align img").src="img/text_align_right_icon.svg";
	document.querySelector("#text_align").classList.add("elemento_activo");
	document.body.style.textAlign="right";
	document.getElementById('text_align').onclick = alignJustify;
	setCookie("alineaTexto", "derecha");
}
function alignJustify(){
    document.querySelector("#text_align p").innerHTML="Texte justificat";
	document.querySelector("#text_align img").src="img/text_align_justify_icon.svg";
	document.querySelector("#text_align").classList.add("elemento_activo");
	document.body.style.textAlign="justify";
	document.getElementById('text_align').onclick = alignOriginal;
	setCookie("alineaTexto", "justificado");
}
function alignOriginal(){
    document.querySelector("#text_align p").innerHTML="Texte no alineat";
	document.querySelector("#text_align img").src="img/text_align_icon.svg";
	document.querySelector("#text_align").classList.remove("elemento_activo");
	document.body.style.textAlign = bodyAlign;
	document.getElementById('text_align').onclick = alignLeft;
	setCookie("alineaTexto", "original");
}

// Funciones cambio interlineado
function interlineadoMed() {
	document.querySelector("#line_height p").innerHTML="Line-Height: 1.5";
	document.querySelector("#line_height img").src="img/line_height_1.5_icon.svg";
	document.querySelector("#line_height").classList.add("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = "1.5";
	}
	document.getElementById("line_height").onclick = interlineadoHigh;
	setCookie("interlineado", "med");
}
function interlineadoHigh() {
	document.querySelector("#line_height p").innerHTML="Line-Height: 1.75";
	document.querySelector("#line_height img").src="img/line_height_1.75_icon.svg";
	document.querySelector("#line_height").classList.add("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = "1.75";
	}
	document.getElementById("line_height").onclick = interlineadoMax;
	setCookie("interlineado", "high");
}
function interlineadoMax() {
	document.querySelector("#line_height p").innerHTML="Line-Height: 2";
	document.querySelector("#line_height img").src="img/line_height_2_icon.svg";
	document.querySelector("#line_height").classList.add("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = "2";
	}
	document.getElementById("line_height").onclick = interlineadoOrig;
	setCookie("interlineado", "max");
}
function interlineadoOrig() {
	document.querySelector("#line_height p").innerHTML="Line-Height: Original";
	document.querySelector("#line_height img").src="img/line_height_icon.svg";
	document.querySelector("#line_height").classList.remove("elemento_activo");
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.lineHeight = interlineado[i];
	}
	document.getElementById("line_height").onclick = interlineadoMed;
	setCookie("interlineado", "original");
}

// Cursor del ratón propio: https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/
// Funciones cambio tamaño del cursor
function cursorMed() {
	document.querySelector("#big_cursor p").innerHTML="Cursor mitjà";
	document.querySelector("#big_cursor img").src="img/big_cursor_icon.svg";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.cursor = "url(img/cursor_med.png) 1 1, auto";
	}
	document.documentElement.style.cursor = "url(img/cursor_med.png) 1 1, auto";
	document.querySelector("#big_cursor").onclick = cursorBig;
	document.querySelector("#big_cursor").classList.add("elemento_activo");
	setCookie("cursor", "med");
}
function cursorBig() {
	document.querySelector("#big_cursor p").innerHTML="Cursor gran";
	document.querySelector("#big_cursor img").src="img/very_big_cursor_icon.svg";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.cursor = "url(img/cursor_big.png) 1 1, auto";
	}
	document.documentElement.style.cursor = "url(img/cursor_big.png) 1 1, auto";
	document.querySelector("#big_cursor").onclick = cursorOrig;
	document.querySelector("#big_cursor").classList.add("elemento_activo");
	setCookie("cursor", "big");
}
function cursorOrig() {
	document.querySelector("#big_cursor p").innerHTML="Cursor original";
	document.querySelector("#big_cursor img").src="img/cursor_icon.svg";
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].style.cursor = "unset";
	}
	document.documentElement.style.cursor = "unset";
	document.querySelector("#big_cursor").onclick = cursorMed;
	document.querySelector("#big_cursor").classList.remove("elemento_activo");
	setCookie("cursor", "original");
}

// Funciones del contraste
function contrasteInvert(){
	document.querySelector("#contrast p").innerHTML = "Contrast invertits";
	document.querySelector("#contrast img").src = "img/contrast_invert_icon.svg";
	document.querySelector("#contrast").classList.add("elemento_activo");
	document.body.style.filter = "invert(100%)";
	document.querySelector("#contrast").onclick = contrasteOscuro;
	setCookie("contraste", "invertido");
};
function contrasteOscuro(){
	document.querySelector("#contrast p").innerHTML = "Contrast elevat oscur";
	document.querySelector("#contrast img").src = "img/contrast_dark_icon.svg";
	document.querySelector("#contrast").classList.add("elemento_activo");
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
	document.querySelector("#contrast p").innerHTML = "Contrast elevat clar";
	document.querySelector("#contrast img").src = "img/contrast_light_icon.svg";
	document.querySelector("#contrast").classList.add("elemento_activo");
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
	document.querySelector("#contrast p").innerHTML = "Colors originals";
	document.querySelector("#contrast img").src = "img/contrast_icon.svg";
	document.querySelector("#contrast").classList.remove("elemento_activo");
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

// Funciones resaltado enlaces
const cambioStyleLink = () =>{
	document.querySelector('#links_highlight p').innerHTML = "Retornar estil enllaços";
	document.querySelector('#links_highlight img').src = "img/links_highlight_icon.svg";
	document.querySelector("#links_highlight").classList.add("elemento_activo");
	for (let k = 0; k < links.length; k++) {
		links[k].style.backgroundColor= "#000000";
		links[k].style.color = "#ffff00";
		links[k].style.textDecoration="underline";
		links[k].style.fontSize="large";
	}
	document.getElementById('links_highlight').onclick = retornarStyleLink;
	setCookie("enlaces", "resaltados");
}
const retornarStyleLink = () => {
	document.querySelector('#links_highlight p').innerHTML = "Resaltar enllaços";
	document.querySelector('#links_highlight img').src = "img/links_icon.svg";
	document.querySelector("#links_highlight").classList.remove("elemento_activo");
	for (let j = 0; j < links.length; j++) {
		links[j].style.backgroundColor = linkValueBackgroundColor[j];
		links[j].style.color = linkValueColor[j];
		links[j].style.textDecoration = linkValueTextDecoration[j];
		links[j].style.fontSize = linkValueFontSize[j];
	}
	document.getElementById('links_highlight').onclick = cambioStyleLink;
	setCookie("enlaces", "original");
}

// Función para esconder o mostrar el menú
function mostrarMenuAccesibilidad(){
	var menu_acc=document.querySelector(".desplegable_accesibilidad");
	if(menu_acc.style.transform =="translate(100%)"){
		menu_acc.style.transform ="translate(0%)";
	}
	else{
		menu_acc.style.transform ="translate(100%)";
	}
}

// Inicializamos con valor anterior, si lo hay
function start(){
	switch(getCookie("fuente")){
		case "low":
			fuenteLow();break;
		case "med":
			fuenteMed();break;
		case "high":
			fuenteHigh();break;
		case "max":
			fuenteMax();break;
		default:
			fuenteOrig();break;
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
		case "med":
			interlineadoMed();break;
		case "high":
			interlineadoHigh();break;
		case "max":
			interlineadoMax();break;
		default:
			interlineadoOrig();break;
	}
	switch(getCookie("cursor")){
		case "med":
			cursorMed();break;
		case "big":
			cursorBig();break;
		default:
			cursorOrig();break;
	}
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
}

// Llamamos a la función que mira las cookies al cargar la página.
document.body.onload = setTimeout(start,500);