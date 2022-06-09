function dynamicallyLoad(urljs, urlcss) {
	document.body.innerHTML +=
	'<div id="boton_menu" class="desplegable_accesibilidad"><div><h3>Opcions d’accessibilitat</h3></div><div><img id="clickme" src="img/text_size.svg" alt="Ampliar de texto"/><p classS="clickme">Ampliar tamany <br> de text</p></div><div><img src="img/alineacion_icon.svg" alt="alineacion icon"/><p>Al·lineació</p></div><div><img src="img/interlineado_icon.svg" alt="interlineado"/><p>Interlineat</p></div><div id="clickme"><img src="img/big_cursor.svg" alt="cursor grande"/><p>Cursor gran</p></div><div><img src="img/contraste_icon.svg" alt="contarste"/><p>Cursor gran</p></div><div><img src="img/links_highlight.svg" alt="links"/><p>Resaltar enllaços</p></div><div class="boton_accesibilidad"><img onclick="accesibilidad()" src="img/menu.svg" alt="accesibilidad"/></div></div>';
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
var colorBody = getComputedStyle(document.body).getPropertyValue(
  "background-color"
  );
  for (let i = 0; i < elementos.length; i++) {
	  coloresBg[i] = getComputedStyle(elementos[i]).getPropertyValue(
		  "background-color"
		  );
		  coloresTexto[i] = getComputedStyle(elementos[i]).getPropertyValue("color");
		  coloresBorder[i] = getComputedStyle(elementos[i]).getPropertyValue(
			  "border-color"
			  );
			}
function setCookie(cname, cvalue) {
	let domain = "domain=" + document.domain;
	document.cookie = cname + "=" + cvalue + ";" + domain + "; SameSite=Lax";
}
function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function modoInvert(){
	document.body.style.filter = "invert(100%)";
	document.formColor.contraste.onclick = modoOscuro;
	setCookie("contraste", "invertido");
};
function modoOscuro(){
	document.body.style.filter = "invert(0%)";
	for (let i = 0; i < elementos.length; i++) {
		if (
			elementos[i].id == "formAccesibilidad" ||
			elementos[i].parentElement.id == "formAccesibilidad"
			)
			break;
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
		document.body.style.backgroundColor = tinycolor(colorBody)
		.lighten(30)
		.toHexString();
		document.formColor.contraste.onclick = modoClaro;
		setCookie("contraste", "oscuro");
};
function modoClaro(){
	for (let i = 0; i < elementos.length; i++) {
	if (
		elementos[i].id == "formAccesibilidad" ||
		elementos[i].parentElement.id == "formAccesibilidad"
		)
		break;
		elementos[i].style.backgroundColor = tinycolor(coloresBg[i])
		.lighten(100)
		.toHexString();
		elementos[i].style.color = tinycolor(coloresTexto[i])
		.darken(100)
		.toHexString();
		elementos[i].style.borderColor = tinycolor(coloresBorder[i])
		.darken(100)
		.toHexString();
	}
	document.body.style.backgroundColor = tinycolor(colorBody)
	.lighten(70)
	.toHexString();
	document.formColor.contraste.onclick = modoOrig;
	setCookie("contraste", "claro");
};
function modoOrig(){
	for (let i = 0; i < elementos.length; i++) {
		if (
			elementos[i].id == "formAccesibilidad" ||
			elementos[i].parentElement.id == "formAccesibilidad"
			)
			break;
		elementos[i].style.backgroundColor = coloresBg[i];
		elementos[i].style.color = coloresTexto[i];
		elementos[i].style.borderColor = coloresBorder[i];
	}
	document.body.style.backgroundColor = colorBody;
	document.formColor.contraste.onclick = modoInvert;
	setCookie("contraste", "original");
};
document.formColor.contraste.onclick = modoInvert;
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
			modoOrig();
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
function one() {    
	document.querySelector("#clickme").innerHTML="Text-Aling: center";
	document.querySelector("body").style.textAlign="center";
	//pasas el onclick a la funcion 2 despues de la primera orden
	document.getElementById('clickme').onclick = two;
}
//CLICK 2 DE LA FUNCION TWO;
function two() {
	document.querySelector("#clickme").innerHTML="Text-Aling: left";
	document.querySelector("body").style.textAlign="left";
	//pasas el onclick a la funcion 3 despues de la primera orden
	document.getElementById('clickme').onclick = three;
}
//CLICK 2 DE LA FUNCION THREE;
function three() {
	document.querySelector("#clickme").innerHTML="Text-Aling: right";
	document.querySelector("body").style.textAlign="right";
	//pasas el onclick a la funcion 4 despues de la primera orden
	document.getElementById('clickme').onclick = four;
}
//CLICK 2 DE LA FUNCION FOUR;
function four() {
	document.querySelector("#clickme").innerHTML="Text-Aling: justify";
	document.querySelector("body").style.textAlign="justify";
	//pasas el onclick a la funcion 1 despues de la primera orden
document.getElementById('clickme').onclick = one;
}
//Inicializacion (donde inicia) el o click (puedes cambiarla a cualquiera)
document.getElementById('clickme').onclick = one;
document.body.onload = start;