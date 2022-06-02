function dynamicallyLoad(urljs, urlcss) {
	document.body.innerHTML +=
	'<form action="" method="post" name="formColor" id="formAccesibilidad"><input type="button" name="contraste" value="Cambiar contraste"></form>';
	var script = document.createElement("script"); // create a script DOM node
	var estilo = document.createElement("link");
	estilo.rel = "stylesheet";
	estilo.href = urlcss;
	script.src = urljs; // set its src to the provided URL
	document.head.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
	document.head.appendChild(estilo);
}
dynamicallyLoad("tinycolor.js", "accesibilidad.css");
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
document.body.onload = start;